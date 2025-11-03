import { getToken } from '@auth/core/jwt'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export const BACKEND_URL = 'http://localhost:8080/api/v1'
export const AUTH_SECRET = process.env.AUTH_SECRET!

export const getJWT = async (request: NextRequest) => {
  const nextAuthToken = await getToken({ req: request, secret: AUTH_SECRET })
  if (!nextAuthToken) return null

  return jwt.sign(nextAuthToken, AUTH_SECRET)
}
