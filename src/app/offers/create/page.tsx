import { CreateOfferForm } from './_components/CreateOfferForm'
import { getAppTokenList } from '@/server/tokens'

export default async function Page() {
  const appTokenList = await getAppTokenList()
  console.log(`offers/create page appTokenList`, appTokenList)

  return (
    <div>
      <CreateOfferForm tokenDetailList={appTokenList} />
    </div>
  )
}
