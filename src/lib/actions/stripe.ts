"use server";

import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export async function createCheckoutSession() {
  const authSession = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: { id: authSession?.user.id ?? "" },
    select: { stripeCustomerId: true },
  });

  const stripeCustomerId = user?.stripeCustomerId ?? undefined;

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    mode: "subscription",
    payment_method_types: ["card", "link"],
    line_items: [
      {
        price: process.env.PREMIUM_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.STRIPE_SUCCESS_URL}`,
    cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  redirect(session.url);
}
