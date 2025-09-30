import { getProductByID } from "@/_lib/api";
import type { OrderType } from "@/_types/order";
import { urlFor } from "@/_utils/utils";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function OrderCard({ order }: { order: OrderType }) {
  const { cart, status, createdAt, address } = order;
  const itemLength = cart.length - 1;
  const firstProduct = await getProductByID(cart.at(0)!.productID);
  const { image, title } = firstProduct;
  const ImageSrc = image ? urlFor(image)?.format("webp").url() : "";

  return (
    <div className="w-full p-4 transition bg-white border sm:p-6 rounded-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        {/* Product images */}
        <div className={`flex ${itemLength > 0 ? "w-fit -space-x-5" : ""}`}>
          <Image
            height={75}
            width={75}
            src={ImageSrc!}
            alt={title + " Image"}
            className="object-cover object-center border rounded-lg aspect-square w-[70px] h-[70px] sm:w-[75px] sm:h-[75px]"
          />
          {itemLength > 0 && (
            <span className="w-[70px] h-[70px] sm:w-[75px] sm:h-[75px] rounded-lg flex items-center justify-center bg-gray-100 text-xs sm:text-sm font-medium border">
              +{itemLength}
            </span>
          )}
        </div>

        {/* Order info */}
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
            {title}
            {itemLength > 0 && (
              <span className="ml-1 text-xs text-gray-500 sm:text-sm">
                {` & ${itemLength} more`}
              </span>
            )}
          </h2>

          {/* Status + Date */}
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 sm:text-sm">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                status === "paid"
                  ? "bg-green-100 text-green"
                  : "bg-yellow-100 text-red"
              }`}
            >
              {status}
            </span>
            <span>•</span>
            <span>{format(new Date(createdAt), "dd MMM yyyy")}</span>
          </div>

          {/* Address preview */}
          <p className="mt-2 text-xs text-gray-600 sm:text-sm">
            Deliver to <span className="font-medium">{address.fullName}</span>,{" "}
            {address.city}
          </p>
        </div>

        {/* Show details link */}
        <Link
          href={`/order/${order.orderId}`}
          className="flex items-center mt-2 transition-all duration-300 sm:mt-3 text-caption text-red gap-x-1 hover:gap-x-2 hover:text-green"
        >
          Show more details <ArrowRight size={18} className="sm:size-5" />
        </Link>
      </div>

      {/* Bottom: order id */}
      <div className="pt-2 mt-3 text-xs text-gray-400 border-t">
        Order ID: {order.orderId}
      </div>
    </div>
  );
}

export default OrderCard;
