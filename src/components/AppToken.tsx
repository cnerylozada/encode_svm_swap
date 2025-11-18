import Image from 'next/image'
import { getTokenURI } from '@/utils/utils'
import { IRawAppToken } from '@/models/models'

export const AppToken = async ({ token }: { token: IRawAppToken }) => {
  const { name, symbol, mint, uri } = token
  const image = await getTokenURI(uri)
  return (
    <div className="flex items-center p-3 border rounded-md border-white space-x-4">
      <div>
        <Image
          src={image}
          width={100}
          height={100}
          alt={token.name}
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
      </div>
      <div className="grow">
        <div>Name: {name}</div>
        <div>Symbol: {symbol}</div>
        <div>Mint: {mint}</div>
      </div>
    </div>
  )
}
