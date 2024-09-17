import NextAuth from 'next-auth';

import options from './options';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth credentials');
}

const handler = NextAuth(options);
export { handler as GET, handler as POST };
