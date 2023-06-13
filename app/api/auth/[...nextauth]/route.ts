import { RegisterPublic, SignInPublic } from 'API/auth';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import * as CryptoJS from 'crypto-js';
import jwt_decode from 'jwt-decode';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';

let access_token: any;
let refresh_token: any;
let expire_date: any;

const env = process.env.NODE_ENV;

const GOOGLE_CLIENT_ID =
  env == 'development'
    ? process.env.GOOGLE_CLIENT_ID
    : process.env.PRO_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET =
  env == 'development'
    ? process.env.GOOGLE_CLIENT_SECRET
    : process.env.PRO_GOOGLE_CLIENT_SECRET;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn:
      process.env.NODE_ENV == 'development'
        ? '/'
        : 'https://6003-cem-webapi-frontend.vercel.app/', // on successfully signin
    signOut:
      process.env.NODE_ENV == 'development'
        ? '/'
        : 'https://6003-cem-webapi-frontend.vercel.app/', // on signout redirects users to a custom login page.
    error:
      process.env.NODE_ENV == 'development'
        ? '/'
        : 'https://6003-cem-webapi-frontend.vercel.app/', // displays authentication errors
    newUser:
      process.env.NODE_ENV == 'development'
        ? '/'
        : 'https://6003-cem-webapi-frontend.vercel.app/', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn ({ user, account, profile, email, credentials }): Promise<any> {
      const userProfile: any = profile;
      let password = CryptoJS.SHA256(userProfile?.sub!).toString();
      try {
        const res = await SignInPublic({
          email: userProfile?.email!,
          password: password,
        });
        access_token = res.data.accessToken;
        refresh_token = res.data.refreshToken;
        const _expire_date: any = jwt_decode(res.data.accessToken);
        expire_date = String(_expire_date.exp * 1000);
        console.log('login_res', res);
        return true;
      } catch (err: any) {
        if (err.response?.data?.statusCode == 400) {
          try {
            const register_res = await RegisterPublic({
              name: userProfile.name!,
              email: userProfile.email!,
              photo: userProfile.picture!,
              password: password,
            });
            console.log('register_done', register_res);
            return true;
          } catch (register_err: any) {
            console.log(register_err.response?.data);
            return false;
          }
        } else {
          console.log(err.response?.data);
          return false;
        }
      }
    },
    async redirect ({ url, baseUrl }) {
      return baseUrl;
    },
    async session ({
      session,
      user,
      token,
    }: {
      session: any;
      user: AdapterUser;
      token: JWT;
    }) {
      session.access_token = access_token;
      session.refresh_token = refresh_token;
      session.expire_date = expire_date;
      return session;
    },
    async jwt ({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
