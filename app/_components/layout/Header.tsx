import Link from "next/link";
import Logo from "../ui/Logo";
import HeaderLinks from "../ui/HeaderLinks";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";
import AccountDropdown from "../ui/accountDropdown";
import { user } from "@/_types/user";
import { Button } from "../ui/button";
import { IoCartOutline } from "react-icons/io5";

async function Header() {
  const session = await getServerSession(authOptions);
  const user = session?.user as user;

  const cartLength = user.cart.length;

  return (
    <>
      {user && !user.emailVerified && (
        <div className="h-[80px] w-full text-center text-body-medium py-4 bg-dark-900 text-light-300">
          Please verfiy your account!{" "}
          <Link className="underline capitalize" href={"/verify"}>
            click here
          </Link>
        </div>
      )}
      <header className="py-6 px-10 flex items-center justify-between bg-light-100">
        <span>
          <Logo color="#000" height="22" width="62" />
        </span>

        <nav>
          <HeaderLinks />
        </nav>

        <div className="flex items-center gap-x-3">
          <Link href="/account" className="relative">
            <IoCartOutline size={30} />
            <span className="bg-dark-900 absolute -top-2.5 -right-2 h-5 w-5 text-xs font-medium text-white flex items-center justify-center rounded-full">
              {cartLength}
            </span>
          </Link>
          {user ? (
            <AccountDropdown user={user} />
          ) : (
            <Link href="/register">
              <Button size="sm" variant={"outline"} className="px-4">
                Create Account
              </Button>
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
