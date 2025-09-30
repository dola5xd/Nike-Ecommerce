"use client";
import { contentTabs } from "@/_data/accountTabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Tabs() {
  const pathName = usePathname();

  return (
    <nav>
      <div className="flex gap-2 pb-2 overflow-x-auto lg:flex-col lg:overflow-x-hidden scrollbar-hide md:justify-center">
        {contentTabs.map((tab, i) => {
          const active = pathName.startsWith(`/account/${tab.value}`);
          return (
            <Link
              key={i}
              href={`/account/${tab.value}`}
              className={`px-4 py-3 text-footnote md:text-caption xl:text-body-medium whitespace-nowrap transition-all duration-300 rounded-md ${
                active
                  ? "bg-dark-900 text-white hover:bg-dark-700"
                  : "text-gray-700 hover:bg-light-200"
              }`}
            >
              {tab.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Tabs;
