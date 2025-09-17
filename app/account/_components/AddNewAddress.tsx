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
import { useRouter } from "next/navigation";
import { addAddress } from "@/_actions/addAddress";
import { AddressForm, addressSchema } from "@/_components/ui/AddressDialog";
import { Input } from "@/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function AddNewAddress() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddressForm>({ resolver: zodResolver(addressSchema) });

  const onSubmit = async (data: AddressForm) => {
    try {
      toast.loading("Adding address...");
      await addAddress(data);
      toast.dismiss();
      toast.success("Address added successfully!");
      reset();
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.dismiss();
      toast.error(
        error instanceof Error ? error.message : "Failed to save address"
      );
    }
  };

  return (
    <>
      <Button className="cursor-pointer" onClick={() => setOpen(true)}>
        Add new address
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add / Select Address</DialogTitle>
            <DialogDescription>
              Please provide your full delivery information.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 mt-4"
          >
            <Input
              {...register("fullName")}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName.message}</p>
            )}

            <Input
              {...register("street")}
              placeholder="Street Address"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.street && (
              <p className="text-xs text-red-500">{errors.street.message}</p>
            )}

            <div className="flex gap-3">
              <Input
                {...register("city")}
                placeholder="City"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <Input
                {...register("state")}
                placeholder="State"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            {(errors.city || errors.state) && (
              <div className="flex gap-3">
                {errors.city && (
                  <p className="w-full text-xs text-red-500">
                    {errors.city.message}
                  </p>
                )}
                {errors.state && (
                  <p className="w-full text-xs text-red-500">
                    {errors.state.message}
                  </p>
                )}
              </div>
            )}

            <Input
              {...register("zip")}
              placeholder="ZIP / Postal Code"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.zip && (
              <p className="text-xs text-red-500">{errors.zip.message}</p>
            )}

            <Input
              {...register("phone")}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}

            <Button type="submit" disabled={isSubmitting} className="mt-2">
              {isSubmitting ? "Saving..." : "Save Address"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewAddress;
