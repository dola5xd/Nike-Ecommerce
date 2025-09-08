import Link from "next/link";
function HeaderLinks() {
  return (
    <ul className="flex items-center gap-x-6 *:text-body-medium">
      <li>
        <Link href={"/products?subtitle=Men%27s+Shoes"}>Men</Link>
      </li>
      <li>
        <Link href={"/products?subtitle=Women%27s+Shoes"}>Woman</Link>
      </li>
      <li>
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
