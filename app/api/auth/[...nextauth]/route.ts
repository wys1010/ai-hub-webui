import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// const dns = require('dns');
// dns.setDefaultResultOrder('ipv4first');

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth credentials');
}

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET?.slice(0, 5) + '...');

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      return JSON.stringify(token);
    },
    decode: ({ secret, token }) => {
      return JSON.parse(token as string);
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // 在这里添加自定义的登录逻辑
        console.log('登录尝试:', { user, account, profile });
        return true;
      } catch (error) {
        console.error('登录过程中出错:', error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // 如果url是相对路径，则将其与baseUrl组合
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // 如果url已经是完整的URL并且属于同一域名，则直接返回
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      // 否则返回baseUrl
      return baseUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
