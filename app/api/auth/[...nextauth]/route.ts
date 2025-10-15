import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

export const dynamic = "force-dynamic"

const authOptions: NextAuthOptions = {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        ;(token as any).provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        ;(session as any).provider = (token as any).provider
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      try {
        if (url.startsWith("/")) return `${baseUrl}${url}`
        const u = new URL(url)
        if (u.origin === baseUrl) return url
      } catch {
        // ignore parsing errors
      }
      return `${baseUrl}/dashboard`
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
export { authOptions }
