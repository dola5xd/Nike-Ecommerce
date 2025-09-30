import Link from "next/link";
import Button from "../ui/OrignalButton";
import ProductCard from "../ui/ProductCard";
import { MdArrowOutward } from "react-icons/md";
import { Product } from "@/_types/product";
import { client } from "@/_lib/sanity/client";
import { HOME_PRODUCTS_QUERY } from "@/_lib/sanity/queries";

async function BestSeller() {
  const products: Product[] = await client.fetch(HOME_PRODUCTS_QUERY);

  return (
    <section className="flex flex-col justify-between px-6 py-10 gap-y-4 min-h-dvh sm:px-10 lg:px-20">
      <h3 className="uppercase text-heading-3 futura ">Best Seller Shoes:</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <Link
        href={"/products"}
        aria-label="See more products"
        className="self-center"
      >
        <Button variant="dark" size="lg">
          See More <MdArrowOutward size={20} />
        </Button>
      </Link>
    </section>
  );
}

export default BestSeller;
