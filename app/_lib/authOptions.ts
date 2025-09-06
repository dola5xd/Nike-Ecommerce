import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./firebaseAdmin";
import { verifyPassword } from "../_utils/saltAndHashPassword";
import { user } from "../_types/user";

// ============================
// 🔹 Helper: Upsert into "users" only
// ============================
async function upsertUser(
  user: user,
  account?: { provider?: string; providerAccountId?: string },
  profile?: Record<string, unknown>
) {
  if (!user?.email) return;

  const usersRef = db.collection("users");
  const snap = await usersRef.where("email", "==", user.email).limit(1).get();

  // ✅ Determine provider
  const provider = (account?.provider as user["provider"]) ?? "credentials";
  const isOAuth = provider === "google" || provider === "twitter";
  const emailVerified = isOAuth ? true : false;

  if (!snap.empty) {
    // 🔹 Existing user
    const existingDoc = snap.docs[0];
    const existingId = existingDoc.id;
    const userData = existingDoc.data();

    await usersRef.doc(existingId).set(
      {
        id: existingId,
        name: user.name || userData.name || "",
        email: user.email,
        image: user.image || userData.image || null,
        password: userData.password ?? null,
        emailVerified: userData.emailVerified || emailVerified,
        createdAt: userData.createdAt || Date.now(),
        updatedAt: Date.now(),
        cart: userData.cart || [],
        provider,
      },
      { merge: true }
    );
  } else {
    // 🔹 New user
    const newId = String(user.id || account?.providerAccountId || profile?.sub);
    if (!newId || newId === "undefined" || newId === "null") return;

    await usersRef.doc(newId).set({
      id: newId,
      name: user.name || "",
      email: user.email,
      image: user.image || null,
      password: null, // only credentials will update this later
      emailVerified,
      cart: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      provider,
    });
  }
}

// ============================
// 🔹 Extend Session type
// ============================
declare module "next-auth" {
  interface Session {
    user: user;
  }
}

// ============================
// 🔹 Auth Options
// ============================
export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET!,

  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) throw new Error("Missing credentials");

        const snap = await db
          .collection("users")
          .where("email", "==", email)
          .limit(1)
          .get();
        if (snap.empty) throw new Error("No user found with this email");

        const doc = snap.docs[0];
        const userData = doc.data() as user;

        const valid = await verifyPassword(password, userData.password!);
        if (!valid) throw new Error("Invalid credentials");

        return { id: doc.id, name: userData.name, email: userData.email };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0", // OAuth 2.0
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account, profile }) {
      await upsertUser(
        user as user,
        account ?? undefined,
        profile as Record<string, unknown>
      );
      return true;
    },

    async jwt({ token, user }) {
      // If user exists (first login), put verified status in token
      if (user) {
        token.emailVerified = (user as user).emailVerified ?? false;
      }

      // Always refresh from Firestore (keep token in sync)
      if (token.email) {
        const snap = await db
          .collection("users")
          .where("email", "==", token.email as string)
          .limit(1)
          .get();

        if (!snap.empty) {
          const userData = snap.docs[0].data() as user;
          token.emailVerified = userData.emailVerified ?? false;
          token.id = userData.id;
          token.cart = userData.cart ?? [];
          token.createdAt = userData.createdAt ?? null;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.cart = token.cart as [];
        session.user.createdAt = token.createdAt as number;
        session.user.emailVerified = token.emailVerified as boolean;
      }

      return session;
    },
  },
};
