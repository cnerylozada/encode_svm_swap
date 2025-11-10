'use client'
import { CONNECTION } from '@/contracts/commons'
import { SwapContract } from '@/contracts/contracts'
import { BN } from '@coral-xyz/anchor'
import { getAssociatedTokenAddress, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'

export const CreateOfferForm = () => {
  const { sendTransaction, publicKey } = useWallet()
  const id = '1762745143525'
  const decimals = 9

  const tokenMintA = 'mntXmMnUP9vJYxbfykG2ZQhgcFHth6kwg8sVJTBY1pX'
  const tokenMintB = new PublicKey('tkvBYR38RDmjhyVC848rcwkYfu8p44N6y2bPz1X3f4E')

  const onCreateVault = async () => {
    if (publicKey) {
      try {
        const createVaultTx = await SwapContract.methods
          .createVault(id)
          .accounts({
            tokenMint: new PublicKey(tokenMintA),
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            signer: publicKey,
          })
          .transaction()

        const tx = new Transaction()
        tx.add(createVaultTx)

        const signature = await sendTransaction(tx, CONNECTION)
        console.log(`signature`, signature)
      } catch (error) {
        console.log(`error: `, error)
      }
    }
  }

  const getAssociatedTokenAccount = async (publicKey: PublicKey, tokenMint: PublicKey) => {
    return getAssociatedTokenAddress(tokenMint, publicKey, undefined, TOKEN_2022_PROGRAM_ID, undefined)
  }

  const onMakeOffer = async () => {
    if (publicKey) {
      try {
        const associatedTokenAccount = await getAssociatedTokenAccount(publicKey, new PublicKey(tokenMintA))

        const makeOfferTx = await SwapContract.methods
          .makeOffer(id, new BN(1 * 10 ** decimals), new BN(2 * 10 ** decimals))
          .accounts({
            tokenMintA: new PublicKey(tokenMintA),
            tokenMintB: tokenMintB,
            senderTokenAccountA: associatedTokenAccount,
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            signer: publicKey,
          })
          .transaction()

        const tx = new Transaction()
        tx.add(makeOfferTx)

        const signature = await sendTransaction(tx, CONNECTION)
        console.log(`signature`, signature)
      } catch (error) {
        console.log(`error: `, error)
      }
    }
  }
  return (
    <div>
      <div>CreateOfferForm</div>

      <div className="space-y-4">
        <div>
          <button
            type="button"
            onClick={async () => {
              await onCreateVault()
            }}
          >
            onCreateVault
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={async () => {
              await onMakeOffer()
            }}
          >
            onMakeOffer
          </button>
        </div>
      </div>
    </div>
  )
}
