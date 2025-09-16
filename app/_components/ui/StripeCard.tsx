import { useEffect, useState } from "react";
import { Button } from "@/_components/ui/button";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { updatePaymentAction } from "@/_actions/uptadeUserPaymentId";
import toast from "react-hot-toast";
import { user } from "@/_types/user";

export function CardForm({
  onComplete,
  user,
  onSaved,
}: {
  onComplete: (last4: string) => void;
  user: user;
  onSaved?: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Create setup intent linked to this user
  useEffect(() => {
    const createSetupIntent = async () => {
      try {
        const res = await fetch("/api/stripe/setup-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid: user.id }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setClientSecret(data.clientSecret);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to initialize payment";
        toast.error(errorMessage);
      }
    };
    if (user?.id) createSetupIntent();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    try {
      setLoading(true);
      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { name: user.name, email: user.email },
        },
      });

      if (result.error) {
        toast.error(result.error.message ?? "Card setup failed");
        return;
      }

      const pmId = result.setupIntent.payment_method as string;
      const pm = await fetch(`/api/stripe/payment-method/${pmId}`).then((r) =>
        r.json()
      );

      // update Firestore via server action (your existing updatePaymentAction)
      await updatePaymentAction(pmId);

      onComplete(pm.card?.last4 ?? "XXXX");

      // notify parent to refresh the saved cards
      if (onSaved) onSaved();

      toast.success("Card saved successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong with Stripe";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border rounded" />
      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={loading || !clientSecret}
      >
        {loading ? "Saving..." : "Save Card"}
      </Button>
    </form>
  );
}
