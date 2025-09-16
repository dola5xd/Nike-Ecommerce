"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export type SavedCard = {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  billing_name?: string | null;
};

export async function getSavedCards(customerId: string | undefined) {
  if (!customerId) return { paymentMethods: [] };

  const methods = await stripe.paymentMethods.list({
    customer: customerId,
    type: "card",
  });

  return [
    ...methods.data.map((pm) => ({
      id: pm.id,
      brand: pm.card?.brand ?? "unknown",
      last4: pm.card?.last4 ?? "XXXX",
      exp_month: pm.card?.exp_month ?? 0,
      exp_year: pm.card?.exp_year ?? 0,
      billing_name: pm.billing_details?.name ?? null,
    })),
  ];
}
