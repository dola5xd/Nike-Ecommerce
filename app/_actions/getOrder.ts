"use server";

import { db } from "@/_lib/firebaseAdmin";
import { OrderType } from "@/_types/order";

export const getOrder = async (orderID: string) => {
  try {
    const snap = await db
      .collection("orders")
      .where("orderId", "==", orderID)
      .get();
    if (snap.empty) throw new Error("No Order found with this ID : " + orderID);

    const doc = snap.docs[0];
    const OrderData = doc.data() as OrderType;
    return OrderData;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Something went wrong during checkout";
    throw new Error(errorMessage);
  }
};
