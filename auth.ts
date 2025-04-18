import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    Credentials({
      type: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credential) => {
        const user = {
          email: (credential.email || "") as string,
          password: (credential.password || "") as string,
        };

        console.log("User", user, credential);

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/dashboard/login",
    signOut: "/dashboard/login",
    error: "/error",
  },
  debug: true,
  logger: {
    error(code, ...message) {
      console.error(code, message);
    },
    warn(code, ...message) {
      console.warn(code, message);
    },
    debug(code, ...message) {
      console.debug(code, message);
    },
  },
  callbacks: {
    jwt({ token, user, account }) {
      console.log("token jwt", token);
      console.log("user jwt", user);
      console.log("account jwt", account);

      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }

      return token;
    },

    redirect({ url, baseUrl }) {
      console.log("url", url);
      console.log("baseUrl", baseUrl);

      return url;
    },

    async signIn({ user, account }) {
      const isGoogle = account?.provider === "google";

      if (isGoogle) {
        try {
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/users/check`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: user.email }),
            }
          );

          if (!response.ok) {
            throw new Error("NotRegistered");
          }
        } catch (error) {
          console.error("Check user failed:", error);
          return false;
        }
      }

      return true;
    },

    session({ session, token }) {
      console.log("session", session);
      console.log("token", token);

      return session;
    },
  },
});
