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
        toast.error(data.error || "Failed to remove card");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const renderBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return <FaCcVisa className="text-3xl text-white sm:text-4xl" />;
      case "mastercard":
        return <FaCcMastercard className="text-3xl text-red-500 sm:text-4xl" />;
      case "amex":
        return <FaCcAmex className="text-3xl text-white sm:text-4xl" />;
      default:
        return <span className="text-sm uppercase sm:text-base">{brand}</span>;
    }
  };

  return (
    <div className="col-span-1 relative flex flex-col justify-between p-4 sm:p-6 aspect-[7/4] rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg">
      {/* Brand + Last 4 */}
      <div className="flex items-center justify-between">
        {renderBrandIcon(card.brand)}
        <span className="text-base font-semibold tracking-widest sm:text-lg">
          **** {card.last4}
        </span>
      </div>

      {/* Holder + Expiry */}
      <div className="flex items-center justify-between gap-2 mt-4 text-xs sm:mt-6 sm:text-sm">
        <div>
          <p className="text-light-400">Card Holder</p>
          <p className="font-medium truncate max-w-[90px] sm:max-w-none">
            {card.billing_name}
          </p>
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
          <FaTrashAlt className="text-sm sm:text-base" />
        </Button>
      </div>
    </div>
  );
}
