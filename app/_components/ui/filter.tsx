"use client";

import { filters } from "@/_data/filters";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function FilterSidebar() {
  const searchParams = useSearchParams();

  const createQueryString = (key: string, value: string, isActive: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (isActive) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    return params.toString();
  };

  return (
    <aside className="flex flex-col gap-6 pb-4 border-b lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4 md:flex-row lg:justify-normal md:justify-between lg:flex-col">
      {filters.map((filter) => (
        <div key={filter.id} className="flex flex-col gap-3">
          <h3 className="mb-2 text-lead">{filter.label}</h3>
          <ul className="space-y-2">
            {filter.options.map((option) => {
              const isActive = searchParams.get(filter.id) === option.value;
              const query = createQueryString(
                filter.id,
                option.value,
                isActive
              );

              return (
                <li key={option.value}>
                  <Link
                    href={`?${query}`}
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition text-caption lg:text-body-medium text-center ${
                      isActive ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {option.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
