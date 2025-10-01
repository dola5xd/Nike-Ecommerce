import Image from "next/image";
import Button from "./OrignalButton";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { Product } from "@/_types/product";
import { urlFor } from "@/_utils/utils";

const badgeStyles: Record<string, string> = {
  green: "bg-green-100 text-green-800",
  orange: "bg-orange-100 text-orange-800",
  red: "bg-red-100 text-red-800",
  default: "bg-gray-200 text-gray-900",
};

function ProductCard({ product }: { product: Product }) {
  const imageSrc = product.image
    ? urlFor(product.image)?.format("webp").url()
    : "";

  const productHerf = `/product/${product.title.replaceAll(" ", "-")}`;

  return (
    <div className="relative min-h-[500px] w-full aspect-square rounded flex flex-col gap-y-4 transition-all duration-500 hover:[&>.overlay]:opacity-100">
      {/* Badge */}
      {product.badge?.label && (
        <span
          role="status"
          aria-label={`Product badge: ${product.badge.label}`}
          className={`absolute z-10 top-3 left-3 rounded-full px-3 py-1.5 w-fit h-fit text-body-medium ${badgeStyles[product.badge.tone] || badgeStyles.default}`}
        >
          {product.badge.label}
        </span>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center w-full transition-all duration-300 rounded opacity-0 h-3/4 bg-black/40 overlay">
        <Link href={productHerf}>
          <Button variant="light" size="lg">
            View Details <MdArrowOutward size={20} />
          </Button>
        </Link>
      </div>

      {/* Image */}
      <div className="relative w-full rounded h-3/4">
        <Image
          src={imageSrc!}
          alt={product.title}
          fill
          className="object-cover object-center rounded"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col text-body text-dark-700">
        <span className="flex items-center justify-between text-black text-body-medium">
          <h4>{product.title}</h4>${product.price.toFixed(2)}
        </span>
        <h5>{product.subtitle}</h5>
        {product.meta && <h6>{product.meta}</h6>}
      </div>
    </div>
  );
}

export default ProductCard;
