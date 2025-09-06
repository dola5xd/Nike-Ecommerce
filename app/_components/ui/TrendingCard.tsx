import type { Trending } from "@/_types/trending";
import Image from "next/image";
import Link from "next/link";
import Button from "./OrignalButton";
import { MdArrowOutward } from "react-icons/md";

function TrendingCard({
  trending,
  index,
}: {
  trending: Trending;
  index: number;
}) {
  const { herf, imageUrl, title, description } = trending;
  return (
    <div
      className={`relative rounded 
        ${index === 0 ? "h-[490px] sm:col-span-2" : "h-[390px] sm:row-start-2"} 
       `}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center w-full h-full transition-all duration-300 rounded overlay ${
          index === 0
            ? "bg-gradient-to-r from-black/70 to-80% to-transparent"
            : "bg-gradient-to-t from-black/70 to-transparent"
        } `}
      />

      {/* Image */}
      <Image
        src={imageUrl}
        alt="trending image"
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 100vw"
        className="object-cover object-center rounded"
      />

      <div className="relative z-20 flex flex-col justify-center h-full p-10 mt-auto text-white w-fit gap-y-3">
        <h3 className="text-heading-2">{title}</h3>
        <p
          className={`${
            title ? "text-light-400" : "mt-auto text-light-100"
          } text-lead `}
        >
          {description}
        </p>
        <Link href={herf}>
          <Button variant="light" size="sm" className="futura">
            Shop Now <MdArrowOutward size={20} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default TrendingCard;
