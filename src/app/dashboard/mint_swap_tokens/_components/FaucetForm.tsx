'use client'
import { CONNECTION } from '@/contracts/commons'
import { ClaimSwapTokensContract } from '@/contracts/contracts'
import { BN } from '@coral-xyz/anchor'
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'

export const FaucetForm = () => {
  const { sendTransaction, publicKey } = useWallet()

  const onTransferTokens = async () => {
    if (publicKey) {
      try {
        const transferTokensTx = await ClaimSwapTokensContract.methods
          .transferTokens(new BN(4_000_000_000))
          .accounts({
            tokenMintX: new PublicKey('mntXmMnUP9vJYxbfykG2ZQhgcFHth6kwg8sVJTBY1pX'),
            tokenAccountX: new PublicKey(`BHDtVW8HfL7RCSzH4RuLidxW4iV1YQSRHMKacPHKXxY5`),
            tokenXVault: new PublicKey(`Jmm6EBn7zmTLM5xedRT8Csdk3p44F3Ufw19tRe2bM2g`),
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            signer: publicKey,
          })
          .transaction()

        const tx = new Transaction()
        tx.add(transferTokensTx)

        const transferTokensTxSignature = await sendTransaction(tx, CONNECTION)
        console.log(`transferTokensTxSignature`, transferTokensTxSignature)
      } catch (error) {
        console.log(`error: `, error)
      }
    }
  }
  const onFundMainVault = async () => {
    if (publicKey) {
      try {
        const fundMainVaultTx = await ClaimSwapTokensContract.methods
          .fundMainVault(new BN(4_000_000_000))
          .accounts({
            tokenMintX: new PublicKey('mntXmMnUP9vJYxbfykG2ZQhgcFHth6kwg8sVJTBY1pX'),
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            signer: publicKey,
          })
          .transaction()

        const tx = new Transaction()
        tx.add(fundMainVaultTx)

        const fundMainVaultTxSignature = await sendTransaction(tx, CONNECTION)
        console.log(`fundMainVaultTxSignature`, fundMainVaultTxSignature)
      } catch (error) {
        console.log(`error: `, error)
      }
    }
  }
  return (
    <div>
      <div>FaucetForm</div>
      <div className="space-y-4">
        <div>
          <button
            type="button"
            className="p-2 border border-white rounded"
            onClick={async () => {
              await onTransferTokens()
            }}
          >
            onTransferTokens!
          </button>
        </div>
        <div>
          <button
            type="button"
            className="p-2 border border-white rounded"
            onClick={async () => {
              await onFundMainVault()
            }}
          >
            onFundMainVault!
          </button>
        </div>
      </div>
    </div>
  )
}
