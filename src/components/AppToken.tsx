import Image from 'next/image'
import { getTokenURI } from '@/utils/utils'
import { ITokenMetadata } from '@/models/models'

export const AppToken = async ({ tokenMetadata }: { tokenMetadata: ITokenMetadata }) => {
  const image = await getTokenURI(tokenMetadata)
  return (
    <div className="flex items-center p-3 border rounded-md border-white space-x-4">
      <div>
        <Image
          src={image}
          width={100}
          height={100}
          alt={tokenMetadata?.name ?? 'token'}
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
      </div>
      <div className="grow">
        <div>Name: {tokenMetadata?.name}</div>
        <div>Symbol: {tokenMetadata?.symbol}</div>
        <div>Mint: {tokenMetadata?.mint.toString()}</div>
      </div>
    </div>
  )
}
