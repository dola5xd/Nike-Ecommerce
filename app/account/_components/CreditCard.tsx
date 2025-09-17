"use client";

import { SavedCard } from "@/_actions/getSavedCards";
import { Button } from "@/_components/ui/button";
import { FaTrashAlt } from "react-icons/fa";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type CardItemProps = {
  card: SavedCard;
};

export default function CardItem({ card }: CardItemProps) {
  const router = useRouter();

  const handleRemove = async () => {
    try {
      const res = await fetch("/api/stripe/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: card.id }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Card removed!");
        router.refresh();
      } else {
        toast.error("Error:", data.error);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something gone wrong";
      toast.error(errorMessage);
    }
  };

  const renderBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return <FaCcVisa className="text-3xl text-white" />;
      case "mastercard":
        return <FaCcMastercard className="text-3xl text-red-500" />;
      case "amex":
        return <FaCcAmex className="text-3xl text-white" />;
      default:
        return <span className="text-sm uppercase">{brand}</span>;
    }
  };

  return (
    <div className="col-span-1 relative flex flex-col justify-between p-6 aspect-[7/4] rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg">
      {/* Brand + Last 4 */}
      <div className="flex items-center justify-between">
        {renderBrandIcon(card.brand)}
        <span className="text-lg font-semibold tracking-widest">
          **** {card.last4}
        </span>
      </div>

      {/* Holder + Expiry */}
      <div className="flex items-center justify-between mt-6 text-xs">
        <div>
          <p className="text-light-400">Card Holder</p>
          <p className="font-medium">{card.billing_name}</p>
        </div>
        <div>
          <p className="text-light-400">Expires</p>
          <p className="font-medium">
            {card.exp_month}/{card.exp_year}
          </p>
        </div>

        <Button
          variant="destructive"
          size="icon"
          onClick={handleRemove}
          className="flex items-center cursor-pointer"
        >
          <FaTrashAlt />
        </Button>
      </div>
    </div>
  );
}
