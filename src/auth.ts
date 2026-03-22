import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { upsertUser } from "@/lib/users";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    googleAccessToken?: string;
    googleRefreshToken?: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    googleAccessToken?: string;
    googleRefreshToken?: string;
    googleExpiresAt?: number;
  }
}

const config: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          scope: "openid email profile https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/tasks",
        },
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async () => {
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google" && user.email && user.id) {
        console.log("Signing in user:", user.id, user.email);
        try {
          const result = await upsertUser(
            user.id,
            user.email,
            user.name,
            user.image,
            account.access_token,
            account.refresh_token,
            account.expires_at
          );
          console.log("Upsert result:", result);
        } catch (error) {
          console.error("Upsert error:", error);
          return false;
        }
      }
      return true;
    },
    jwt: async ({ token, account }) => {
      if (account?.provider === "google") {
        token.googleAccessToken = account.access_token;
        token.googleRefreshToken = account.refresh_token;
        token.googleExpiresAt = account.expires_at;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (token.googleAccessToken) {
        session.googleAccessToken = token.googleAccessToken as string;
      }
      if (token.googleRefreshToken) {
        session.googleRefreshToken = token.googleRefreshToken as string;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
