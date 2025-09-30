"use client";

import { Dispatch, SetStateAction } from "react";

const AllSize: number[] = Array.from({ length: 20 }, (_, i) => i + 30);

function SizesBox({
  sizes,
  setSelectedSize,
  selectedSize,
}: {
  sizes: string[];
  selectedSize: number;
  setSelectedSize: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex flex-col py-2 gap-y-2 md:gap-y-4 md:py-0">
      <h4 className="font-semibold text-caption">Select Size</h4>
      <div className="flex flex-wrap justify-center md:justify-normal gap-x-3 gap-y-4">
        {AllSize.map((size) => {
          const isAvailable = sizes.includes(size.toString());
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && setSelectedSize(size)}
              className={`py-2.5 px-5 text-sm rounded ring-1 ring-light-400 transition-all  ${
                isAvailable
                  ? "cursor-pointer hover:bg-black/10"
                  : "line-through bg-light-400 text-dark-700 cursor-not-allowed"
              } ${isSelected ? "bg-black text-white hover:bg-black/50" : ""} 
  `}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SizesBox;
