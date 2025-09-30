"use client";

import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/_components/ui/dialog";
import { Input } from "@/_components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AddressForm, addressSchema } from "@/_components/ui/AddressDialog";
import { BsPhoneFill } from "react-icons/bs";
import { editAddress } from "@/_actions/editAddress";
import { removeAddress } from "@/_actions/removeAddress";

export function AddressCard({
  address,
  index,
}: {
  address: AddressForm;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: address,
  });

  const onSubmit = async (data: AddressForm) => {
    try {
      await editAddress(index, data);
      toast.success("Address updated");
      setOpen(false);
      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const handleRemove = async () => {
    try {
      await removeAddress(index);
      toast.success("Address removed");
      router.refresh();
      setOpen(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg md:flex-row md:items-start md:justify-between">
      {/* Address Info */}
      <div className="space-y-1.5 flex-1">
        <p className="font-semibold">{address.fullName}</p>
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state} {address.zip}
        </p>
        <p className="flex items-center gap-1 text-sm">
          <BsPhoneFill size={16} />
          <span className="text-dark-700">{address.phone}</span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex self-end gap-2 md:flex-col md:self-auto">
        <Button
          variant="outline"
          className="cursor-pointer"
          size="sm"
          onClick={() => setOpen(true)}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          className="cursor-pointer"
          size="sm"
          onClick={handleRemove}
        >
          Remove
        </Button>
      </div>

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>
              Update your address information below.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div>
              <Input {...register("fullName")} placeholder="Full Name" />
              {errors.fullName && (
                <p className="text-xs text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <Input {...register("street")} placeholder="Street" />
              {errors.street && (
                <p className="text-xs text-red-500">{errors.street.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <Input {...register("city")} placeholder="City" />
                {errors.city && (
                  <p className="text-xs text-red-500">{errors.city.message}</p>
                )}
              </div>
              <div>
                <Input {...register("state")} placeholder="State" />
                {errors.state && (
                  <p className="text-xs text-red-500">{errors.state.message}</p>
                )}
              </div>
            </div>

            <div>
              <Input {...register("zip")} placeholder="ZIP" />
              {errors.zip && (
                <p className="text-xs text-red-500">{errors.zip.message}</p>
              )}
            </div>

            <div>
              <Input {...register("phone")} placeholder="Phone" />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
