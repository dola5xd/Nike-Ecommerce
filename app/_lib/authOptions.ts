import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./firebaseAdmin";
import { verifyPassword } from "../_utils/saltAndHashPassword";
import { userDetail } from "../_types/user";
import Stripe from "stripe";
import { AddressForm } from "@/_components/ui/AddressDialog";
import { favoriteItem } from "@/_types/favorites";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function upsertUser(
  user: userDetail,
  account?: { provider?: string; providerAccountId?: string },
  profile?: Record<string, unknown>
) {
  if (!user?.email) return;

  const usersRef = db.collection("users");
  const snap = await usersRef.where("email", "==", user.email).limit(1).get();

  const provider =
    (account?.provider as userDetail["provider"]) ?? "credentials";
  const isOAuth = provider === "google" || provider === "twitter";
  const emailVerified = isOAuth ? true : false;

  // Extract Twitter-specific fields
  const twitterUsername =
    provider === "twitter" ? ((profile?.username as string) ?? null) : null;
  const twitterProfileUrl =
    provider === "twitter" && twitterUsername
      ? `https://twitter.com/${twitterUsername}`
      : null;

  if (!snap.empty) {
    // Existing user
    const existingDoc = snap.docs[0];
    const userData = existingDoc.data() as userDetail;

    let stripeCustomerId = userData.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
      });
      stripeCustomerId = customer.id;
    }

    await usersRef.doc(existingDoc.id).set(
      {
        ...userData,
        id: existingDoc.id,
        name: user.name || userData.name || "",
        email: user.email,
        image: user.image || userData.image || null,
        emailVerified: userData.emailVerified || emailVerified,
        provider,
        twitterUsername: twitterUsername || userData.twitterUsername || null,
        twitterProfileUrl:
          twitterProfileUrl || userData.twitterProfileUrl || null,
        updatedAt: Date.now(),
        address: userData.address || [],
        favorites: userData.favorites || [],
        stripeCustomerId,
      },
      { merge: true }
    );
  } else {
    // New user
    const newId = String(user.id || account?.providerAccountId || profile?.sub);
    if (!newId || newId === "undefined" || newId === "null") return;

    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name ?? undefined,
    });

    await usersRef.doc(newId).set({
      id: newId,
      name: user.name || "",
      email: user.email,
      image: user.image || null,
      password: null,
      emailVerified,
      cart: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      provider,
      address: [],
      favorites: [],
      stripeCustomerId: customer.id,
      twitterUsername,
      twitterProfileUrl,
    });
  }
}

//  Extend Session type
declare module "next-auth" {
  interface Session {
    user: userDetail;
  }
}

//  Auth Options
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
        const userData = doc.data() as userDetail;

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
      version: "2.0",
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
        user as userDetail,
        account ?? undefined,
        profile as Record<string, unknown>
      );
      return true;
    },

    async jwt({ token, user }) {
      // If user exists (first login), put verified status in token
      if (user) {
        token.emailVerified = (user as userDetail).emailVerified ?? false;
      }

      // Always refresh from Firestore (keep token in sync)
      if (token.email) {
        const snap = await db
          .collection("users")
          .where("email", "==", token.email as string)
          .limit(1)
          .get();
        if (!snap.empty) {
          const userData = snap.docs[0].data() as userDetail;
          token.id = userData.id;
          token.cart = userData.cart ?? [];
          token.createdAt = userData.createdAt ?? null;
          token.image = userData.image;
          token.emailVerified = userData.emailVerified ?? false;
          token.stripeCustomerId = userData.stripeCustomerId ?? null;
          token.address = userData.address ?? null;
          token.favorites = userData.favorites ?? null;
          token.twitterUsername = userData.twitterUsername ?? null;
          token.twitterProfileUrl = userData.twitterProfileUrl ?? null;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.cart = token.cart as [];
        session.user.createdAt = token.createdAt as number;
        session.user.image = token.image as string;
        session.user.emailVerified = token.emailVerified as boolean;
        session.user.stripeCustomerId = token.stripeCustomerId as string;
        session.user.address = token.address as AddressForm[] | [];
        session.user.favorites = token.favorites as favoriteItem[] | [];

        // Twitter info
        session.user.twitterUsername = token.twitterUsername as string | null;
        session.user.twitterProfileUrl = token.twitterProfileUrl as
          | string
          | null;
      }
      return session;
    },
  },
};
