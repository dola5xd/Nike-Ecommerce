"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { userDetail } from "@/_types/user";
import { updateAccountAction } from "@/_actions/uptadeAccount";
import { getUser } from "@/_actions/getUser";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { Button } from "@/_components/ui/Button";

export type UpdatePayload = {
  email: string;
  oldPassword?: string;
  name?: string;
  newPassword?: string;
  image?: File;
};

const schema = z
  .object({
    name: z.string().min(2, "Name is too short"),
    currentPassword: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.password || data.password.length < 6
        ? true
        : data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  )
  .refine((data) => !data.password || data.password.length >= 6, {
    message: "Password must be at least 6 characters",
    path: ["password"],
  });

type FormValues = z.infer<typeof schema>;

function AccountDetails({ user }: { user: userDetail }) {
  const { update } = useSession();
  const [preview, setPreview] = useState<string | null>(user.image ?? null);
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const hasPassword = Boolean(user.password);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name ?? "",
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (formData: FormValues) => {
    startTransition(async () => {
      try {
        const payload: UpdatePayload = { email: user.email };

        if (formData.name !== user.name) payload.name = formData.name;
        if (formData.password && formData.password.trim() !== "")
          payload.newPassword = formData.password;
        if (file) payload.image = file;

        if (hasPassword) {
          if (!formData.currentPassword) {
            form.setError("currentPassword", {
              type: "manual",
              message: "Current password is required",
            });
            return;
          }
          payload.oldPassword = formData.currentPassword;
        }
        const hasUpdates = Object.keys(payload).length > 1;

        if (!hasUpdates) {
          toast.error("No changes to update");
          return;
        }
        const toastId = toast.loading("Updating account...");
        await updateAccountAction(payload, user);

        const freshUser = await getUser(user.id);

        toast.dismiss(toastId);
        toast.success("Profile updated successfully");

        form.reset({
          name: freshUser.name ?? "",
          currentPassword: "",
          password: "",
          confirmPassword: "",
        });
        setPreview(freshUser.image ?? null);
        await update();
        router.refresh();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update profile";
        toast.dismiss();
        toast.error(errorMessage);
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-2xl px-4 mx-auto space-y-6 md:px-0"
      >
        {/* Avatar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Image
            src={
              preview ??
              `https://avatar.iran.liara.run/username?username=${user.name}`
            }
            alt="Profile"
            height={100}
            width={100}
            className="object-cover border rounded-full aspect-square"
          />
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {/* Email */}
        <FormItem>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={user.email}
            disabled
            className="cursor-not-allowed bg-muted"
          />
        </FormItem>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Current Password */}
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={
                    hasPassword
                      ? "Enter current password"
                      : "Social account - create password!"
                  }
                  {...field}
                  disabled={!hasPassword}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer"
          size="lg"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}

export default AccountDetails;
