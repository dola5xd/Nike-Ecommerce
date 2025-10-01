import Filter from "@/_components/ui/filter";
import ProductCard from "@/_components/ui/ProductCard";
import { client } from "@/_lib/sanity/client";
import { PRODUCTS_QUERY } from "@/_lib/sanity/queries";
import { Product } from "@/_types/product";
import { searchParamsToWhere } from "@/_utils/utils";

type PageProps = {
  searchParams: Promise<Record<string, string>>;
};
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Nike Products | Nike E-commerce",
  description:
    "Browse our full collection of Nike shoes, sneakers, and apparel. Find the latest drops, best sellers, and exclusive deals.",
  alternates: {
    canonical: "https://nike-ecommerce-smoky.vercel.app/products",
  },
  openGraph: {
    title: "All Nike Products | Nike E-commerce",
    description:
      "Explore Nike shoes, sneakers, and apparel. Shop the latest arrivals and best sellers.",
    url: "https://nike-ecommerce-smoky.vercel.app/products",
    siteName: "Nike E-commerce",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "All Nike Products | Nike E-commerce",
    description:
      "Browse Nike shoes, sneakers, and apparel online. Discover the latest arrivals and best sellers.",
  },
};

async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const where = searchParamsToWhere(params);

  const products: Product[] = await client.fetch(PRODUCTS_QUERY, where);

  return (
    <section className="min-h-dvh grid grid-cols-1 lg:grid-cols-5 gap-6 p-4 md:p-6">
      <Filter />

      <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        ) : (
          <p className="text-center text-heading-3 col-span-full mt-20 text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}

export default Page;
