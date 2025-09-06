import { db } from "@/_lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (!token)
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });

  const tokenDoc = await db
    .collection("emailVerificationTokens")
    .doc(token)
    .get();
  if (!tokenDoc.exists)
    return NextResponse.json({ error: "Token not found" }, { status: 400 });

  const { email, expiresAt } = tokenDoc.data()!;
  if (Date.now() > expiresAt) {
    return NextResponse.json({ error: "Token expired" }, { status: 400 });
  }

  const snap = await db
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();
  if (!snap.empty) {
    const userDoc = snap.docs[0];
    await db
      .collection("users")
      .doc(userDoc.id)
      .update({ emailVerified: true });
  }

  await db.collection("emailVerificationTokens").doc(token).delete();

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/`);
}
