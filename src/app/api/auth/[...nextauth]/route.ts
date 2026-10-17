/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const backendUrl = () =>
  (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1").replace(
    /\/$/,
    ""
  );

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "0211wohnen-secret-key-production-2026",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        try {
          const res = await fetch(`${backendUrl()}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email.trim(),
              password: credentials.password,
            }),
          });

          const response = await res.json();
          if (!res.ok || !response?.data?.accessToken) {
            throw new Error(response?.message || "Invalid email or password");
          }

          const { user, accessToken } = response.data;
          return {
            id: user._id || user.id,
            email: user.email,
            name: user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email,
            fullName: user.fullName,
            role: user.role || "user",
            profilePicture: user.profilePicture || "",
            phoneNumber: user.phoneNumber || "",
            accessToken,
          } as any;
        } catch (error: any) {
          throw new Error(error?.message || "Authentication failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.fullName = (user as any).fullName;
        token.name = (user as any).name;
        token.email = (user as any).email;
        token.role = (user as any).role;
        token.profilePicture = (user as any).profilePicture;
        token.phoneNumber = (user as any).phoneNumber;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.id;
        (session.user as any).fullName = token.fullName;
        (session.user as any).name = token.name;
        (session.user as any).email = token.email;
        (session.user as any).role = token.role;
        (session.user as any).profilePicture = token.profilePicture;
        (session.user as any).phoneNumber = token.phoneNumber;
        (session.user as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
