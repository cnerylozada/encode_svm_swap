import { auth } from '@/lib/auth'
import { getRawUserById } from '@/server/users'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth()
  if (!session || !session.user?.id) redirect('/')

  const rawUser = await getRawUserById(session.user.id)

  return (
    <div>
      <div>Profile page</div>
      <div>User: {JSON.stringify(rawUser)}</div>
    </div>
  )
}
