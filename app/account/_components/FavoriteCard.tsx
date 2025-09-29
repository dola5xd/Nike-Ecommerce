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
    <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition">
      <Link href={`/product/${product._id}`}>
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 space-y-2 min-w-0">
        <Link href={`/product/${product.title}`}>
          <h3 className="text-base font-semibold text-gray-800 truncate hover:underline">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 truncate">{product.subtitle}</p>
        <p className="text-sm font-medium text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default FavoriteCard;
