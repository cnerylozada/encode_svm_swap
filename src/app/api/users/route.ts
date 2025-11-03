import { NextResponse } from 'next/server'
import { BACKEND_URL } from '@/server/common'

export async function GET() {
  const userListResponse = await fetch(`${BACKEND_URL}/users`, {
    method: 'GET',
  })
  const userList = await userListResponse.json()
  return NextResponse.json(userList)
}
