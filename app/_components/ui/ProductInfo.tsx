"use client";
import SizesBox from "@/_components/ui/SizesBox";
import { ProductDetail } from "@/_types/product";
import { BsHeart } from "react-icons/bs";
import { Button } from "./button";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useMemo } from "react";
import Stars from "@/_components/ui/Stars";
import { VscAccount } from "react-icons/vsc";

function ProductInfo({ product }: { product: ProductDetail }) {
  const {
    title,
    subtitle,
    price,
    sizes,
    description,
    gender,
    badge,
    meta,
    reviews,
  } = product;

  const [showProductDetails, setShowProductDetails] = useState<boolean>(true);
  const [showReviews, setShowReviews] = useState<boolean>(false);

  // ✅ Average rating
  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return total / reviews.length;
  }, [reviews]);

  return (
    <div className="flex flex-col py-7 gap-y-4 h-full">
      <h1 className="text-heading-2 uppercase futura">{title}</h1>
      <h2 className="text-body-medium text-dark-700">{subtitle}</h2>
      <h3 className="text-heading-3 justify-end">${price}</h3>
      <SizesBox sizes={sizes} />

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full">
        <Button className="cursor-pointer py-7 text-white text-base rounded-full">
          Add to Bag
        </Button>
        <Button
          variant={"outline"}
          className="cursor-pointer py-7 text-base rounded-full hover:bg-light-400"
        >
          <BsHeart size={16} />
          Favorite
        </Button>
      </div>

      {/* Product Details */}
      <div className="mt-10 px-10 flex flex-col gap-y-7">
        <button
          type="button"
          onClick={() => setShowProductDetails((pre) => !pre)}
          className="cursor-pointer flex justify-between items-center w-full text-heading-3"
        >
          Product Details
          <IoIosArrowDown
            className={`transition-transform duration-300 ${
              showProductDetails ? "rotate-180" : ""
            }`}
          />
        </button>
        {showProductDetails && (
          <div className="flex flex-col gap-y-7">
            <p className="text-body-medium">{description}</p>
            <ul className="list-disc *:text-body-medium flex flex-col gap-y-4 px-4">
              <li>
                Colors: <span>{meta}</span>
              </li>
              <li>
                Gender: <span>{gender}</span>
              </li>
              {badge && (
                <li>
                  Status: <span>{badge?.label}</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Reviews */}
      <div className="mt-10 px-10 flex flex-col gap-y-7">
        <button
          type="button"
          onClick={() => setShowReviews((pre) => !pre)}
          className="cursor-pointer flex justify-between items-center w-full text-heading-3"
        >
          <span className="flex items-center gap-2">
            Reviews{" "}
            {reviews.length > 0 && (
              <>
                ({averageRating.toFixed(1)})
                <Stars rating={averageRating} size={18} />
              </>
            )}
          </span>
          <IoIosArrowDown
            className={`transition-transform duration-300 ${
              showReviews ? "rotate-180" : ""
            }`}
          />
        </button>

        {showReviews && (
          <div className="flex flex-col gap-y-7">
            {reviews.length ? (
              <ul className="flex flex-col gap-y-10 px-4">
                {reviews.map((review) => (
                  <li key={review._key} className="flex items-center gap-x-7">
                    <div className="flex flex-col items-center">
                      <VscAccount size={25} />
                      <span className="text-caption">{review.user}</span>
                    </div>
                    <div>
                      <span className="flex items-center gap-x-2">
                        <Stars rating={review.rating} size={16} />(
                        {review.rating})
                      </span>
                      <p className="text-body-medium">{review.comment}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductInfo;
