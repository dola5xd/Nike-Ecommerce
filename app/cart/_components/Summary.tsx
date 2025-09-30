import Button from "@/_components/ui/OrignalButton";
import { getProductPrice } from "@/_lib/api";
import { CartItemType } from "@/_types/cart";
import Link from "next/link";

async function Summary({ cart }: { cart: CartItemType[] }) {
  const prices = await Promise.all(
    cart.map((item) => getProductPrice(item.productID))
  );

  const subtotal = cart.reduce((acc, item, idx) => {
    const price = Number(prices[idx]?.price ?? 0);
    return acc + item.quantity * price;
  }, 0);

  const delivery = 2.0;
  const total = subtotal + delivery;

  return (
    <div className="flex flex-col p-6 border shadow-sm gap-y-5 rounded-xl bg-light-100">
      <h2 className="font-semibold text-heading-3">Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">
            ${subtotal ? subtotal.toFixed(2) : "0.00"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="font-medium">${delivery.toFixed(2)}</span>
        </div>

        <hr />

        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {cart.length > 0 ? (
        <Link href="/checkout">
          <Button className="w-full py-3 rounded-full">
            Proceed to Checkout
          </Button>
        </Link>
      ) : (
        <Link href="/products">
          <Button className="w-full py-3 rounded-full">
            Continue Shopping
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Summary;
