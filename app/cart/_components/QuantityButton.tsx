"use client";
import { useRouter } from "next/navigation";
import { updateCartQuantity } from "@/_actions/updateCartQuantity";
import { CartItemType } from "@/_types/cart";
import { Minus, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";

function QuantityButton({ cartItem }: { cartItem: CartItemType }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return; // prevent 0 or negative

    setQuantity(newQuantity);

    startTransition(async () => {
      const res = await updateCartQuantity(
        cartItem.userID,
        cartItem.id,
        newQuantity
      );
      if (res.success) {
        toast.success("Quantity updated!");
        router.refresh(); // ⬅️ forces server component re-render
      } else {
        toast.error(res.error ?? "Something Gone wrong");
      }
    });
  };

  return (
    <div className="w-fit py-1.5 rounded-full px-3 flex items-center gap-x-3 bg-light-200">
      Quantity
      <button
        type="button"
        title="Decrement Quantity"
        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        disabled={quantity <= 1 || isPending}
        onClick={() => updateQuantity(quantity - 1)}
      >
        <Minus />
      </button>
      <span>{quantity}</span>
      <button
        type="button"
        title="Increment Quantity"
        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isPending}
        onClick={() => updateQuantity(quantity + 1)}
      >
        <Plus />
      </button>
    </div>
  );
}

export default QuantityButton;
