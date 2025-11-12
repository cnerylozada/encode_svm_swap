'use client'
import { OfferItem } from '@/components/Offer'
import { IRawOffer } from '@/models/models'
import { useWallet } from '@solana/wallet-adapter-react'

export const MyOfferList = ({ rawOfferList }: { rawOfferList: IRawOffer[] }) => {
  const { publicKey } = useWallet()
  const myOfferList = rawOfferList.filter((_) => publicKey && _.maker === publicKey.toString())

  if (!publicKey) return <></>

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-white font-bold">My offers</div>

      <div className="space-y-4">
        {!myOfferList.length && <div className="text-center">No offers created</div>}

        {myOfferList.map((_) => (
          <OfferItem key={_.id} offer={_} />
        ))}
      </div>
    </div>
  )
}
