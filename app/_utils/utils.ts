import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/_lib/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const { projectId, dataset } = client.config();

export const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export function searchParamsToWhere(
  params: Record<string, string | string[] | undefined>
) {
  const getValue = (val: string | string[] | undefined): string | null => {
    if (!val) return null;
    return Array.isArray(val) ? val[0] : val;
  };

  const color = getValue(params.color);
  const meta = getValue(params.meta);
  const subtitle = getValue(params.subtitle);

  // Handle price ranges like "25-50" or "over-150"
  const priceRaw = getValue(params.price);
  let minPrice: number | null = null;
  let maxPrice: number | null = null;

  if (priceRaw) {
    if (priceRaw.includes("-")) {
      const [min, max] = priceRaw.split("-").map(Number);
      if (!isNaN(min)) minPrice = min;
      if (!isNaN(max)) maxPrice = max;
    } else if (priceRaw.startsWith("over-")) {
      const min = Number(priceRaw.replace("over-", ""));
      if (!isNaN(min)) minPrice = min;
    }
  }

  return {
    color: color ? color.toLowerCase() : null,
    meta: meta ? meta.toLowerCase() : null,
    subtitle: subtitle ? subtitle.toLowerCase() : null,
    minPrice,
    maxPrice,
  };
}
