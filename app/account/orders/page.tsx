import { getUserOrders } from "@/_actions/getUserOrder";
import { authOptions } from "@/_lib/authOptions";
import { user } from "@/_types/user";
import { getServerSession } from "next-auth";
import OrderCard from "../_components/OrderCard";
import Link from "next/link";
import { ScrollArea } from "@/_components/ui/scroll-area";

async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user as user;
  const orders = await getUserOrders(user.id);

  return (
    <div className="flex flex-col h-full col-span-4 px-10 py-10 rounded outline outline-light-300 gap-y-10">
      {/* Remember to a ScrollArea */}
      <div className="space-y-1.5">
        <h1 className="text-heading-3">My Orders</h1>
        <p className="text-caption text-dark-700">
          Keep tracking your order from here.
        </p>
      </div>
      {orders.length > 0 ? (
        <ScrollArea className="max-h-[320px] pr-4">
          <div className="flex flex-col gap-y-10">
            {orders.map((order) => (
              <OrderCard key={order.orderId} order={order} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <p className="h-full text-center text-lead">
          ✨
          <Link
            href={"/products"}
            className="transition-all duration-300 hover:underline"
          >
            Let&apos;s Makes order now!
          </Link>
          ✨
        </p>
      )}
    </div>
  );
}

export default page;
