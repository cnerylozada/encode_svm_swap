import { IRawUser } from '@/models/models'
import { BACKEND_NEXT_URL } from '@/server/common'
import NextAuth, { type DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    user: {
      wallet: string
      role: IRawUser['role']
      jwt: JWT
    } & DefaultSession['user']
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        wallet: {},
      },
      authorize: async (credentials) => {
        const usersResponse = await fetch(`${BACKEND_NEXT_URL}/users?wallet=${credentials.wallet}`)
        const users: IRawUser[] = await usersResponse.json()
        if (!users.length) return null
        return users[0]
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.wallet = (user as any).wallet
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role as IRawUser['role']
        session.user.wallet = token.wallet as string
        session.user.jwt = token
      }
      return session
    },
  },
})
