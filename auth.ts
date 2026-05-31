import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const allowed = (process.env.AUTH_ALLOWED_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    signIn({ user }) {
      return !!user.email && allowed.includes(user.email.toLowerCase());
    },
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
});
