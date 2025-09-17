"use client";

import { useState } from "react";
import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/_components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { user } from "@/_types/user";
import { useRouter } from "next/navigation";
import { CardForm } from "@/_components/ui/StripeCard";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type AddNewCardProps = {
  user: user;
};

function AddNewCard({ user }: AddNewCardProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button className="cursor-pointer" onClick={() => setOpen(true)}>
        Add new Card
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
            <DialogDescription>
              Please provide your card details securely
            </DialogDescription>
          </DialogHeader>

          <Elements stripe={stripePromise}>
            <CardForm
              user={user}
              onComplete={() => setOpen(false)}
              onSaved={() => router.refresh()}
            />
          </Elements>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewCard;
