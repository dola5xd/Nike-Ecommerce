"use server";

import { db } from "@/_lib/firebaseAdmin";
import { OrderType } from "@/_types/order";

export const getUserOrders = async (userId: string | null) => {
  try {
    const snap = await db
      .collection("orders")
      .where("userId", "==", userId)
      .get();

    if (snap.empty) return [];

    const userOrders: OrderType[] = snap.docs.map(
      (doc) => ({ ...doc.data() }) as OrderType
    );
    return userOrders;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Something went wrong during checkout";
    throw new Error(errorMessage);
  }
};
