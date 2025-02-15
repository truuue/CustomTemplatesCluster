import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const gitHubId = process.env.GITHUB_CLIENT_ID!;
const gitHubSecret = process.env.GITHUB_CLIENT_SECRET!;

const googleId = process.env.GOOGLE_CLIENT_ID!;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET!;

if (!gitHubId || !gitHubSecret || !googleId || !googleSecret) {
  throw new Error("Environment variables must be set");
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: gitHubId,
      clientSecret: gitHubSecret,
    }),
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
    signOut: "/logout",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  events: {
    createUser: async (message) => {
      const userId = message.user.id;
      const email = message.user.email;
      const name = message.user.name;

      if (!userId || !email) return;

      const stripeCustomer = await stripe.customers.create({
        email,
        name: name ?? "",
      });

      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: stripeCustomer.id },
      });
    },
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      try {
        if (!user.email) return false;

        // Vérifier si un utilisateur existe déjà avec cet email
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });

        if (existingUser) {
          // Vérifier si un compte existe déjà pour ce provider
          const existingAccount = existingUser.accounts.find(
            (acc: {
              provider: string;
              type: string;
              providerAccountId: string;
            }) => acc.provider === account?.provider
          );

          if (existingAccount) {
            return true; // Le compte existe déjà, autoriser la connexion
          }

          // Créer un nouveau compte pour ce provider
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: account?.type || "",
              provider: account?.provider || "",
              providerAccountId: account?.providerAccountId || "",
              access_token: account?.access_token,
              token_type: account?.token_type,
              scope: account?.scope,
            },
          });

          return true;
        }

        return true; // Nouvel utilisateur, autoriser la création
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        return false;
      }
    },
    jwt: async ({ token, user }) => {
      if (user?.email) {
        // Récupérer les informations de l'utilisateur depuis la base de données
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { plan: true, isAdmin: true },
        });

        if (dbUser) {
          token.plan = dbUser.plan;
          token.isAdmin = dbUser.isAdmin;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
        session.user.plan = token.plan as "FREE" | "PRO";
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
