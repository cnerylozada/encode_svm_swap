import { SwapContract } from '@/contracts/contracts'
import { auth } from '@/lib/auth'
import { ellipsify } from '@/lib/utils'
import Link from 'next/link'

export default async function Home() {
  const session = await auth()
  const offerList = await SwapContract.account.offer.all()

  return (
    <div>
      <div className="mb-6 font-bold">Offers</div>

      {!session && <div className="mb-6 p-2 border border-white rounded">You must be logged to take offers!</div>}

      <div className="space-y-6">
        {offerList.map((_) => (
          <Link
            key={_.publicKey.toString()}
            href={`/offers/${_.account.id}/take`}
            className="block p-3 border rounded-md border-white space-x-4"
          >
            <div>Id: {_.account.id}</div>
            <div>
              <span className="font-bold">Token offered:</span> {_.account.tokenOfferedAmount.toNumber()} | Mint:{' '}
              {ellipsify(_.account.tokenMintA.toString())}
            </div>
            <div>
              <span className="font-bold">Token wanted:</span> {_.account.tokenWantedAmount.toNumber()} | Mint:{' '}
              {ellipsify(_.account.tokenMintB.toString())}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
