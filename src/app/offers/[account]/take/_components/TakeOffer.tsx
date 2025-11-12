'use client'
import { OfferItem } from '@/components/Offer'
import { CONNECTION } from '@/contracts/commons'
import { SwapContract } from '@/contracts/contracts'
import { IRawOffer } from '@/models/models'
import { getAssociatedTokenAddress, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const TakeOffer = ({ rawOffer }: { rawOffer: IRawOffer }) => {
  const { sendTransaction, publicKey } = useWallet()
  const router = useRouter()

  const getAssociatedTokenAccount = async (publicKey: PublicKey, tokenMint: PublicKey) => {
    return getAssociatedTokenAddress(tokenMint, publicKey, undefined, TOKEN_2022_PROGRAM_ID, undefined)
  }

  const onTakeOffer = async () => {
    if (publicKey) {
      const senderATA = await getAssociatedTokenAccount(publicKey, new PublicKey(rawOffer.tokenMintB))
      const recipientATA = await getAssociatedTokenAccount(
        new PublicKey(rawOffer.maker),
        new PublicKey(rawOffer.tokenMintB),
      )

      try {
        const takeOfferTx = await SwapContract.methods
          .takeOffer(rawOffer.id, new PublicKey(rawOffer.maker))
          .accounts({
            tokenMintB: new PublicKey(rawOffer.tokenMintB),
            senderTokenAccountB: senderATA,
            recipientTokenAccountB: recipientATA,
            tokenMintA: new PublicKey(rawOffer.tokenMintA),
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            signer: publicKey,
          })
          .transaction()
        const tx = new Transaction()
        tx.add(takeOfferTx)
        const signature = await sendTransaction(tx, CONNECTION)
        console.log(`signature`, signature)

        toast.success('Successful trasnfer! Returning to the dashboard')
        await new Promise((resolve) => setTimeout(resolve, 2500))
        router.push('/dashboard')
      } catch (error) {
        console.log(`error: `, error)
        toast.error('Something went wrong!')
      }
    }
  }

  return (
    <div className="p-3 border rounded-md border-white space-y-4">
      <div className="pb-2 border-b border-white font-bold">Take offer</div>

      <div className="space-y-4">
        {rawOffer.wasTaken && <div>This offer has already been accepted!</div>}

        <OfferItem offer={rawOffer} takerMode />

        {!rawOffer.wasTaken && (
          <div>
            <button
              type="button"
              onClick={async () => {
                await onTakeOffer()
              }}
              className={`mx-auto p-2 flex items-center space-x-1
            rounded border border-white`}
            >
              <Plus className="block w-4 h-4" />
              <div>Take offer!</div>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
