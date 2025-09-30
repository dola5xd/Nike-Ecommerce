import { getProductByID } from "@/_lib/api";
import { CartItemType } from "@/_types/cart";
import { urlFor } from "@/_utils/utils";
import Image from "next/image";
import QuantityButton from "./QuantityButton";
import RemoveButton from "./RemoveButton";
import Link from "next/link";

async function CartItem({ cartItem }: { cartItem: CartItemType }) {
  const product = await getProductByID(cartItem.productID);
  const { price, subtitle, title, image } = product;
  const { quantity, size } = cartItem;

  const imageSrc = image ? urlFor(image)?.format("webp").url() : "";

  return (
    <div className="relative flex flex-col items-start w-full gap-6 p-5 border sm:flex-row sm:items-center rounded-xl bg-light-100">
      {/* Product Image */}
      <Image
        src={imageSrc!}
        alt={title}
        height={250}
        width={250}
        className="object-cover rounded-lg w-full aspect-[1/1] sm:w-[170px] sm:h-[170px]"
      />

      {/* Product Info */}
      <div className="flex flex-col w-full gap-3">
        <h2 className="font-semibold transition text-lead hover:underline">
          <Link href={`/product/${title.replaceAll(" ", "-")}`}>{title}</Link>
        </h2>
        <h3 className="text-body text-dark-700">{subtitle}</h3>

        <div className="flex flex-wrap items-center gap-5">
          <p className="text-body text-dark-700">
            Size: <span className="font-medium text-dark-900">{size}</span>
          </p>
          <QuantityButton cartItem={cartItem} />
        </div>
      </div>

      {/* Price */}
      <span className="ml-auto font-semibold text-lead text-dark-900">
        ${Number(quantity * price).toFixed(2)}
      </span>

      {/* Remove */}
      <RemoveButton itemID={cartItem.id} />
    </div>
  );
}

export default CartItem;
