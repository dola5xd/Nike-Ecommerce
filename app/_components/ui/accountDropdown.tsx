"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import type { user } from "@/_types/user";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

function AccountDropdown({ user }: { user: user }) {
  const { name, image, email } = user;

  const handleLogout = async () => {
    toast.loading("Logout");
    try {
      await signOut();
      toast.dismiss();
      toast.success("logout succesfully!");
    } catch (error) {
      const err =
        error instanceof Error ? error.message : "Something gone wrong";
      toast.dismiss();
      toast.error(err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          alt={"user avatar"}
          src={
            image ?? `https://avatar.iran.liara.run/username?username=${name}`
          }
          width={40}
          height={40}
          className="object-cover scale-75 rounded-full aspect-square md:scale-100"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-col gap-y-0.5">
          {name}
          <span className="text-xs">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/account"}>Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/cart"}>Cart</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AccountDropdown;
