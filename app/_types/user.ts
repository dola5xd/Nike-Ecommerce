import { AddressForm } from "@/_components/ui/AddressDialog";
import { CartItemType } from "./cart";

export type user = {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: number;
  cart: CartItemType[] | [];
  emailVerified: boolean;
  stripeCustomerId: string;
  address: AddressForm[] | [];
};

export type userDetail = {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: "google" | "twitter" | "credentials";
  createdAt: number;
  updatedAt: number;
  cart: CartItemType[] | [];
  password?: string | null;
  emailVerified: boolean;
  stripeCustomerId: string;
  address: AddressForm[] | [];
};
