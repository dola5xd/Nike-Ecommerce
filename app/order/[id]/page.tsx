import { urlFor } from "@/_utils/utils";
import Image from "next/image";
import { format } from "date-fns";
import { getProductByID } from "@/_lib/api";
import { getOrder } from "@/_actions/getOrder";
import { ScrollArea } from "@/_components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const orderID = params.id;
  const order = await getOrder(orderID);

  if (!order) {
    return (
      <section className="flex flex-col items-center justify-center min-h-dvh">
        <h1 className="text-2xl font-semibold text-gray-800">
          Order not found
        </h1>
        <p className="mt-2 text-gray-500">Check your orders again.</p>
      </section>
    );
  }

  // 🔹 Fetch all products once
  const cartWithProducts = await Promise.all(
    order.cart.map(async (item) => {
      const product = await getProductByID(item.productID);
      return { ...item, product };
    })
  );

  // 🔹 Calculate totals
  const subtotal = cartWithProducts.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <section className="flex flex-col mx-auto max-w-[70%] px-6 py-7 gap-y-4 md:px-20 max-h-dvh">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Order <span className="text-red">#{order.orderId}</span>
        </h1>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.status}
          </span>
          <span className="text-sm text-gray-500">
            {format(new Date(order.createdAt), "dd MMM yyyy, HH:mm")}
          </span>
        </div>
      </div>

      <div className="p-5 bg-white border border-gray-200 shadow rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Products</h2>
        <ScrollArea className=" pr-4 h-auto max-h-[196px]">
          <div className="w-full max-h-[196px]">
            <ul className="flex flex-col divide-y divide-gray-200">
              {cartWithProducts.map((item) => {
                const img = item.product?.image
                  ? urlFor(item.product.image)?.format("webp").url()
                  : "";
                const lineTotal = (item.product?.price || 0) * item.quantity;
                return (
                  <li
                    key={item.productID}
                    className="flex items-center gap-4 py-3"
                  >
                    {img && (
                      <Image
                        src={img}
                        alt={item.product?.title || "Product"}
                        width={64}
                        height={64}
                        className="object-cover border rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {item.product?.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Size: {item.size} • Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-800">${lineTotal}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </ScrollArea>
      </div>

      <div className="p-5 bg-white border border-gray-200 shadow rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Order Summary
        </h2>
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between font-medium text-gray-900">
            <span>Total</span>
            <span>${subtotal}</span>
          </div>
          <div className="text-xs text-gray-500">
            Payment Method: {order.paymentMethodID}
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="p-5 bg-white border border-gray-200 shadow rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Delivery Info
        </h2>
        <div className="text-sm text-gray-700">
          <p>
            <span className="font-medium">Name:</span> {order.address.fullName}
          </p>
          <p>
            <span className="font-medium">Address:</span> {order.address.street}
            , {order.address.city}, {order.address.state}, {order.address.zip}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {order.address.phone}
          </p>
        </div>
      </div>

      <div>
        <Link
          href="/account/orders"
          className="flex items-center px-5 py-3 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-red gap-x-1 hover:bg-green w-fit hover:gap-x-2"
        >
          <ArrowLeft size={20} /> Back to Orders
        </Link>
      </div>
    </section>
  );
}
