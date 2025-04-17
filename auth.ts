import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/dashboard/login",
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

    session({ session, token }) {
      console.log("session", session);
      console.log("token", token);

      return session;
    },
  },
});
