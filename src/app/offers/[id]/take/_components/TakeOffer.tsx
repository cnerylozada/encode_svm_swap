export const TakeOffer = () => {
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
      <div>TakeOffer</div>
    </div>
  )
}
