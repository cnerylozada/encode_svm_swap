import { ellipsify } from '@/lib/utils'
import { IRawOffer } from '@/models/models'
import { ArrowDownToLine, ArrowUpToLine } from 'lucide-react'

export const OfferItem = ({ offer, takerMode = false }: { offer: IRawOffer; takerMode?: boolean }) => {
  return (
    <div className="block p-3 border rounded-md border-white" key={offer.id}>
      <div className="text-right">
        <button className="p-2 border rounded-full text-xs uppercase">{offer.wasTaken ? 'Taken' : 'Active'}</button>
      </div>
      <div>Id: {offer.id}</div>
      <div className="flex items-center space-x-2">
        {takerMode ? (
          <ArrowDownToLine className="block w-6 h-6 text-green-500" />
        ) : (
          <ArrowUpToLine className="block w-6 h-6 text-red-500" />
        )}
        <div>
          <span className="font-bold">{takerMode ? 'You would receive:' : 'Token offered:'}</span>{' '}
          {offer.tokenOfferedAmount} | Mint: {ellipsify(offer.tokenMintA.toString())}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {takerMode ? (
          <ArrowUpToLine className="block w-6 h-6 text-red-500" />
        ) : (
          <ArrowDownToLine className="block w-6 h-6 text-green-500" />
        )}
        <div>
          <span className="font-bold">{takerMode ? 'You would send:' : 'Token wanted:'}</span> {offer.tokenWantedAmount}{' '}
          | Mint: {ellipsify(offer.tokenMintB.toString())}
        </div>
      </div>
    </div>
  )
}
