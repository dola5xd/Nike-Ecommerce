"use server";

import { authOptions } from "@/_lib/authOptions";
import { db } from "@/_lib/firebaseAdmin";
import { CartItemType } from "@/_types/cart";
import { getServerSession } from "next-auth";

export async function deleteCartItem(itemId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("No user logged in");

    const userRef = db.collection("users").doc(session.user.id);
    const userSnap = await userRef.get();

    if (!userSnap.exists) throw new Error("User not found");

    const currentCart = (userSnap.data()?.cart as CartItemType[]) ?? [];

    const updatedCart = currentCart.filter((item) => item.id !== itemId);

    await userRef.update({
      cart: updatedCart,
      updatedAt: Date.now(),
    });

    return { success: true, cart: updatedCart };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something gone wrong!";
    return { success: false, error: errorMessage };
  }
}
