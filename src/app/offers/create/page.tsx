import { CreateOfferForm } from './_components/CreateOfferForm'
import { getAppTokenList, getTokenDetail } from '@/server/tokens'

export default async function Page() {
  const appTokenList = await getAppTokenList()
  const tokenDetailList = await Promise.all(
    appTokenList.map(async (token) => {
      const tokenDetail = await getTokenDetail(token.id, token.mintAddress)
      return tokenDetail
    }),
  )

  return (
    <div>
      <CreateOfferForm tokenDetailList={tokenDetailList} />
    </div>
  )
}
