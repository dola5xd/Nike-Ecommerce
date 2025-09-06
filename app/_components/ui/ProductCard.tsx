import Image from "next/image";
import Button from "./OrignalButton";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

function ProductCard() {
  return (
    <div className="relative h-[420px] sm:h-[75dvh] w-full rounded flex flex-col gap-y-4 transition-all duration-500 hover:[&>.overlay]:opacity-100">
      <span className="absolute z-10 top-3 left-3 rounded-full px-3 py-1.5 bg-white w-fit h-fit text-body-medium">
        Best Seller
      </span>

      {/* Hover Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center w-full transition-all duration-300 rounded opacity-0 h-3/4 bg-black/40 overlay">
        <Link href={"#"}>
          <Button variant="light" size="lg">
            Add to Cart <MdArrowOutward size={20} />
          </Button>
        </Link>
      </div>

      <div className="relative w-full rounded h-3/4">
        <Image
          src={"/shoes/shoe-4.webp"}
          alt="Shoe"
          fill
          className="object-cover object-center rounded"
        />
      </div>

      <div className="flex flex-col text-body text-dark-700">
        <h4 className="flex items-center justify-between text-black text-body-medium">
          Nike Air Force 1 Mid &apos;07 <span>$98.30</span>
        </h4>
        <h5>Men&apos;s Shoes</h5>
        <h6>6 Colour</h6>
      </div>
    </div>
  );
}

export default ProductCard;
