import NextAuth, { type DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    user: {
      jwt: JWT
    } & DefaultSession['user']
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(`credentials`, credentials)
        return { id: '001abc', wallet: 'AKeJdxqP6MpFyhcFGUN79NTUwe2ntZNoGjw37UTbbFp', email: 'cnerylozada@gmail.com' }
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 60 * 60 },
  callbacks: {
    async session({ session, token }) {
      session.user.jwt = token
      return session
    },
  },
})
