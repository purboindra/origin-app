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

    async signIn({ user, account, profile }) {
      const isGoogle = account?.provider === "google";

      console.log("signIn callbacks", user, account, profile);

      if (isGoogle) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/users/check`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: user.email }),
            }
          );

          if (!response.ok) {
            return false;
          }

          const body = JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
            email_verified: profile?.email_verified,
            provider: account.provider,
            provider_id: account.provider_id,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
          });

          const resp = await fetch(`http://localhost:3000/api/users`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: body,
          });

          if (!resp.ok) {
            return false;
          }

          return true;
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
