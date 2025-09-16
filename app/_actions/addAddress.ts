"use server";

import { authOptions } from "@/_lib/authOptions";
import { db } from "@/_lib/firebaseAdmin";
import { getServerSession } from "next-auth";
import { AddressForm } from "@/_components/ui/AddressDialog";

export async function addAddress(address: AddressForm) {
  try {
    const user = (await getServerSession(authOptions))?.user;
    if (!user) return { success: false, error: "Not authenticated" };

    const userRef = db.collection("users").doc(user.id);

    const userSnap = await userRef.get();

    let currentAddress: AddressForm[] = [];
    if (userSnap.exists) {
      currentAddress = (userSnap.data()?.address as AddressForm[]) ?? [];
    }
    currentAddress.push(address);

    await userRef.update({
      address: currentAddress,
      updatedAt: Date.now(),
    });

    return { success: true, currentAddress };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to save address";
    return { success: false, error: errorMessage };
  }
}
