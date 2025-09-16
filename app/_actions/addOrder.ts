"use server";

import { db } from "@/_lib/firebaseAdmin";
import { randomUUID } from "crypto";
import Stripe from "stripe";

import { getProductPrice } from "@/_lib/api";
import { AddOrderType } from "@/_types/order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const addOrder = async ({
  cart,
  address,
  paymentMethodID,
  userId,
  stripeCustomerId,
}: AddOrderType) => {
  try {
    if (!cart || cart.length === 0) throw new Error("Cart is empty");
    if (!address) throw new Error("Address is required");
    if (!paymentMethodID) throw new Error("Payment method is required");
    if (!stripeCustomerId)
      throw new Error("Stripe customer ID is required for this payment method");

    const orderId = randomUUID();

    const prices = await Promise.all(
      cart.map(async (item) => {
        const product = await getProductPrice(item.productID);
        if (!product?.price) throw new Error("Product price not found");
        return product.price * item.quantity;
      })
    );

    const totalAmount = prices.reduce((sum, price) => sum + price, 0);
    const amountInCents = Math.round(totalAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      customer: stripeCustomerId,
      payment_method: paymentMethodID,
      off_session: true,
      confirm: true,
      metadata: { orderId, userId: userId ?? "guest" },
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    });

    if (paymentIntent.status !== "succeeded") {
      throw new Error("Payment failed, please try again.");
    }

    await db
      .collection("orders")
      .doc(orderId)
      .set({
        userId: userId ?? null,
        cart,
        address,
        paymentMethodID,
        status: "paid",
        createdAt: Date.now(),
        orderId,
      });

    if (userId) {
      await db.collection("users").doc(userId).update({
        cart: [],
        updatedAt: Date.now(),
      });
    }

    return { success: true, orderId };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Something went wrong during checkout";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};
