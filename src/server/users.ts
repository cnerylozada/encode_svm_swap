'use server'
import { BACKEND_NEXT_URL } from './common'
import { IRawUser } from '@/models/models'
import { auth } from '@/lib/auth'

export const getRawUserById = async (id: string) => {
  const session = await auth()

  const rawUserResponse = await fetch(`${BACKEND_NEXT_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.stringify(session?.user.jwt)}`,
    },
  })
  const rawUser: IRawUser = await rawUserResponse.json()
  return rawUser
}
