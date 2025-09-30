import { getProductByID } from "@/_lib/api";
import { CartItemType } from "@/_types/cart";
import { urlFor } from "@/_utils/utils";
import Image from "next/image";

async function InvoiceItem({ cartItem }: { cartItem: CartItemType }) {
  const { productID, size, quantity } = cartItem;

  const product = await getProductByID(productID);
  const productSrcImage = product.image
    ? (urlFor(product.image)?.quality(60).format("webp").url() ?? "")
    : "";

  const totalPricePerItem = Number(product.price * quantity).toFixed(2);

  return (
    <div className="flex flex-col gap-4 pr-2 my-5 sm:flex-row sm:items-center sm:justify-between sm:pr-4">
      <div className="flex items-center w-full gap-4 sm:w-auto">
        <Image
          src={productSrcImage}
          alt={product.title}
          height={100}
          width={100}
          className="flex-shrink-0 object-cover object-center rounded"
        />

        <div className="flex flex-col w-full space-y-1 sm:space-y-2">
          <h4 className="text-body-medium md:text-lead">{product.title}</h4>
          <h5 className="text-caption text-dark-700">{product.subtitle}</h5>
          <h6 className="text-caption text-dark-700">Size: {size}</h6>
          <h6 className="text-caption text-dark-700">Quantity: {quantity}</h6>
        </div>
      </div>

      {/* Price */}
      <p className="font-semibold text-right text-body-medium sm:text-left">
        ${totalPricePerItem}
      </p>
    </div>
  );
}

export default InvoiceItem;
