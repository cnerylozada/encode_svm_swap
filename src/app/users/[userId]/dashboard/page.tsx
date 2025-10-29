import { CONNECTION } from '@/contracts/commons'
import { getAppTokenList } from '@/server/tokens'
import { getTokenURI } from '@/utils/utils'
import { getTokenMetadata, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'
import Image from 'next/image'

export default async function Page() {
  const appTokenList = await getAppTokenList()

  const tokenMetadataList = await Promise.all(
    appTokenList.map((_) =>
      getTokenMetadata(CONNECTION, new PublicKey(_.mintAddress), undefined, TOKEN_2022_PROGRAM_ID),
    ),
  )

  return (
    <div>
      <div>Dashboard</div>
      <div className="space-y-4">
        {tokenMetadataList.map(async (_, index) => {
          const image = await getTokenURI(_)

          return (
            <div key={index} className="flex p-2 border rounded-md border-white space-x-4">
              <div>
                <Image src={image} width={100} height={100} alt={'asd'} className="w-[100px] h-[100px] rounded-full" />
              </div>
              <div className="grow">
                <div>Name: {_?.name}</div>
                <div>Symbol: {_?.symbol}</div>
                <div>Mint: {_?.mint.toString()}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
