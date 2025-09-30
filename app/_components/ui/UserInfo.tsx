"use client";

import { useState } from "react";
import PaymentDialog from "./PaymentDialog";
import AddressDialog, { AddressForm } from "./AddressDialog";
import { Button } from "@/_components/ui/Button";
import { user } from "@/_types/user";
import { SavedCard } from "@/_actions/getSavedCards";
import toast from "react-hot-toast";
import { addOrder } from "@/_actions/addOrder";
import { useRouter } from "next/navigation";

function UserInfo({
  user,
  savedCards,
}: {
  user: user;
  savedCards: SavedCard[] | [];
}) {
  const savedAddress = user.address || [];
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<AddressForm | null>(
    null
  );
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handleConfirm = async () => {
    try {
      toast.loading("Place your order!");
      if (!selectedAddress) {
        toast.dismiss();
        toast.error("Please select or add an address!");
        return;
      }

      if (!selectedPayment) {
        toast.dismiss();

        toast.error("Please select a payment method!");
        return;
      }

      const res = await addOrder({
        cart: user.cart,
        address: selectedAddress,
        paymentMethodID: selectedPayment,
        stripeCustomerId: user.stripeCustomerId,
        userId: user.id,
      });
      toast.dismiss();

      toast.success("Proceeding with your order...");
      router.push(`/order/${res.orderId}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something gone wrong with your order!";
      toast.dismiss();
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full p-5 transition duration-300 bg-white rounded-lg shadow-sm outline outline-dark-500 md:p-7 gap-y-8">
      <div className="text-center">
        <h2 className="font-semibold text-heading-3">We’ll Bring It to You!</h2>
        <p className="text-caption text-dark-700">
          Just complete your information to proceed
        </p>
      </div>

      <AddressDialog
        savedAddress={savedAddress}
        setSelectedAddress={setSelectedAddress}
      />

      <PaymentDialog
        user={user}
        savedCards={savedCards}
        selected={selectedPayment}
        setSelectedPayment={setSelectedPayment}
      />

      <Button
        className="w-full text-white cursor-pointer disabled:bg-dark-700"
        onClick={handleConfirm}
        disabled={!selectedPayment || !selectedAddress}
      >
        Confirm & Continue
      </Button>
    </div>
  );
}

export default UserInfo;
