"use server";

import { authOptions } from "@/_lib/authOptions";
import { db } from "@/_lib/firebaseAdmin";
import { CartItemType } from "@/_types/cart";
import { getServerSession } from "next-auth";
import { randomUUID } from "crypto";

export async function addToCart(cartData: Partial<CartItemType>) {
  // cartData: { productID, size, quantity }
  const user = (await getServerSession(authOptions))?.user;
  if (!user) throw new Error("No user loggedIn!");

  const userRef = db.collection("users").doc(user.id);
  const userSnap = await userRef.get();

  let currentCart: CartItemType[] = [];
  if (userSnap.exists) {
    currentCart = (userSnap.data()?.cart as CartItemType[]) ?? [];
  }

  // 🔹 Check if item already exists (same product + size)
  const existingIndex = currentCart.findIndex(
    (item) =>
      item.productID === cartData.productID && item.size === cartData.size
  );

  if (existingIndex > -1) {
    // ✅ Item exists → update quantity
    currentCart[existingIndex].quantity += cartData.quantity ?? 1;
  } else {
    // ✅ Add new item
    const newItem: CartItemType = {
      id: randomUUID(), // unique ID
      productID: cartData.productID!,
      userID: user.id,
      size: cartData.size!,
      quantity: cartData.quantity ?? 1,
    };
    currentCart.push(newItem);
  }

  // 🔹 Save updated cart
  await userRef.update({
    cart: currentCart,
    updatedAt: Date.now(),
  });

  return { success: true, cart: currentCart };
}
