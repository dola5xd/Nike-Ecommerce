import Link from "next/link";
import Logo from "../ui/Logo";
import HeaderLinks from "../ui/HeaderLinks";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";
import AccountDropdown from "../ui/accountDropdown";
import { user } from "@/_types/user";
import { Button } from "../ui/button";

async function Header() {
  const session = await getServerSession(authOptions);
  const user = session?.user as user;
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

        {user ? (
          <AccountDropdown user={user} />
        ) : (
          <Link href="/register">
            <Button size="sm" className="px-4">
              Create Account
            </Button>
          </Link>
        )}
      </header>
    </>
  );
}

export default Header;
