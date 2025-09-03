import Link from "next/link";
function HeaderLinks() {
  return (
    <ul className="flex items-center gap-x-6 *:text-body-medium">
      <li>
        <Link href={"#"}>Men</Link>
      </li>
      <li>
        <Link href={"#"}>Woman</Link>
      </li>
      <li>
        <Link href={"#"}>Kids</Link>
      </li>
      <li>
        <Link href={"#"}>Collections</Link>
      </li>
      <li>
        <Link href={"#"}>Contact</Link>
      </li>
    </ul>
  );
}

export default HeaderLinks;
