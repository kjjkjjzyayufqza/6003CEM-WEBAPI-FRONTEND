import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    // signIn: '/auth/dashbaord', // on successfully signin
    // signOut: '/auth/login', // on signout redirects users to a custom login page.
    // error: '/auth/error', // displays authentication errors
    // newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn ({ user, account, profile, email, credentials }) {
      // console.log('signIn');
      return true;
    },
    async redirect ({ url, baseUrl }) {
      // console.log('redirect');
      return baseUrl;
    },
    async session ({ session, user, token }) {
      // console.log('session');
      return session;
    },
    async jwt ({ token, user, account, profile, isNewUser }) {
      // console.log('jwt');
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
