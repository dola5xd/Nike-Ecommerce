import Image from "next/image";
import Button from "./OrignalButton";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { Product } from "@/_types/product";
import { urlFor } from "@/_utils/utils";

function ProductCard({ product }: { product: Product }) {
  const imageSrc = product.image
    ? urlFor(product.image)?.format("webp").url()
    : "";

  return (
    <div className="relative min-h-[500px] w-full aspect-square rounded flex flex-col gap-y-4 transition-all duration-500 hover:[&>.overlay]:opacity-100">
      {/* Badge */}
      {product.badge?.label && (
        <span className="absolute z-10 top-3 left-3 rounded-full px-3 py-1.5 bg-white text-red w-fit h-fit text-body-medium">
          {product.badge.label}
        </span>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center w-full transition-all duration-300 rounded opacity-0 h-3/4 bg-black/40 overlay">
        <Link href={`/products/${product._id}`}>
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
        <h4 className="flex items-center justify-between text-black text-body-medium">
          {product.title}
          <span>${product.price.toFixed(2)}</span>
        </h4>
        <h5>{product.subtitle}</h5>
        {product.meta && <h6>{product.meta}</h6>}
      </div>
    </div>
  );
}

export default ProductCard;
