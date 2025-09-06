import { NextResponse } from "next/server";
import crypto from "crypto";
import { saltAndHashPassword } from "@/_utils/saltAndHashPassword";
import { db } from "@/_lib/firebaseAdmin";
import { sendVerificationEmail } from "@/_lib/mailer";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const snap = await db
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();
  if (!snap.empty) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }

  const hashed = await saltAndHashPassword(password);

  const ref = db.collection("users").doc();
  await ref.set({
    id: ref.id,
    name,
    email,
    password: hashed,
    emailVerified: false,
    provider: "credentials",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    cart: [],
  });

  // 🔹 Generate token
  const token = crypto
    .createHash("sha256")
    .update(email + Date.now())
    .digest("hex");
  await db
    .collection("emailVerificationTokens")
    .doc(token)
    .set({
      email,
      createdAt: Date.now(),
      expiresAt: Date.now() + 1000 * 60 * 60,
    });

  // 🔹 Send email
  await sendVerificationEmail(email, token);

  return NextResponse.json({
    message: "User registered. Please verify your email.",
  });
}
