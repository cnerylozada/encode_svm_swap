import { getAppTokenList, getTokenDetail } from '@/server/tokens'
import { AirdropForm } from './_components/AirdropForm'
import { auth } from '@/lib/auth'

export default async function Page() {
  const session = await auth()
  const appTokenList = await getAppTokenList()
  const tokenDetailList = await Promise.all(
    appTokenList.map(async (token) => {
      const tokenDetail = await getTokenDetail(token.id, token.mintAddress)
      return tokenDetail
    }),
  )

  if (session && session.user.role === 'ADMIN') return <></>

  return (
    <div>
      <AirdropForm tokenDetailList={tokenDetailList} />
    </div>
  )
}
