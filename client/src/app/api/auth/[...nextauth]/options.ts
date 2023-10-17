import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log(credentials);
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        const authResponse = await fetch(
          "http://localhost:8000/api/users/auth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );
        const user = await authResponse.json();
        if (!authResponse.ok) {
          throw new Error(user.message);
        }
        if (authResponse.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};
