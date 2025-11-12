import Image from 'next/image'
import { getTokenURI } from '@/utils/utils'
import { ITokenMetadata } from '@/models/models'

export const AppToken = async ({ mint, metadata }: { mint: string; metadata: ITokenMetadata }) => {
  const image = await getTokenURI(metadata)
  return (
    <div className="flex items-center p-3 border rounded-md border-white space-x-4">
      <div>
        <Image
          src={image}
          width={100}
          height={100}
          alt={metadata?.name ?? 'token'}
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
      </div>
      <div className="grow">
        <div>Name: {metadata?.name}</div>
        <div>Symbol: {metadata?.symbol}</div>
        <div>Mint: {mint}</div>
      </div>
    </div>
  )
}
