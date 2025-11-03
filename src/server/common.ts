import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export const BACKEND_AXUM_URL = 'http://localhost:8080/api/v1'
export const BACKEND_NEXT_URL = 'http://localhost:3000/api'

const AUTH_SECRET = process.env.AUTH_SECRET!
export const getJWT = async (request: NextRequest) => {
  const authHeader = request.headers.get('Authorization')
  const nextAuthToken = authHeader?.replace('Bearer ', '')
  if (!authHeader || !nextAuthToken) return null

  return jwt.sign(JSON.parse(nextAuthToken), AUTH_SECRET)
}
