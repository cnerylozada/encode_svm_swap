'use client'
import { ADMIN_PUBKEY, CONNECTION } from '@/contracts/commons'
import { ClaimSwapTokensContract } from '@/contracts/contracts'
import { ITokenDetail } from '@/models/models'
import { BN } from '@coral-xyz/anchor'
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import { Transaction } from '@solana/web3.js'
import { Plus, TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ellipsify } from '@/lib/utils'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const schema = z.object({
  tokenId: z.string(),
  amount: z.number(),
})
type SchemaType = z.infer<typeof schema>

export const AirdropForm = ({ tokenDetailList }: { tokenDetailList: ITokenDetail[] }) => {
  const { sendTransaction, publicKey } = useWallet()
  const router = useRouter()

  const MAX_TOKENS_REQUEST = 4
  const AMOUNT_TO_CLAIM = 2

  const { register, handleSubmit } = useForm<SchemaType>({ defaultValues: { amount: AMOUNT_TO_CLAIM } })

  const onClaimTokens = async (decimals: number, tokenMint: string) => {
    if (publicKey) {
      try {
        const RAW_AMOUNT_TO_FUND = new BN(AMOUNT_TO_CLAIM * 10 ** decimals)

        const claimTokensTx = await ClaimSwapTokensContract.methods
          .claimTokens(ADMIN_PUBKEY, RAW_AMOUNT_TO_FUND)
          .accounts({
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            tokenMint: tokenMint,
            signer: publicKey,
          })
          .transaction()

        const tx = new Transaction()
        tx.add(claimTokensTx)

        await sendTransaction(tx, CONNECTION)

        toast.success('Successful trasnfer! Returning to the dashboard')
        await new Promise((resolve) => setTimeout(resolve, 2500))
        router.push('/dashboard')
      } catch (error) {
        console.log(`error: `, error)
        toast.error('Something went wrong!')
      }
    }
  }

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const { tokenId } = data
    const tokenDetail = tokenDetailList.find((_) => _.id === tokenId)
    const tokenMint = tokenDetail?.metadata?.mint
    if (!tokenDetail || !tokenMint) return

    await onClaimTokens(tokenDetail.decimals, tokenMint)
  }

  return (
    <div className="p-3 border rounded-md border-white space-y-4">
      <div className="space-y-1">
        <div className="font-bold">Request Airdrop</div>
        <div
          className="p-1 flex items-center space-x-1
        rounded border border-white text-sm"
        >
          <TriangleAlert className="block w-4 h-4" />
          <div>Maximum of {MAX_TOKENS_REQUEST} tokens!</div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <select {...register('tokenId')} className="p-2 block w-full border border-white rounded">
            {tokenDetailList.map((_) => (
              <option key={_.id} value={_.id}>
                Token: {_.metadata?.name} | Mint: {ellipsify(_.metadata?.mint, 8)}
              </option>
            ))}
          </select>
        </div>
        <input {...register('amount')} className="hidden" />

        <div>
          <div>Recipient:</div>
          <div>{publicKey?.toString()}</div>
        </div>
        <div>
          <button
            type="submit"
            className="p-2 flex items-center space-x-1
            rounded border border-white"
          >
            <Plus className="block w-4 h-4" />
            <div>Give me {AMOUNT_TO_CLAIM} tokens!</div>
          </button>
        </div>
      </form>
    </div>
  )
}
