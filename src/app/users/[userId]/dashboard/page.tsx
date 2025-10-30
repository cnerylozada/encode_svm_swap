import { AppToken } from '@/components/AppToken'
import { TokenBalance } from '@/components/TokenBalance'
import { CONNECTION } from '@/contracts/commons'
import { getAppTokenList } from '@/server/tokens'
import { getTokenMetadata, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

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
        {tokenMetadataList.map((_, index) => (
          <div key={index} className="space-y-1">
            <AppToken tokenMetadata={_} />
            {_ && <TokenBalance tokenMint={_.mint.toString()} symbol={_.symbol} />}
          </div>
        ))}
      </div>
    </div>
  )
}
