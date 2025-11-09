import { AppToken } from '@/components/AppToken'
import { TokenBalance } from '@/components/TokenBalance'
import { auth } from '@/lib/auth'
import { getAppTokenList, getTokenDetailById } from '@/server/tokens'
import { Settings } from 'lucide-react'
import Link from 'next/link'

export default async function Page() {
  const session = await auth()

  const appTokenList = await getAppTokenList()
  const tokenMetadataList = await Promise.all(
    appTokenList.map(async (token) => {
      const tokenDetail = await getTokenDetailById(token.id)
      return tokenDetail
    }),
  )

  return (
    <div>
      <div className="mb-4 space-y-2">
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
              <div>
                <Link href={`/dashboard/manage_tokens/${id}`}>
                  <button
                    className="p-1 ml-auto flex items-center space-x-1
                    rounded border border-white text-sm"
                  >
                    <Settings className="block w-4 h-4" />
                    <div>Settings</div>
                  </button>
                </Link>
              </div>
            )}
            {metadata && (
              <>
                <AppToken tokenMetadata={metadata} />
                <TokenBalance tokenMint={metadata.mint.toString()} symbol={metadata.symbol} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
