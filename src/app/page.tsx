import { SwapContract } from '@/contracts/contracts'

export default async function Home() {
  const offerList = await SwapContract.account.offer.all()

  // const onTakeOffer = async () => {
  //   if (publicKey) {
  //     const senderATA = await getAssociatedTokenAccount(publicKey, new PublicKey(tokenMintB))
  //     const recipientATA = await getAssociatedTokenAccount(
  //       new PublicKey(`AKeJdxqP6MpFyhcFGUN79NTUwe2ntZNoGjw37UTbbFp`),
  //       new PublicKey(tokenMintB),
  //     )

  //     try {
  //       const takeOfferTx = await SwapContract.methods
  //         .takeOffer(id, new PublicKey(`AKeJdxqP6MpFyhcFGUN79NTUwe2ntZNoGjw37UTbbFp`))
  //         .accounts({
  //           tokenMintB: tokenMintB,
  //           senderTokenAccountB: senderATA,
  //           recipientTokenAccountB: recipientATA,
  //           tokenMintA: new PublicKey(tokenMintA),
  //           tokenProgram: TOKEN_2022_PROGRAM_ID,
  //           signer: publicKey,
  //         })
  //         .transaction()
  //       const tx = new Transaction()
  //       tx.add(takeOfferTx)
  //       const signature = await sendTransaction(tx, CONNECTION)
  //       console.log(`signature`, signature)
  //     } catch (error) {
  //       console.log(`error: `, error)
  //     }
  //   }
  // }
  return (
    <div>
      <div className="mb-4 font-bold">Offers</div>
      <div className="space-y-4">
        {offerList.map((_) => (
          <div key={_.publicKey.toString()} className="p-3 border rounded-md border-white space-x-4">
            <div>Id: {_.account.id}</div>
            <div>tokenOfferedAmount: {_.account.tokenOfferedAmount.toNumber()}</div>
            <div>tokenMintA: {_.account.tokenMintA.toString()}</div>
            <div>tokenWantedAmount: {_.account.tokenWantedAmount.toNumber()}</div>
            <div>tokenMintB: {_.account.tokenMintB.toString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
