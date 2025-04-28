import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import authConfig from "@/auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.discord = {
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_in: account.expires_in,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.discord = token.discord || null;
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
