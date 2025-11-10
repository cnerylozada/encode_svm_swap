'use client'
import { CONNECTION } from '@/contracts/commons'
import { SwapContract } from '@/contracts/contracts'
import { ITokenDetail } from '@/models/models'
import { BN } from '@coral-xyz/anchor'
import { getAssociatedTokenAddress, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ellipsify } from '@/lib/utils'
import { Plus } from 'lucide-react'
import z from 'zod'
import { toast } from 'sonner'

const schema = z.object({
  tokenOffered: z.object({
    id: z.string(),
    amount: z.number().positive(),
  }),
  tokenWanted: z.object({
    id: z.string(),
    amount: z.number().positive(),
  }),
})
type SchemaType = z.infer<typeof schema>

export const CreateOfferForm = ({ tokenDetailList }: { tokenDetailList: ITokenDetail[] }) => {
  const { sendTransaction, publicKey } = useWallet()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  })

  const onCreateVault = async (id: string, tokenOfferedDetail: ITokenDetail) => {
    if (publicKey && tokenOfferedDetail.metadata?.mint) {
      try {
        const createVaultTx = await SwapContract.methods
          .createVault(id)
          .accounts({
            tokenMint: new PublicKey(tokenOfferedDetail.metadata.mint),
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            signer: publicKey,
          })
          .transaction()

        const tx = new Transaction()
        tx.add(createVaultTx)

        const signature = await sendTransaction(tx, CONNECTION)
        console.log(`signature`, signature)
        toast.success('Vault created!')
      } catch (error) {
        console.log(`error: `, error)
      }
    }
  }

  const getAssociatedTokenAccount = async (publicKey: PublicKey, tokenMint: PublicKey) => {
    return getAssociatedTokenAddress(tokenMint, publicKey, undefined, TOKEN_2022_PROGRAM_ID, undefined)
  }
  const onMakeOffer = async (
    id: string,
    tokenOffered: { tokenDetail: ITokenDetail; amount: number },
    tokenWanted: { tokenDetail: ITokenDetail; amount: number },
  ) => {
    if (publicKey && tokenOffered.tokenDetail.metadata && tokenWanted.tokenDetail.metadata) {
      try {
        const associatedTokenAccount = await getAssociatedTokenAccount(
          publicKey,
          new PublicKey(tokenOffered.tokenDetail.metadata.mint),
        )

        const makeOfferTx = await SwapContract.methods
          .makeOffer(
            id,
            new BN(tokenOffered.amount * 10 ** tokenOffered.tokenDetail.decimals),
            new BN(tokenWanted.amount * 10 ** tokenWanted.tokenDetail.decimals),
          )
          .accounts({
            tokenMintA: new PublicKey(tokenOffered.tokenDetail.metadata.mint),
            tokenMintB: new PublicKey(tokenWanted.tokenDetail.metadata.mint),
            senderTokenAccountA: associatedTokenAccount,
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            signer: publicKey,
          })
          .transaction()

        const tx = new Transaction()
        tx.add(makeOfferTx)

        const signature = await sendTransaction(tx, CONNECTION)
        console.log(`signature`, signature)
        toast.success('New offer created!')

        await new Promise((resolve) => setTimeout(resolve, 2500))
        router.push('/dashboard')
      } catch (error) {
        console.log(`error: `, error)
      }
    }
  }

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const { tokenOffered, tokenWanted } = data
    const tokenOfferedDetail = tokenDetailList.find((_) => _.id === tokenOffered.id)
    const tokenWantedDetail = tokenDetailList.find((_) => _.id === tokenWanted.id)

    if (!tokenOfferedDetail || !tokenWantedDetail) return

    const id = Date.now().toString()
    await onCreateVault(id, tokenOfferedDetail)
    await onMakeOffer(
      id,
      { amount: tokenOffered.amount, tokenDetail: tokenOfferedDetail },
      { amount: tokenWanted.amount, tokenDetail: tokenWantedDetail },
    )
  }

  return (
    <div className="p-3 border rounded-md border-white space-y-4">
      <div>
        <div className="font-bold">Create offer</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center space-x-4">
          <select {...register('tokenOffered.id')} className="p-2 block border border-white rounded">
            {tokenDetailList.map((_) => (
              <option key={_.id} value={_.id}>
                Token: {_.metadata?.name} | Mint: {ellipsify(_.metadata?.mint, 8)}
              </option>
            ))}
          </select>

          <input
            className="block grow py-1 px-2 border border-white rounded"
            {...register('tokenOffered.amount', { valueAsNumber: true })}
            placeholder="tokenOffered"
          />
        </div>

        <div className="flex items-center space-x-4">
          <select {...register('tokenWanted.id')} className="p-2 block border border-white rounded">
            {tokenDetailList.map((_) => (
              <option key={_.id} value={_.id}>
                Token: {_.metadata?.name} | Mint: {ellipsify(_.metadata?.mint, 8)}
              </option>
            ))}
          </select>

          <input
            className="block grow py-1 px-2 border border-white rounded"
            {...register('tokenWanted.amount', { valueAsNumber: true })}
            placeholder="tokenWanted"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={!isValid}
            className={`p-2 flex items-center space-x-1
            rounded border border-white ${!isValid && 'cursor-not-allowed'}`}
          >
            <Plus className="block w-4 h-4" />
            <div>Crete offer!</div>
          </button>
        </div>
      </form>
    </div>
  )
}
