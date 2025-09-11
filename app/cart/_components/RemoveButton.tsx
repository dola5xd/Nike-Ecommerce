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
        router.refresh(); // ⬅️ refresh cart list
      } else {
        toast.error(res.error || "Failed to remove");
      }
    });
  };
  return (
    <Button
      className="absolute bottom-7 right-7 cursor-pointer z-1"
      variant={"destructive"}
      size={"icon"}
      disabled={isPending}
      onClick={handleDelete}
    >
      <Trash2 />
    </Button>
  );
}

export default RemoveButton;
