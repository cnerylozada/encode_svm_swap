import { NextRequest, NextResponse } from 'next/server'
import { BACKEND_AXUM_URL, getJWT } from '@/server/common'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = await getJWT(request)
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { id } = await params
  const userResponse = await fetch(`${BACKEND_AXUM_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const user = await userResponse.json()
  return NextResponse.json(user)
}
