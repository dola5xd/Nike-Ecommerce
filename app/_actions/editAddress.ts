"use server";

import { authOptions } from "@/_lib/authOptions";
import { db } from "@/_lib/firebaseAdmin";
import { getServerSession } from "next-auth";
import { AddressForm } from "@/_components/ui/AddressDialog";

export async function editAddress(index: number, updatedAddress: AddressForm) {
  try {
    const user = (await getServerSession(authOptions))?.user;
    if (!user) return { success: false, error: "Not authenticated" };

    const userRef = db.collection("users").doc(user.id);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return { success: false, error: "User not found" };
    }

    const currentAddress = (userSnap.data()?.address as AddressForm[]) ?? [];

    if (index < 0 || index >= currentAddress.length) {
      throw new Error("Invalid address index");
    }

    // 🔹 Update the specific address
    currentAddress[index] = updatedAddress;

    await userRef.update({
      address: currentAddress,
      updatedAt: Date.now(),
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to update address";
    throw new Error(errorMessage);
  }
}
