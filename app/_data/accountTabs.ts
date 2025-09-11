import AccountDetails from "@/account/_components/AccountDetails";
import Address from "@/account/_components/Address";
import Favorites from "@/account/_components/Favorites";
import Order from "@/account/_components/Order";
import Payment from "@/account/_components/Payment";

export const contentTabs = [
  {
    title: "My Orders",
    value: "orders",
    content: Order,
  },
  {
    title: "Favorites",
    value: "favorites",
    content: Favorites,
  },
  {
    title: "My Details",
    value: "details",
    content: AccountDetails,
  },
  {
    title: "Payment Methods",
    value: "payment",
    content: Payment,
  },
  {
    title: "Address Book",
    value: "address",
    content: Address,
  },
];
