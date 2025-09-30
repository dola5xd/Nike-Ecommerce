import { NextResponse } from "next/server";
import { db } from "@/_lib/firebaseAdmin";
import crypto from "crypto";
import { sendVerificationEmail } from "@/_lib/mailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 🔹 Check if user exists
    const userSnap = await db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (userSnap.empty) {
      return NextResponse.json(
        { error: "No account found with this email" },
        { status: 404 }
      );
    }

    // 🔹 Generate new token
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
        expiresAt: Date.now() + 1000 * 60 * 60, // 1h
      });

    // 🔹 Send email
    await sendVerificationEmail(email, token);

    return NextResponse.json({
      message: "Verification email resent successfully",
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something gone wrong!";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
