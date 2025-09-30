"use client";
import { ProductDetail } from "@/_types/product";
import { urlFor } from "@/_utils/utils";
import Image from "next/image";
import { useState } from "react";

type ThumbnailsProps = Pick<ProductDetail, "images" | "title" | "description">;

function Thumbnails({ images, title, description }: ThumbnailsProps) {
  const baseImages =
    images.length > 0
      ? images.map((img) => urlFor(img)?.url() ?? "")
      : ["/placeholder.png"];

  const thumbnails =
    baseImages.length >= 7
      ? baseImages.slice(0, 7)
      : [...baseImages, ...Array(7 - baseImages.length).fill(baseImages[0])];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col w-full gap-4 md:flex-row">
      {/* === Desktop thumbnails (vertical) === */}
      <div className="flex-col hidden md:flex gap-y-2">
        {thumbnails.map((src, i) => (
          <button
            title="image button"
            type="button"
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`border-2 cursor-pointer rounded overflow-hidden transition ${
              selectedIndex === i ? "border-dark-700" : "border-transparent"
            }`}
          >
            <Image
              alt={`${title}-thumbnail-${i}`}
              height={80}
              width={80}
              src={src}
              className="object-cover aspect-square"
            />
          </button>
        ))}
      </div>

      {/* === Large Image === */}
      <div className="flex flex-col items-center flex-1">
        <Image
          alt={description ?? title}
          height={500}
          width={500}
          src={thumbnails[selectedIndex]}
          className="rounded-lg object-cover w-full max-w-[500px] h-auto"
        />

        {/* === Mobile thumbnails (horizontal) === */}
        <div className="flex w-full gap-2 mt-4 overflow-x-auto md:hidden">
          {thumbnails.map((src, i) => (
            <button
              title="image button"
              type="button"
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`flex-shrink-0 border-2 cursor-pointer rounded overflow-hidden transition ${
                selectedIndex === i ? "border-dark-700" : "border-transparent"
              }`}
            >
              <Image
                alt={`${title}-thumbnail-${i}`}
                height={70}
                width={70}
                src={src}
                className="object-cover aspect-square"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Thumbnails;
