import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export const BACKEND_AXUM_URL = process.env.BACKEND_AXUM_URL!
export const BACKEND_NEXT_URL = process.env.BACKEND_NEXT_URL!

const AUTH_SECRET = process.env.AUTH_SECRET!
export const getJWT = async (request: NextRequest) => {
  const authHeader = request.headers.get('Authorization')
  const nextAuthToken = authHeader?.replace('Bearer ', '')
  if (!authHeader || !nextAuthToken) return null

  return jwt.sign(JSON.parse(nextAuthToken), AUTH_SECRET)
}
