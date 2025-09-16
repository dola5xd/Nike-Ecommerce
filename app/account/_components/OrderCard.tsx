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
    <div className="w-full p-4 transition rounded-xl">
      <div className="flex items-start gap-4">
        {/* Product images */}
        <div className={`flex ${itemLength > 0 ? "w-[122px] -space-x-7" : ""}`}>
          <Image
            height={75}
            width={75}
            src={ImageSrc!}
            alt={title + " Image"}
            className="object-cover object-center border rounded-lg aspect-square"
          />
          {itemLength > 0 && (
            <span className="w-[75px] h-[75px] rounded-lg flex items-center justify-center bg-gray-100 text-sm font-medium border">
              +{itemLength}
            </span>
          )}
        </div>

        {/* Order info */}
        <div className="flex-1">
          <h2 className="text-base font-semibold text-gray-800">
            {title}
            {itemLength > 0 && (
              <span className="ml-1 text-sm text-gray-500">{` & ${itemLength} more`}</span>
            )}
          </h2>

          {/* Status + Date */}
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
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
          <p className="mt-2 text-sm text-gray-600">
            Deliver to <span className="font-medium">{address.fullName}</span>,{" "}
            {address.city}
          </p>
        </div>
        <Link
          href={`/order/${order.orderId}`}
          className="flex items-center mt-3 transition-all duration-300 text-caption text-red gap-x-1 hover:gap-x-2 hover:text-green"
        >
          Show more details <ArrowRight size={20} />
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

// order={
//     userId: '116597734513871233774',
//     cart: [ [Object] ],
//     address: {
//       fullName: 'Adel Yasser',
//       street: 'asdafsaf',
//       city: 'cairo',
//       state: 'cairo',
//       zip: '1333333333',
//       phone: '42111111111111'
//       zip: '1333333333',
//       phone: '42111111111111'
//     },
//     paymentMethodID: 'pm_1S7XXYRvmBsXcoMAL05fXqM0',
//     status: 'paid',
//     createdAt: 1757932950647,
// orderId: 'a61e8f74-c4ac-41f3-9f3c-914d20e964ad'
//   },
