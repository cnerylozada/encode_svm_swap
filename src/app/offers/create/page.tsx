import { CreateOfferForm } from './_components/CreateOfferForm'
import { getAppTokenList, getTokenDetailById } from '@/server/tokens'

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
      <CreateOfferForm tokenDetailList={tokenDetailList} />
    </div>
  )
}
