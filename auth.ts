import NextAuth, {User} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials" 
import { users } from "./database/schema";
import { eq } from "drizzle-orm";
import { db } from "./database/db";
import {compare} from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        
        if(!credentials.email || !credentials.password) {
          return null;
        }
        const user = await db
        .select()
        .from(users)
        .where(eq(users.email, credentials.email.toString()))
        .limit(1);

        if (!user) {
          return null;
        }
        const isValid = await compare(credentials.password.toString(), user[0].password);
        
        if (!isValid) {
          return null;
        }

        return {
          id: user[0].id.toString(),
          email: user[0].email.toString(),
          name: user[0].fullName,
        } as User;
      },
    }),
  ],
  pages:{
    signIn: "/sign-in",
  },
  callbacks:{
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if ( session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    }
  }
})