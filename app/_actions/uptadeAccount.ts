"use server";

import { db } from "@/_lib/firebaseAdmin";
import { userDetail } from "@/_types/user";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";
import { UpdatePayload } from "@/account/_components/AccountDetails";
import { uploadToCloudinary } from "@/_lib/cloudinary";

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

  if (formData.image) {
    try {
      const imageSrc = await uploadToCloudinary(formData.image);

      updates.image = imageSrc;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      throw new Error("Image upload failed" + err);
    }
  }

  // ✅ Password update
  if (formData.newPassword) {
    if (user.password) {
      if (!formData.oldPassword) {
        throw new Error("Old password required");
      }

      const isValid = await bcrypt.compare(formData.oldPassword, user.password);
      if (!isValid) throw new Error("Old password is incorrect");

      updates.password = await bcrypt.hash(formData.newPassword, 10);
    } else {
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
