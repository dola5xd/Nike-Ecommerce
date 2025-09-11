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

  const imageSrc = image
    ? urlFor(image)?.height(170).width(170).format("webp").url()
    : "";

  return (
    <div className="relative flex items-center gap-x-7 w-full px-7">
      <Image
        src={imageSrc!}
        alt="title"
        height={170}
        width={170}
        className="object-cover rounded"
      />
      <div className="w-1/2 space-y-2">
        <h2 className="text-lead hover:underline transition-all duration-500">
          <Link href={`/product/${title.replaceAll(" ", "-")}`}>{title}</Link>
        </h2>
        <h3 className="text-body text-dark-700">{subtitle}</h3>
        <div className="flex items-center gap-x-7">
          <h4 className="text-body text-dark-700">
            Size: <span className="text-body-medium text-dark-900">{size}</span>
          </h4>
          {/* quantaty */}
          <QuantityButton cartItem={cartItem} />
        </div>
      </div>
      <span className="ml-auto text-lead h-1/2">
        $ {Number(quantity * price).toFixed(2)}
      </span>
      <RemoveButton itemID={cartItem.id} />
    </div>
  );
}

export default CartItem;
