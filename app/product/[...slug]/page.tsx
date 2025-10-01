import ProductCard from "@/_components/ui/ProductCard";
import ProductInfo from "@/_components/ui/ProductInfo";
import Thumbnails from "@/_components/ui/Thumbnails";
import { getProductByName, getProductSuggest } from "@/_lib/api";
import { authOptions } from "@/_lib/authOptions";
import { favoriteItem } from "@/_types/favorites";
import { ProductDetail } from "@/_types/product";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import { urlFor } from "@/_utils/utils";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductByName(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | Nike E-commerce",
      description: "The product you are looking for is not available.",
    };
  }

  const { title, description, images } = product;

  // Extract valid image URLs
  const imageUrls =
    images
      ?.map((img) => urlFor(img)?.url())
      .filter((url: string | undefined): url is string => Boolean(url)) || [];

  return {
    title: `${title} | Nike E-commerce`,
    description: description || `Buy ${title} from Nike online store.`,
    alternates: {
      canonical: `https://nike-ecommerce-smoky.vercel.app/products/${params.slug}`,
    },
    openGraph: {
      title: `${title} | Nike E-commerce`,
      description: description || `Buy ${title} from Nike online store.`,
      url: `https://nike-ecommerce-smoky.vercel.app/products/${params.slug}`,
      siteName: "Nike E-commerce",
      type: "website",
      images: imageUrls.length
        ? imageUrls.map((url) => ({
            url,
            width: 800,
            height: 800,
            alt: title,
          }))
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Nike E-commerce`,
      description: description || `Buy ${title} from Nike online store.`,
      images: imageUrls.length ? [imageUrls[0]] : undefined,
    },
  };
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug.at(0)!;
  const product: ProductDetail = await getProductByName(slug);
  const { title, images, description, gender, _id } = product;

  const session = await getServerSession(authOptions);
  const favorites = session?.user.favorites as favoriteItem[];
  const isFavorite: boolean =
    favorites?.findIndex((product) => product.productID === _id) > -1;

  const suggestProducts = await getProductSuggest(_id, gender);
  return (
    <main className="flex flex-col px-4 lg:min-h-screen lg:gap-y-16 sm:px-6 lg:px-10 py-7">
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Thumbnails images={images} title={title} description={description} />
        <ProductInfo product={product} isFavorite={isFavorite} />
      </section>

      {suggestProducts && (
        <section className="py-7 space-y-7">
          <h2 className="uppercase text-heading-3 futura">
            You Might Also Like:
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suggestProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default page;
