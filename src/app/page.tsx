import { OfferItem } from '@/components/Offer'
import { SwapContract } from '@/contracts/contracts'
import { auth } from '@/lib/auth'
import Link from 'next/link'

export default async function Home() {
  const session = await auth()
  const offerList = await SwapContract.account.offer.all()

  return (
    <div>
      <div className="mb-6 font-bold">Offers</div>

      {!session && <div className="mb-6 p-2 border border-white rounded">You must be logged to take offers!</div>}

      <div className="space-y-6">
        {!offerList.length && <div className="text-center">No offers created</div>}

        {offerList.map((_) => (
          <Link key={_.publicKey.toString()} href={`/offers/${_.publicKey.toString()}/take`} className="block">
            <OfferItem
              takerMode
              offer={{
                id: _.account.id,
                bump: _.account.bump,
                maker: _.account.maker.toString(),
                tokenMintA: _.account.tokenMintA.toString(),
                tokenMintB: _.account.tokenMintB.toString(),
                tokenOfferedAmount: _.account.tokenOfferedAmount.toNumber(),
                tokenWantedAmount: _.account.tokenWantedAmount.toNumber(),
                wasTaken: _.account.wasTaken,
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
