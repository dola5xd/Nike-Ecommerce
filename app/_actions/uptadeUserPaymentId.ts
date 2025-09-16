"use server";

import { db } from "@/_lib/firebaseAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";

export async function updatePaymentAction(paymentId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // ✅ update Firestore
  await db.collection("users").doc(session.user.id).update({
    paymentId,
    updatedAt: Date.now(),
  });

  return { success: true, paymentId };
}
