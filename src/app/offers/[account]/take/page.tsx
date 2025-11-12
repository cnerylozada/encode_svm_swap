import { SwapContract } from '@/contracts/contracts'
import { TakeOffer } from './_components/TakeOffer'

export default async function Page({ params }: { params: Promise<{ account: string }> }) {
  const { account } = await params
  const rawOffer = await SwapContract.account.offer.fetch(account)

  return (
    <TakeOffer
      rawOffer={{
        id: rawOffer.id.toString(),
        maker: rawOffer.maker.toString(),
        tokenMintA: rawOffer.tokenMintA.toString(),
        tokenMintB: rawOffer.tokenMintB.toString(),
        tokenWantedAmount: rawOffer.tokenWantedAmount.toNumber(),
        tokenOfferedAmount: rawOffer.tokenOfferedAmount.toNumber(),
        bump: rawOffer.bump,
        wasTaken: rawOffer.wasTaken,
      }}
    />
  )
}
