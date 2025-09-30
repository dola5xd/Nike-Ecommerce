"use server";

import { db } from "@/_lib/firebaseAdmin";
import { CartItemType } from "@/_types/cart";

/**
 * Updates the quantity of a specific cart item.
 */
export async function updateCartQuantity(
  userId: string,
  itemId: string,
  quantity: number
) {
  try {
    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    const userRef = db.collection("users").doc(userId);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      throw new Error("User not found");
    }

    const currentCart = (userSnap.data()?.cart as CartItemType[]) ?? [];

    const updatedCart = currentCart.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );

    await userRef.update({
      cart: updatedCart,
      updatedAt: Date.now(),
    });

    return { success: true, cart: updatedCart };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something gone wrong!";
    return { success: false, error: errorMessage };
  }
}
