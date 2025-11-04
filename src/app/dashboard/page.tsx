import { AppToken } from '@/components/AppToken'
import { TokenBalance } from '@/components/TokenBalance'
import { CONNECTION } from '@/contracts/commons'
import { auth } from '@/lib/auth'
import { getAppTokenList } from '@/server/tokens'
import { getTokenMetadata, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'
import Link from 'next/link'

export default async function Page() {
  const session = await auth()

  const appTokenList = await getAppTokenList()
  const tokenMetadataList = await Promise.all(
    appTokenList.map(async (token) => {
      const metadata = await getTokenMetadata(
        CONNECTION,
        new PublicKey(token.mintAddress),
        undefined,
        TOKEN_2022_PROGRAM_ID,
      )

      return {
        id: token.id,
        metadata,
      }
    }),
  )
  return (
    <div>
      <div className="mb-4 space-y-2">
        <div>Dashboard</div>
        <div className="text-xl font-bold">Welcome {session?.user.email} !</div>
        <div className="flex items-center space-x-4 justify-end">
          <div>
            <Link href={`/dashboard/mint_swap_tokens`}>
              <button className="p-2 rounded border border-white">Mint swap tokens!</button>
            </Link>
          </div>
          <div>
            <Link href={`/dashboard/offers/create`}>
              <button className="p-2 rounded border border-white">Create a new offer!</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {tokenMetadataList.map(({ id, metadata }, index) => (
          <div key={index} className="space-y-1">
            {session?.user.role === 'ADMIN' && (
              <div className="text-right">
                <Link href={`/dashboard/manage_tokens/${id}`}>
                  <button className="p-1 rounded border border-white text-sm">Update token</button>
                </Link>
              </div>
            )}
            <AppToken tokenMetadata={metadata} />
            {metadata && <TokenBalance tokenMint={metadata.mint.toString()} symbol={metadata.symbol} />}
          </div>
        ))}
      </div>
    </div>
  )
}
