import { getUser } from "@/_actions/getUser";
import { db } from "@/_lib/firebaseAdmin";
import { user } from "@/_types/user";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();

    // 🔹 fetch user from Firestore
    const userData = (await getUser(uid)) as user;
    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let customerId = userData.stripeCustomerId || null;

    if (!customerId) {
      // 1️⃣ Create Stripe customer if none exists
      const customer = await stripe.customers.create({
        name: userData.name ?? undefined,
        email: userData.email ?? undefined,
        metadata: { uid: userData.id },
      });

      customerId = customer.id;

      // 2️⃣ Save stripeCustomerId back to Firestore
      await db.collection("users").doc(userData.id).update({
        stripeCustomerId: customerId,
      });
    }

    // 3️⃣ Create setup intent for that customer
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ["card"],
    });

    return NextResponse.json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Something Gone Wrong with Stripe";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
