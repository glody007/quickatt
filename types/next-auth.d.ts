import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id and organisation's id*/
      id: string,
      organisationId: string;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    organisationId: string;
  }
}