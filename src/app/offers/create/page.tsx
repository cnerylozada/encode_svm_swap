import { CreateOfferForm } from './_components/CreateOfferForm'
import { getAppTokenList } from '@/server/tokens'

export default async function Page() {
  const appTokenList = await getAppTokenList()

  return (
    <div>
      <CreateOfferForm tokenDetailList={appTokenList} />
    </div>
  )
}
