import Link from "next/link";
import Button from "../ui/OrignalButton";
import ProductCard from "../ui/ProductCard";
import { MdArrowOutward } from "react-icons/md";

function BestSeller() {
  return (
    <section className="flex flex-col justify-between px-6 py-10 min-h-dvh sm:px-10 lg:px-20">
      <h3 className="uppercase text-heading-3 futura ">Best Seller Shoes:</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <Link href={"/shop"} className="self-center">
        {" "}
        <Button variant="dark" size="lg">
          See More <MdArrowOutward size={20} />
        </Button>
      </Link>
    </section>
  );
}

export default BestSeller;
