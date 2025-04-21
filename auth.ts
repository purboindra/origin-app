import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { getDb } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      async profile(profile) {
        return { role: profile?.role ?? "admin", ...profile };
      },
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
    jwt({ token, user, account, profile }) {
      console.log("token jwt", token);
      console.log("user jwt", user);
      console.log("account jwt", account);
      console.log("profile jwt", profile);

      if (user) {
        // User is available during sign-in
        token.role = user.role;
        token.id = user.id;
        token.picture = profile?.picture;
      }

      console.log("token jwt", token);

      return token;
    },

    redirect({ url }) {
      return url;
    },

    authorized: async ({ auth, request: { nextUrl } }) => {
      const hasLoggedIn = !!auth;

      const isAdmin = auth?.user.role === "admin";
      const isDashboardLogin = nextUrl.pathname == "/dashboard/login";
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");

      console.log(
        "authorized middleware",
        hasLoggedIn,
        isAdmin,
        isDashboardLogin
      );

      if (!hasLoggedIn && !isDashboardLogin) {
        return Response.redirect(new URL("/dashboard/login", nextUrl));
      }

      if (hasLoggedIn && isDashboardLogin) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return hasLoggedIn;
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
      console.log("session session", session);
      console.log("token session", token);

      session.user.image = token.picture;
      session.user.role = token.role;

      return session;
    },
  },
});
