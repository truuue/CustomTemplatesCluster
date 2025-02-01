import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      plan: "FREE" | "PRO";
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}
