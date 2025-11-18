import { getAppTokenList } from '@/server/tokens'
import { AirdropForm } from './_components/AirdropForm'
import { auth } from '@/lib/auth'

export default async function Page() {
  const session = await auth()
  const appTokenList = await getAppTokenList()

  if (session && session.user.role === 'ADMIN') return <></>

  return (
    <div>
      <AirdropForm appTokenList={appTokenList} />
    </div>
  )
}
