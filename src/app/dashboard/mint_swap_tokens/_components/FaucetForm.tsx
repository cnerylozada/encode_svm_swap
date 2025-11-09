'use client'
import { CONNECTION } from '@/contracts/commons'
import { ClaimSwapTokensContract } from '@/contracts/contracts'
import { BN } from '@coral-xyz/anchor'
import { getAssociatedTokenAddress, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'
import { getExplorerLink } from '@solana-developers/helpers'

export const FaucetForm = () => {
  const { sendTransaction, publicKey } = useWallet()
  const tokenMint = new PublicKey('mntXmMnUP9vJYxbfykG2ZQhgcFHth6kwg8sVJTBY1pX')
  const adminPubKey = new PublicKey(`AKeJdxqP6MpFyhcFGUN79NTUwe2ntZNoGjw37UTbbFp`)

  const onCreateMainVault = async () => {
    if (publicKey) {
      try {
        const createMainVaultTx = await ClaimSwapTokensContract.methods
          .createMainVault()
          .accounts({
            tokenMint: tokenMint,
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            admin: adminPubKey,
          })
          .transaction()

        const tx = new Transaction()
        tx.add(createMainVaultTx)

        const createMainVaultTxSignature = await sendTransaction(tx, CONNECTION)
        console.log(`createMainVaultTxSignature`, createMainVaultTxSignature)
      } catch (error) {
        console.log(`error: `, error)
      }
    }
  }

  const onClaimTokens = async () => {
    if (publicKey) {
      try {
        const claimTokensTx = await ClaimSwapTokensContract.methods
          .claimTokens(adminPubKey, new BN(2_000_000_000))
          .accounts({
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            tokenMint: tokenMint,
            signer: publicKey,
          })
          .transaction()

        const tx = new Transaction()
        tx.add(claimTokensTx)

        const claimTokensTxSignature = await sendTransaction(tx, CONNECTION)
        const explorerLink = getExplorerLink('tx', claimTokensTxSignature, 'devnet')
        console.log(`claimTokensTxSignature`, claimTokensTxSignature)
        console.log(`explorerLink`, explorerLink)
      } catch (error) {
        console.log(`error: `, error)
      }
    }
  }

  const onGetATA = async () => {
    if (publicKey) {
      const associatedTokenAccount = await getAssociatedTokenAddress(
        tokenMint,
        publicKey,
        undefined,
        TOKEN_2022_PROGRAM_ID,
        undefined,
      )
      console.log(`associatedTokenAccount`, associatedTokenAccount.toString())
    }
  }

  const onTransferTokens = async () => {
    if (publicKey) {
      try {
        const transferTokensTx = await ClaimSwapTokensContract.methods
          .transferTokens(new BN(1_000_000_000))
          .accounts({
            tokenMintX: tokenMint,
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

  return (
    <div>
      <div>FaucetForm</div>
      <div className="space-y-4">
        <div>
          <button
            type="button"
            className="p-2 border border-white rounded"
            onClick={async () => {
              await onCreateMainVault()
            }}
          >
            onCreateMainVault!
          </button>
        </div>

        <div>
          <button
            type="button"
            className="p-2 border border-white rounded"
            onClick={async () => {
              await onClaimTokens()
            }}
          >
            onClaimTokens!
          </button>
        </div>
        {/* <div>
          <button
            type="button"
            className="p-2 border border-white rounded"
            onClick={async () => {
              await onGetATA()
            }}
          >
            onGetATA!
          </button>
        </div> */}
      </div>
    </div>
  )
}
