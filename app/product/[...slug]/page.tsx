import ProductCard from "@/_components/ui/ProductCard";
import ProductInfo from "@/_components/ui/ProductInfo";
import Thumbnails from "@/_components/ui/Thumbnails";
import { getProductByName, getProductSuggest } from "@/_lib/api";
import { authOptions } from "@/_lib/authOptions";
import { favoriteItem } from "@/_types/favorites";
import { ProductDetail } from "@/_types/product";
import { getServerSession } from "next-auth";

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
    <main className="min-h-[200dvh] flex flex-col gap-y-20 px-10 py-7">
      <section className="grid grid-cols-2 h-full w-full gap-2">
        <Thumbnails images={images} title={title} description={description} />
        <ProductInfo product={product} isFavorite={isFavorite} />
      </section>
      {suggestProducts && (
        <section className="py-7 space-y-7">
          <h2 className="text-heading-3 uppercase futura">
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
