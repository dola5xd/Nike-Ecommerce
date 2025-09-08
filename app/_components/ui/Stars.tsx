import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";

type StarsProps = {
  rating: number;
  size?: number;
};

function Stars({ rating, size = 20 }: StarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <FaStar key={`full-${i}`} size={size} />
        ))}
      {hasHalf && <FaStarHalfAlt size={size} />}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <IoMdStarOutline key={`empty-${i}`} size={size} />
        ))}
    </div>
  );
}

export default Stars;
