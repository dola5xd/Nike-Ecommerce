import { CartItemType } from "@/_types/cart";
import InvoiceItem from "./InvoiceItem";
import Logo from "./Logo";
import { ScrollArea } from "./scroll-area";
import { getProductPrice } from "@/_lib/api";

async function Invoice({ cart }: { cart: CartItemType[] | [] }) {
  const prices = await Promise.all(
    cart.map(async (item) => {
      const product = await getProductPrice(item.productID);
      if (!product?.price) throw new Error("Product price not found");
      return product.price * item.quantity;
    })
  );
  const totalAmount = Number(
    prices.reduce((sum, price) => sum + price, 0) + 2.0
  ).toFixed(2);
  return (
    <div className="flex flex-col w-full min-h-full px-4 py-6 bg-white rounded-lg shadow-sm lg:sticky lg:top-10 lg:min-h-auto lg:h-fit md:px-8 gap-y-6">
      <div className="flex items-center justify-center gap-2">
        <Logo color="#000" className="self-center" />
        <hr className="h-full w-[2px] bg-black" />
        <h1 className="text-center uppercase text-heading-3 futura">Invoice</h1>
      </div>

      <p className="my-2 text-center md:my-4 text-lead">
        Total: ${totalAmount}
      </p>

      <ScrollArea className="h-[100vh] lg:max-h-full px-2 md:px-6">
        {cart.map((item) => (
          <InvoiceItem key={item.id} cartItem={item} />
        ))}
      </ScrollArea>
    </div>
  );
}
export default Invoice;
