import { NextRequest, NextResponse } from 'next/server'
import { BACKEND_AXUM_URL } from '@/server/common'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const wallet = searchParams.get('wallet')

  const userListResponse = await fetch(`${BACKEND_AXUM_URL}/users${wallet ? `?wallet=${wallet}` : ''}`, {
    method: 'GET',
  })

  const userList = await userListResponse.json()
  return NextResponse.json(userList)
}
