"use server";
import { db } from "@/_lib/firebaseAdmin";
import { user } from "@/_types/user";

export const getAddress = async (id: string) => {
  try {
    const snap = await db
      .collection("users")
      .where("id", "==", id)
      .limit(1)
      .get();
    if (snap.empty) throw new Error("No user found with this email");

    const doc = snap.docs[0];
    const userData = doc.data() as user;
    return userData.address;
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "Something gone wrong";
    throw new Error(errMessage);
  }
};
