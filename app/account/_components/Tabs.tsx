"use client";
import { contentTabs } from "@/_data/accountTabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Tabs() {
  const pathName = usePathname();
  return (
    <div className="flex flex-col justify-center h-full col-span-1 gap-4 text-center rounded outline outline-light-400">
      {contentTabs.map((tab, i) => (
        <Link
          key={i}
          className={`w-full rounded rounded-r-[40px]  px-6 py-6 text-body-medium transition-all duration-300 ${pathName.startsWith(`/account/${tab.value}`) ? "bg-dark-900  text-white hover:bg-light-300 hover:text-black" : "hover:bg-light-400"}`}
          href={`/account/${tab.value}`}
        >
          {tab.title}
        </Link>
      ))}
    </div>
  );
}

export default Tabs;
