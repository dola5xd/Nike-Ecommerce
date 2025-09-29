import { authOptions } from "@/_lib/authOptions";
import { getServerSession } from "next-auth";
import CartItem from "./_components/CartItem";
import { CartItemType } from "@/_types/cart";
import Link from "next/link";
import Summary from "./_components/Summary";

async function page() {
  const session = await getServerSession(authOptions);
  const cart = session?.user?.cart as CartItemType[];

  return (
    <section className="flex flex-col gap-y-7 py-10 px-20 min-h-[75vh] w-screen">
      <h1 className="futura text-heading-2 uppercase">Your Cart</h1>
      <div className="grid grid-cols-4 gap-4 ">
        <div className="flex flex-col gap-y-7 col-span-3">
          {cart.length > 0 ? (
            cart?.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))
          ) : (
            <p className="text-center mt-6">
              <Link
                href="/products"
                className="inline-block px-5 py-3 rounded-full font-semibold text-lead hover:underline duration-500"
              >
                🛒 Your cart is empty — let’s add some shoes!
              </Link>
            </p>
          )}
        </div>
        <Summary cart={cart} />
      </div>
    </section>
  );
}

export default page;
