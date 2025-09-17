"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/_components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/_components/ui/radio-group";
import { Label } from "@/_components/ui/label";
import { Elements } from "@stripe/react-stripe-js";
import { CreditCard } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { CardForm } from "./StripeCard";
import { BsCash } from "react-icons/bs";
import { user } from "@/_types/user";
import { SavedCard } from "@/_actions/getSavedCards";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import { FaCircleCheck } from "react-icons/fa6";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentDialogProps {
  user: user;
  savedCards: SavedCard[];
  selected: string | null;
  setSelectedPayment: Dispatch<SetStateAction<string | null>>;
}

export default function PaymentDialog({
  user,
  savedCards,
  selected: selectedProp,
  setSelectedPayment,
}: PaymentDialogProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(selectedProp ?? "card");
  const router = useRouter();

  const handleSelectSaved = (cardId: string) => {
    setSelected(`card:${cardId}`);
    setSelectedPayment(cardId);
  };

  const handleSelect = (val: string) => {
    setSelected(val);
    setSelectedPayment(val);
  };

  return (
    <div className="flex flex-col gap-4 h-1/3">
      <h2 className="uppercase text-body-medium futura">Payment:</h2>
      <ScrollArea className="max-h-[90%] pr-4">
        <RadioGroup
          className="flex flex-col gap-y-4"
          value={selected.startsWith("cod") ? "cod" : "card"}
          onValueChange={handleSelect}
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="cod" id="cod" />
            <BsCash size={20} />
            <Label htmlFor="cod">Cash on Delivery</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="card" id="card" />
            <CreditCard size={20} />
            <Label htmlFor="card">Credit Card</Label>
          </div>
        </RadioGroup>

        {selected.startsWith("card") && (
          <div className="flex flex-col mt-4 gap-y-4">
            <Button onClick={() => setOpen(true)}>Add new card</Button>
            {savedCards.length > 0 && (
              <>
                <h4 className="mb-2 text-sm font-medium">Saved cards</h4>
                <div className="flex flex-col gap-y-4">
                  {savedCards.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleSelectSaved(card.id)}
                      className={`p-3 rounded-lg border text-left flex items-center justify-between transition cursor-pointer ${
                        selected === `card:${card.id}`
                          ? "border-dark-700 bg-gray-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div>
                        <div className="text-sm font-medium">
                          **** {card.last4}
                        </div>
                        <div className="text-xs text-gray-500">
                          {card.billing_name ?? ""} • {card.exp_month}/
                          {card.exp_year}
                        </div>
                      </div>
                      <div className="text-sm text-green-600">
                        {selected === `card:${card.id}` ? (
                          <FaCircleCheck size={20} />
                        ) : (
                          "Select"
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Card Information</DialogTitle>
              <DialogDescription>
                Please provide your card details securely
              </DialogDescription>
            </DialogHeader>
            <Elements stripe={stripePromise}>
              <CardForm
                user={user}
                onComplete={() => {
                  setSelected("card");
                  setOpen(false);
                }}
                onSaved={() => router.refresh()}
              />
            </Elements>
          </DialogContent>
        </Dialog>
      </ScrollArea>
    </div>
  );
}
