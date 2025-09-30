// app/account/_components/FavoriteCard.tsx
import { getProductByID } from "@/_lib/api";
import { favoriteItem } from "@/_types/favorites";
import Image from "next/image";
import Link from "next/link";
import { ProductCart } from "@/_types/product";
import { urlFor } from "@/_utils/utils";

async function FavoriteCard({ favorite }: { favorite: favoriteItem }) {
  const product: ProductCart | null = await getProductByID(favorite.productID);

  if (!product) return null;
  const imageSrc = urlFor(product.image!)?.url() ?? "";

  return (
    <div className="flex flex-col w-full gap-4 p-4 transition bg-white border shadow-sm sm:flex-row sm:items-center rounded-xl hover:shadow-md">
      <Link href={`/product/${product._id}`} className="flex-shrink-0">
        <div className="relative w-full h-40 sm:w-20 sm:h-20">
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </Link>

      <div className="flex-1 min-w-0 space-y-1">
        <Link href={`/product/${product._id}`}>
          <h3 className="text-base font-semibold text-gray-800 truncate sm:text-lg hover:underline">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 truncate">{product.subtitle}</p>
        <p className="text-sm font-medium text-gray-900 sm:text-base">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default FavoriteCard;
