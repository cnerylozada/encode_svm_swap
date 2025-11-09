import { getAppTokenList, getTokenDetailById } from '@/server/tokens'
import { AirdropForm } from './_components/AirdropForm'

export default async function Page() {
  const appTokenList = await getAppTokenList()
  const tokenDetailList = await Promise.all(
    appTokenList.map(async (token) => {
      const tokenDetail = await getTokenDetailById(token.id)
      return tokenDetail
    }),
  )

  return (
    <div>
      <AirdropForm tokenDetailList={tokenDetailList} />
    </div>
  )
}
