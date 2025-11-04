'use client'
import { PublicKey, Transaction } from '@solana/web3.js'
import { createUpdateFieldInstruction } from '@solana/spl-token-metadata'
import { useWallet } from '@solana/wallet-adapter-react'
import { CONNECTION } from '@/contracts/commons'
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'

export const UpdateMetadataForm = ({ tokenMint }: { tokenMint: string }) => {
  const { publicKey, sendTransaction } = useWallet()

  const onUpdateMedata = async (wallet: PublicKey) => {
    const data = {
      field: 'name',
      value: 'Lucciano1New1',
    }
    const updateTokenMetadataIx = createUpdateFieldInstruction({
      programId: TOKEN_2022_PROGRAM_ID,
      metadata: new PublicKey(tokenMint),
      updateAuthority: wallet,
      field: data.field,
      value: data.value,
    })
    const tx = new Transaction().add(updateTokenMetadataIx)
    const txSignature = await sendTransaction(tx, CONNECTION)
    console.log(`txSignature`, txSignature)
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
