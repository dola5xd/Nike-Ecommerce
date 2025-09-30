import { getUserOrders } from "@/_actions/getUserOrder";
import { authOptions } from "@/_lib/authOptions";
import { user } from "@/_types/user";
import { getServerSession } from "next-auth";
import OrderCard from "../_components/OrderCard";
import Link from "next/link";

async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user as user;
  const orders = await getUserOrders(user.id);

  return (
    <div className="flex flex-col h-full col-span-4 px-4 py-8 rounded sm:px-6 md:px-10 sm:py-10 outline outline-light-300 gap-y-8 sm:gap-y-10">
      <div className="space-y-1.5">
        <h1 className="text-heading-3">My Orders</h1>
        <p className="text-caption text-dark-700">
          Keep tracking your order from here.
        </p>
      </div>

      {orders.length > 0 ? (
        <div className="flex flex-col gap-y-6 sm:gap-y-10">
          {orders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </div>
      ) : (
        <p className="h-full text-center text-lead">
          ✨
          <Link
            href={"/products"}
            className="transition-all duration-300 hover:underline"
          >
            Let&apos;s make an order now!
          </Link>
          ✨
        </p>
      )}
    </div>
  );
}

export default Page;
