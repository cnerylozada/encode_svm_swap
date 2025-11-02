import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(`credentials`, credentials)
        return { id: '001abc', email: 'cnerylozada@gmail.com', username: 'cristh' }
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 60 * 30 },
})
