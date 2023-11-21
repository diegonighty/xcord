import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connect } from "@/app/lib/mongo";
import { IUser, User } from "@/app/lib/models";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.dbUser = token.user as IUser;
      return Promise.resolve(session)
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "diego@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
            return null;
        }

        const { email, password } = credentials;

        try {
            await connect();
            const user = await User.findOne({ email });

            if (!user) {
              return null;
            }

            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (!passwordsMatch) {
              return null;
            }

            return user;
        } catch (error) {
            console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };