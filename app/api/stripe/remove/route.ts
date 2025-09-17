import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { paymentMethodId } = await req.json();

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: "Missing paymentMethodId" },
        { status: 400 }
      );
    }

    // 🔹 Detach card from customer
    const paymentMethod = await stripe.paymentMethods.detach(paymentMethodId);

    return NextResponse.json({ success: true, paymentMethod });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something gone wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
