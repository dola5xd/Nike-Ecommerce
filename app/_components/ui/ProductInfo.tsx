"use client";
import SizesBox from "@/_components/ui/SizesBox";
import { ProductDetail } from "@/_types/product";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Button } from "./button";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useMemo } from "react";
import Stars from "@/_components/ui/Stars";
import { VscAccount } from "react-icons/vsc";
import { addToCart } from "@/_actions/addToCart";
import toast from "react-hot-toast";
import { CartItemType } from "@/_types/cart";
import { favoriteItem } from "@/_types/favorites";
import { addFavorite } from "@/_actions/addFavorite";
import { useRouter } from "next/navigation";

function ProductInfo({
  product,
  isFavorite,
}: {
  product: ProductDetail;
  isFavorite: boolean;
}) {
  const router = useRouter();
  const {
    title,
    _id,
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
  const [selectedSize, setSelectedSize] = useState<number>(
    Number(sizes.at(0)) ?? 40
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return total / reviews.length;
  }, [reviews]);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      toast.loading("Adding to your Cart");
      const cartItem: Partial<CartItemType> = {
        productID: _id,
        size: selectedSize,
        quantity: 1,
      };

      await addToCart(cartItem);
      toast.dismiss();
      toast.success("This product added succesfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something Gone Wrong!";
      toast.dismiss();
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToFavorite = async () => {
    try {
      setIsLoading(true);
      toast.loading("Adding to your Favorites");
      const favoriteItem: Partial<favoriteItem> = {
        productID: _id,
      };

      await addFavorite(favoriteItem);
      toast.dismiss();
      toast.success("This product added succesfully!");
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something Gone Wrong!";
      toast.dismiss();
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full py-7 gap-y-2 md:gap-y-4">
      <h1 className="uppercase text-heading md:text-heading-2 futura">
        {title}
      </h1>
      <h2 className="text-caption md:text-body-medium text-dark-700">
        {subtitle}
      </h2>
      <h3 className="justify-end text-body-medium md:text-heading-3">
        ${price}
      </h3>
      <SizesBox
        sizes={sizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />

      {/* Buttons */}
      <div className="flex flex-col w-full gap-4 px-7 md:px-0">
        <Button
          className="py-6 text-base text-white rounded-full cursor-pointer md:py-7 disabled:cursor-not-allowed disabled:bg-dark-700"
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          Add to Bag
        </Button>
        <Button
          variant={"outline"}
          className={`cursor-pointer py-5 md:py-7 text-base rounded-full ${isFavorite ? "text-white bg-red hover:bg-transparent hover:text-red" : "hover:bg-light-400"}`}
          onClick={handleAddToFavorite}
          disabled={isLoading}
        >
          {isFavorite ? <BsHeartFill size={16} /> : <BsHeart size={16} />}
          Favorite
        </Button>
      </div>

      {/* Product Details */}
      <div className="flex flex-col mt-10 lg:px-10 gap-y-7">
        <button
          type="button"
          onClick={() => setShowProductDetails((pre) => !pre)}
          className="flex items-center justify-between w-full cursor-pointer text-body-medium md:text-heading-3"
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
            <p className="text-caption md:text-body-medium">{description}</p>
            <ul className="list-disc *:text-footnote md:*:text-body-medium flex flex-col gap-y-4 px-4">
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
      <div className="flex flex-col mt-10 lg:px-10 gap-y-7">
        <button
          type="button"
          onClick={() => setShowReviews((pre) => !pre)}
          className="flex items-center justify-between w-full cursor-pointer text-body-medium md:text-heading-3"
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
          <div className="flex flex-col gap-y-2 md:gap-y-7">
            {reviews.length ? (
              <ul className="flex flex-col px-4 gap-y-10">
                {reviews.map((review) => (
                  <li key={review._key} className="flex items-center gap-x-7">
                    <div className="flex flex-col items-center">
                      <VscAccount size={25} />
                      <span className="text-footnote md:text-caption">
                        {review.user}
                      </span>
                    </div>
                    <div>
                      <span className="flex items-center gap-x-2">
                        <Stars rating={review.rating} size={16} />(
                        {review.rating})
                      </span>
                      <p className="text-caption md:text-body-medium">
                        {review.comment}
                      </p>
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
