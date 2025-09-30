import Link from "next/link";
function HeaderLinks() {
  return (
    <ul className="flex items-center gap-x-1.5 md:gap-x-6 *:text-caption md:*:text-body-medium">
      <li className="hidden md:block">
        <Link href={"/products?subtitle=Men%27s+Shoes"}>Men</Link>
      </li>
      <li className="hidden md:block">
        <Link href={"/products?subtitle=Women%27s+Shoes"}>Woman</Link>
      </li>
      <li className="hidden md:block">
        <Link href={"/products?subtitle=Kids%27+Shoes"}>Kids</Link>
      </li>
      <li>
        <Link href={"/products"}>Collections</Link>
      </li>
      <li>
        <Link href={"/contact"}>Contact</Link>
      </li>
    </ul>
  );
}

export default HeaderLinks;
