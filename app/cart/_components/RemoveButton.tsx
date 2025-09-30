"use client";
import { Button } from "@/_components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteCartItem } from "@/_actions/deleteCartItem";
import { useTransition } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function RemoveButton({ itemID }: { itemID: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteCartItem(itemID);
      if (res.success) {
        toast.success("Item removed from cart");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to remove");
      }
    });
  };

  return (
    <Button
      className="absolute top-5 right-5 md:bottom-7 md:right-7 "
      variant={"destructive"}
      size={"icon"}
      disabled={isPending}
      onClick={handleDelete}
    >
      <Trash2 size={18} />
    </Button>
  );
}

export default RemoveButton;
