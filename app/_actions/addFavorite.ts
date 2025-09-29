"use server";

import { authOptions } from "@/_lib/authOptions";
import { db } from "@/_lib/firebaseAdmin";
import { favoriteItem } from "@/_types/favorites";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";

export const addFavorite = async (favoriteData: Partial<favoriteItem>) => {
  try {
    const user = (await getServerSession(authOptions))?.user;
    if (!user) throw new Error("No user loggedIn!");

    const userRef = db.collection("users").doc(user.id);
    const userSnap = await userRef.get();

    let currentFavorites: favoriteItem[] = [];
    if (userSnap.exists) {
      currentFavorites = (userSnap.data()?.favorites as favoriteItem[]) ?? [];
    }

    // 🔹 Check if item already exists (same product + size)
    const existingIndex = currentFavorites.findIndex(
      (item) => item.productID === favoriteData.productID
    );

    if (existingIndex > -1) {
      // Item exists → remove it from array
      currentFavorites = currentFavorites.filter((_, i) => i !== existingIndex);
    } else {
      //  Add new item
      const newItem: favoriteItem = {
        id: randomUUID(), // unique ID
        productID: favoriteData.productID!,
      };
      currentFavorites.push(newItem);
    }

    // 🔹 Save updated cart
    await userRef.update({
      favorites: currentFavorites,
      updatedAt: Date.now(),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Something gone wrong while add favorite item";
    throw new Error(errorMessage);
  }
};
