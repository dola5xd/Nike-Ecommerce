import { authOptions } from "@/_lib/authOptions";
import { getServerSession } from "next-auth";
import CartItem from "./_components/CartItem";
import { CartItemType } from "@/_types/cart";
import Link from "next/link";
import Summary from "./_components/Summary";

async function page() {
  const session = await getServerSession(authOptions);
  const cart = (session?.user?.cart as CartItemType[]) || [];

  return (
    <section className="flex flex-col gap-y-8 py-10 px-5 md:px-10 xl:px-20 min-h-[75vh] w-full">
      {/* Page Title */}
      <h1 className="text-center uppercase futura text-heading-3 md:text-heading-2 lg:text-heading md:text-left">
        Your Cart
      </h1>

      <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="flex flex-col gap-y-6 lg:col-span-2">
          {cart.length > 0 ? (
            cart.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))
          ) : (
            <p className="mt-6 text-center">
              <Link
                href="/products"
                className="inline-block px-6 py-3 font-semibold text-white transition-all rounded-full text-lead bg-dark-900 hover:bg-dark-700"
              >
                🛒 Your cart is empty — let’s add some shoes!
              </Link>
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-20 h-fit">
          <Summary cart={cart} />
        </div>
      </div>
    </section>
  );
}

export default page;
