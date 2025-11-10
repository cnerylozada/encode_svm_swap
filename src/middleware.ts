import { NextRequest, NextResponse } from 'next/server'
import { auth } from './lib/auth'

const protectedRoutes = ['/dashboard', '/profile', '/dashboard/request_aidrop', '/offers']
const adminRoutes = ['/dashboard/manage_tokens']

export default async function middleware(request: NextRequest) {
  const session = await auth()
  const { nextUrl } = request

  const isAuthRoute = protectedRoutes.some((_) => nextUrl.pathname.startsWith(_))
  if (!session && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  } else if (session) {
    const isAdmin = session.user.role === 'ADMIN'
    const isAdminRoute = adminRoutes.some((_) => nextUrl.pathname.startsWith(_))

    if (!isAdmin && isAdminRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  return null
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
