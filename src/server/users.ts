'use server'
import { BACKEND_URL } from './common'

export const getUserById = async (id: string) => {
  const userResponse = await fetch(`${BACKEND_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //   Authorization: `Bearer ${token}`,
    },
  })
  const user = await userResponse.json()
  return user
}
