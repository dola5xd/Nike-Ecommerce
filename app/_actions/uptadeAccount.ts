"use server";

import { db } from "@/_lib/firebaseAdmin";
import { userDetail } from "@/_types/user";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";
import { UpdatePayload } from "@/account/_components/AccountDetails";

export async function updateAccountAction(
  formData: UpdatePayload,
  user: userDetail
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const updates: Partial<userDetail> = {};

  // ✅ Update name
  if (formData.name && formData.name !== user.name) {
    updates.name = formData.name;
  }

  // ✅ Update image
  if (formData.image && formData.image !== user.image) {
    updates.image = formData.image;
  }

  // ✅ Password update
  if (formData.newPassword) {
    if (user.password) {
      // case 1: user already has a password → check oldPassword
      if (!formData.oldPassword) {
        throw new Error("Old password required");
      }

      const isValid = await bcrypt.compare(formData.oldPassword, user.password);
      if (!isValid) throw new Error("Old password is incorrect");

      updates.password = await bcrypt.hash(formData.newPassword, 10);
    } else {
      // case 2: social user (no password in db) → allow creating one
      updates.password = await bcrypt.hash(formData.newPassword, 10);
    }
  }

  // 🔹 Save only if there are changes
  if (Object.keys(updates).length > 0) {
    await db
      .collection("users")
      .doc(user.id)
      .update({
        ...updates,
        updatedAt: Date.now(),
      });
  }

  return { success: true, updates };
}
