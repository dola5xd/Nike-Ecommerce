export type user = {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: "google" | "twitter" | "credentials";
  createdAt: number;
  updatedAt: number;
  cart: [];
  password?: string | null;
  emailVerified: boolean;
};
