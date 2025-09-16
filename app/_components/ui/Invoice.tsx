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
    <div className="flex flex-col w-2/3 min-h-full py-10 rounded gap-y-6 outline-1 outline-dark-700">
      <div className="flex items-center justify-center gap-2">
        <Logo color="#000" className="self-center" />
        <hr className="h-full w-[2px] bg-black" />
        <h1 className="text-center uppercase text-heading-3 futura">
          Invoice
        </h1>{" "}
      </div>
      <p className="my-4 text-center text-lead">Total: ${totalAmount}</p>
      <ScrollArea className="max-h-[calc(100vh-320px)] px-10">
        {cart.map((item) => (
          <InvoiceItem key={item.id} cartItem={item} />
        ))}
      </ScrollArea>
    </div>
  );
}

export default Invoice;
