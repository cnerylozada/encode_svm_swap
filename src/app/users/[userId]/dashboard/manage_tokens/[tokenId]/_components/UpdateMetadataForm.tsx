'use client'
import { Keypair, PublicKey, Transaction } from '@solana/web3.js'
import { updateTokenMetadata } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import { CONNECTION } from '@/contracts/commons'

export const UpdateMetadataForm = () => {
  const { publicKey, sendTransaction } = useWallet()

  const onUpdateMedata = async (wallet: PublicKey) => {
    // Generate the authority for the mint (also acts as fee payer)
    const authority = Keypair.generate()

    // Generate keypair to use as mint account
    const mint = Keypair.generate()

    // Initialize metadata extension
    // const updateTokenMetadataIx = updateTokenMetadata()

    // const tx = new Transaction().add(updateTokenMetadataIx)

    // await sendAndConfirmTransaction(CONNECTION, tx, [authority, mint])
    // await sendTransaction(tx, CONNECTION)
  }
  if (!publicKey) return <div>Wallet is not connected!</div>

  return (
    <div>
      <div>UpdateMetadataForm</div>
      <div>{publicKey?.toString()}</div>
      <div>
        <button type="button" onClick={async () => await onUpdateMedata(publicKey)}>
          Update metadata
        </button>
      </div>
    </div>
  )
}
