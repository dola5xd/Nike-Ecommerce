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
    if (newQuantity < 1) return;

    setQuantity(newQuantity);

    startTransition(async () => {
      const res = await updateCartQuantity(
        cartItem.userID,
        cartItem.id,
        newQuantity
      );
      if (res.success) {
        toast.success("Quantity updated!");
        router.refresh();
      } else {
        toast.error(res.error ?? "Something went wrong");
      }
    });
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 text-sm rounded-full bg-light-200">
      <span className="text-dark-700">Qty</span>
      <button
        type="button"
        className="p-1 disabled:opacity-40"
        disabled={quantity <= 1 || isPending}
        onClick={() => updateQuantity(quantity - 1)}
      >
        <Minus size={16} />
      </button>
      <span className="font-medium">{quantity}</span>
      <button
        type="button"
        className="p-1 disabled:opacity-40"
        disabled={isPending}
        onClick={() => updateQuantity(quantity + 1)}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export default QuantityButton;
