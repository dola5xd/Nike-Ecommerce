"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import type { user } from "@/_types/user";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";

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
        <Avatar className="h-auto">
          <AvatarImage src={image ?? ""} />
          <AvatarFallback className="uppercase">
            {name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
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
