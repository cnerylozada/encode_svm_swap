import { SwapContract } from '@/contracts/contracts'
import { CreateOfferForm } from './_components/CreateOfferForm'
import { web3 } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { getAppTokenList, getTokenDetailById } from '@/server/tokens'

export default async function Page() {
  const [pda] = web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from('offer1'),
      new PublicKey('AKeJdxqP6MpFyhcFGUN79NTUwe2ntZNoGjw37UTbbFp').toBuffer(),
      Buffer.from('1762745143525'),
    ],
    SwapContract.programId,
  )

  console.log(`pda`, pda)
  const adasdasd = await SwapContract.account.offer.fetch(pda)
  console.log(`tokenMintA`, adasdasd.tokenMintA.toString())
  console.log(`tokenOfferedAmount`, adasdasd.tokenOfferedAmount.toNumber())

  console.log(`tokenMintB`, adasdasd.tokenMintB.toString())
  console.log(`tokenWantedAmount`, adasdasd.tokenWantedAmount.toNumber())

  const appTokenList = await getAppTokenList()
  const tokenDetailList = await Promise.all(
    appTokenList.map(async (token) => {
      const tokenDetail = await getTokenDetailById(token.id)
      return tokenDetail
    }),
  )

  return (
    <div>
      <CreateOfferForm tokenDetailList={tokenDetailList} />
    </div>
  )
}
