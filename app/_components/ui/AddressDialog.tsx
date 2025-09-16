"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAddress } from "@/_actions/addAddress";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Plus } from "lucide-react";
import * as z from "zod";
import { ScrollArea } from "./scroll-area";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Input } from "./input";

export const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  street: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().regex(/^[0-9A-Za-z\-]{3,10}$/, "Invalid ZIP / Postal Code"),
  phone: z.string().regex(/^\+?[0-9]{6,15}$/, "Invalid phone number"),
});

export type AddressForm = z.infer<typeof addressSchema>;

interface AddressDialogProps {
  savedAddress: AddressForm[] | [];
  setSelectedAddress: Dispatch<SetStateAction<AddressForm | null>>;
}

export default function AddressDialog({
  savedAddress,
  setSelectedAddress,
}: AddressDialogProps) {
  const [selected, setSelected] = useState<AddressForm | null>(null);
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

  const handleSelect = (address: AddressForm) => {
    setSelected(address);
    setSelectedAddress(address);
  };

  return (
    <div className="flex flex-col gap-4 h-1/3">
      <h2 className="text-body-medium uppercase futura">Address:</h2>
      <ScrollArea className="max-h-[85%] pr-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus /> Add new Address
            </Button>
          </DialogTrigger>
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
                className="border rounded-lg px-4 py-2 w-full"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs">
                  {errors.fullName.message}
                </p>
              )}

              <Input
                {...register("street")}
                placeholder="Street Address"
                className="border rounded-lg px-4 py-2 w-full"
              />
              {errors.street && (
                <p className="text-red-500 text-xs">{errors.street.message}</p>
              )}

              <div className="flex gap-3">
                <Input
                  {...register("city")}
                  placeholder="City"
                  className="border rounded-lg px-4 py-2 w-full"
                />
                <Input
                  {...register("state")}
                  placeholder="State"
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>
              {(errors.city || errors.state) && (
                <div className="flex gap-3">
                  {errors.city && (
                    <p className="text-red-500 text-xs w-full">
                      {errors.city.message}
                    </p>
                  )}
                  {errors.state && (
                    <p className="text-red-500 text-xs w-full">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              )}

              <Input
                {...register("zip")}
                placeholder="ZIP / Postal Code"
                className="border rounded-lg px-4 py-2 w-full"
              />
              {errors.zip && (
                <p className="text-red-500 text-xs">{errors.zip.message}</p>
              )}

              <Input
                {...register("phone")}
                placeholder="Phone Number"
                className="border rounded-lg px-4 py-2 w-full"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}

              <Button type="submit" disabled={isSubmitting} className="mt-2">
                {isSubmitting ? "Saving..." : "Save Address"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {savedAddress.length > 0 && (
          <div className="flex flex-col gap-y-4 mt-4">
            {savedAddress.map((address, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(address)}
                className={`p-3 rounded-lg border text-left flex items-center justify-between transition cursor-pointer ${
                  selected === address
                    ? "border-dark-700 bg-gray-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div>
                  <div className="text-sm font-medium">{address.fullName}</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {address.street} • {address.city} • {address.state}
                  </div>
                </div>
                <div className="text-sm text-green-600">
                  {selected === address ? (
                    <FaCircleCheck size={20} />
                  ) : (
                    "Select"
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
