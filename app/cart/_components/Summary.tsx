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

  console.log("subtotal: ", subtotal);
  const delivery = 2.0;
  const total = subtotal + delivery;

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-heading-3">Summary</h2>
      <div className="flex flex-col gap-y-4">
        <h4 className="text-body flex items-center justify-between">
          Subtotal{" "}
          <span className="text-body-medium">
            ${subtotal ? subtotal.toFixed(2) : " -----"}
          </span>
        </h4>
        <h5 className="text-body flex items-center justify-between">
          Estimated Delivery & Handling{" "}
          <span className="text-body-medium">${delivery.toFixed(2)}</span>
        </h5>
        <hr className="w-full" />
        <h6 className="text-body-medium flex items-center justify-between">
          Total{" "}
          <span>${total !== delivery ? total.toFixed(2) : " ------"}</span>
        </h6>
        <hr className="w-full" />
        {cart.length > 0 ? (
          <Link href={"/checkout"}>
            <Button className="w-full">Proceed to Checkout</Button>
          </Link>
        ) : (
          <Link href={"/products"}>
            <Button className="w-full">Proceed to products</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Summary;
