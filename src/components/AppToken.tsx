import Image from 'next/image'
import { TokenMetadata } from '@solana/spl-token-metadata'
import { getTokenURI } from '@/utils/utils'

export const AppToken = async ({ tokenMetadata }: { tokenMetadata: TokenMetadata | null }) => {
  const image = await getTokenURI(tokenMetadata)

  return (
    <div className="flex items-center p-3 border rounded-md border-white space-x-4">
      <div>
        <Image src={image} width={100} height={100} alt={'asd'} className="w-[100px] h-[100px] rounded-full" />
      </div>
      <div className="grow">
        <div>Name: {tokenMetadata?.name}</div>
        <div>Symbol: {tokenMetadata?.symbol}</div>
        <div>Mint: {tokenMetadata?.mint.toString()}</div>
      </div>
    </div>
  )
}
