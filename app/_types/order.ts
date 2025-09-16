import { CartItemType } from "@/_types/cart";
import { AddressForm } from "@/_components/ui/AddressDialog";

export interface AddOrderType {
  cart: CartItemType[];
  address: AddressForm;
  paymentMethodID: string;
  userId: string | null;
  stripeCustomerId: string;
}
export interface OrderType {
  cart: CartItemType[];
  address: AddressForm;
  paymentMethodID: string;
  userId: string;
  status: string;
  createdAt: number;
  orderId: string;
}
