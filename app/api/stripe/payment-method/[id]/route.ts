import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // 👈 make params a Promise
) {
  try {
    const { id } = await context.params; // 👈 await it here

    const paymentMethod = await stripe.paymentMethods.retrieve(id, {
      expand: ["card"], // expand to get card details
    });

    return NextResponse.json(paymentMethod);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong with Stripe";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
