import Link from "next/link";
import Logo from "../ui/Logo";
import HeaderLinks from "../ui/HeaderLinks";

function Header() {
  return (
    <header className="py-7 px-10 flex items-center justify-between bg-light-100">
      <span>
        <Logo color="#000" height="22" width="62" />
      </span>

      <nav>
        <HeaderLinks />
      </nav>

      <div>
        <ul className="flex items-center gap-x-6 *:text-body-medium">
          <li>
            <Link href={"#"}>Search</Link>
          </li>
          <li>
            <Link href={"#"}>My Cart (2)</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
