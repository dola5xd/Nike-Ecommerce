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
    <div className="my-7 flex gap-x-4 items-center pr-4">
      <Image
        src={productSrcImage}
        alt={product.title}
        height={100}
        width={100}
        className="rounded object-center object-cover"
      />
      <div className="space-y-2 w-2/3">
        <h4 className="text-lead">{product.title}</h4>
        <h5 className="text-caption text-dark-700">{product.subtitle}</h5>
        <h6 className="text-caption text-dark-700">Size: {size}</h6>
        <h6 className="text-caption text-dark-700">Quantity: {quantity}</h6>
      </div>
      <p className="text-body-medium">${totalPricePerItem}</p>
    </div>
  );
}
export default InvoiceItem;
