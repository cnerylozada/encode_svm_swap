'use client'
import { ADMIN_PUBKEY, CONNECTION } from '@/contracts/commons'
import { ClaimSwapTokensContract } from '@/contracts/contracts'
import { ITokenDetail } from '@/models/models'
import { BN } from '@coral-xyz/anchor'
import { getAssociatedTokenAddress, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const AddFundsToVaultForm = ({ tokenDetail }: { tokenDetail: ITokenDetail }) => {
  const router = useRouter()
  const { sendTransaction, publicKey } = useWallet()

  const tokenMint = tokenDetail.metadata?.mint
  const AMOUNT_TO_FUND = 1

  const getAssociatedTokenAccount = async (publicKey: PublicKey, tokenMint: PublicKey) => {
    return getAssociatedTokenAddress(tokenMint, publicKey, undefined, TOKEN_2022_PROGRAM_ID, undefined)
  }

  const onFundMainVault = async () => {
    if (publicKey && tokenMint) {
      try {
        const decimals = tokenDetail.decimals
        const RAW_AMOUNT_TO_FUND = new BN(AMOUNT_TO_FUND * 10 ** decimals)
        const associatedTokenAccount = await getAssociatedTokenAccount(publicKey, new PublicKey(tokenMint))

        const fundMainVaultTx = await ClaimSwapTokensContract.methods
          .fundMainVault(RAW_AMOUNT_TO_FUND)
          .accounts({
            tokenMint: new PublicKey(tokenMint),
            senderTokenAccount: associatedTokenAccount,
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            admin: ADMIN_PUBKEY,
          })
          .transaction()

        const tx = new Transaction()
        tx.add(fundMainVaultTx)

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

  // const onCreateMainVault = async () => {
  //   if (publicKey) {
  //     try {
  //       const createMainVaultTx = await ClaimSwapTokensContract.methods
  //         .createMainVault()
  //         .accounts({
  //           tokenMint: tokenMint,
  //           tokenProgram: TOKEN_2022_PROGRAM_ID,
  //           admin: adminPubKey,
  //         })
  //         .transaction()

  //       const tx = new Transaction()
  //       tx.add(createMainVaultTx)

  //       const createMainVaultTxSignature = await sendTransaction(tx, CONNECTION)
  //       console.log(`createMainVaultTxSignature`, createMainVaultTxSignature)
  //     } catch (error) {
  //       console.log(`error: `, error)
  //     }
  //   }
  // }
  // const onTransferTokens = async () => {
  //   if (publicKey) {
  //     try {
  //       const transferTokensTx = await ClaimSwapTokensContract.methods
  //         .transferTokens(new BN(1_000_000_000))
  //         .accounts({
  //           tokenMintX: tokenMint,
  //           tokenAccountX: new PublicKey(`BHDtVW8HfL7RCSzH4RuLidxW4iV1YQSRHMKacPHKXxY5`),
  //           tokenXVault: new PublicKey(`Jmm6EBn7zmTLM5xedRT8Csdk3p44F3Ufw19tRe2bM2g`),
  //           tokenProgram: TOKEN_2022_PROGRAM_ID,
  //           signer: publicKey,
  //         })
  //         .transaction()

  //       const tx = new Transaction()
  //       tx.add(transferTokensTx)

  //       const transferTokensTxSignature = await sendTransaction(tx, CONNECTION)
  //       console.log(`transferTokensTxSignature`, transferTokensTxSignature)
  //     } catch (error) {
  //       console.log(`error: `, error)
  //     }
  //   }
  // }

  return (
    <div
      className="p-3 flex items-center justify-center
      space-x-4 border rounded-md border-white"
    >
      <div>Add funds to the faucet: </div>
      <div>
        <button
          type="button"
          onClick={async () => {
            await onFundMainVault()
          }}
          className="p-2 flex items-center space-x-1
          rounded border border-white"
        >
          <Plus className="block w-4 h-4" />
          <div>
            Deposit {AMOUNT_TO_FUND} {tokenDetail.metadata?.symbol}
          </div>
        </button>
      </div>
    </div>
  )
}
