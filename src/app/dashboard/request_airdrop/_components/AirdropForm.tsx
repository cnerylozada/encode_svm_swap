'use client'
import { ADMIN_PUBKEY, CONNECTION } from '@/contracts/commons'
import { ClaimSwapTokensContract } from '@/contracts/contracts'
import { ITokenDetail } from '@/models/models'
import { BN } from '@coral-xyz/anchor'
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'
import { Plus, TriangleAlert } from 'lucide-react'

export const AirdropForm = ({ tokenDetailList }: { tokenDetailList: ITokenDetail[] }) => {
  const { sendTransaction, publicKey } = useWallet()
  const tokenMint = new PublicKey('mntXmMnUP9vJYxbfykG2ZQhgcFHth6kwg8sVJTBY1pX')

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

  const MAX_TOKENS_REQUEST = 4
  const AMOUNT_TO_CLAIM = 1

  const onClaimTokens = async () => {
    if (publicKey) {
      try {
        const claimTokensTx = await ClaimSwapTokensContract.methods
          .claimTokens(ADMIN_PUBKEY, new BN(2_000_000_000))
          .accounts({
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            tokenMint: tokenMint,
            signer: publicKey,
          })
          .transaction()

        const tx = new Transaction()
        tx.add(claimTokensTx)

        const claimTokensTxSignature = await sendTransaction(tx, CONNECTION)
        console.log(`claimTokensTxSignature`, claimTokensTxSignature)
      } catch (error) {
        console.log(`error: `, error)
      }
    }
  }
  console.log(`tokenDetailList`, tokenDetailList)

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

      <div className="space-y-4">
        <div>
          <div>Recipient:</div>
          <div>{publicKey?.toString()}</div>
        </div>
        <div>
          <button
            type="button"
            onClick={async () => {
              await onClaimTokens()
            }}
            className="p-2 flex items-center space-x-1
            rounded border border-white"
          >
            <Plus className="block w-4 h-4" />
            <div>Give me airdrops!</div>
          </button>
        </div>
      </div>
    </div>
  )
}
