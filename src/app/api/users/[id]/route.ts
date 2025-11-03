import { NextRequest, NextResponse } from 'next/server'
import { BACKEND_URL, getJWT } from '@/server/common'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = await getJWT(request)
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  // const { searchParams } = new URL(request.url)
  // const wallet = searchParams.get('wallet')
  const { id } = await params
  const userResponse = await fetch(`${BACKEND_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const user = await userResponse.json()

  return NextResponse.json(user)
}
