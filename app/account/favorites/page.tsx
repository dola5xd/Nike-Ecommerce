import { authOptions } from "@/_lib/authOptions";
import { favoriteItem } from "@/_types/favorites";
import { getServerSession } from "next-auth";
import Link from "next/link";
import FavoriteCard from "../_components/FavoriteCard";

async function page() {
  const session = await getServerSession(authOptions);
  const favorites = session?.user.favorites as favoriteItem[];

  return (
    <div className="flex flex-col h-full col-span-4 px-4 py-8 rounded sm:px-6 md:px-10 sm:py-10 outline outline-light-300 gap-y-8 sm:gap-y-10">
      <div className="space-y-1.5">
        <h1 className="text-heading-3">My Favorites</h1>
        <p className="text-caption text-dark-700">
          Keep tracking your favorite products from here.
        </p>
      </div>

      {favorites?.length > 0 ? (
        <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite) => (
            <FavoriteCard key={favorite.id} favorite={favorite} />
          ))}
        </div>
      ) : (
        <p className="h-full text-center text-lead">
          ✨
          <Link
            href={"/products"}
            className="transition-all duration-300 hover:underline"
          >
            Let&apos;s make some favorites now!
          </Link>
          ✨
        </p>
      )}
    </div>
  );
}

export default page;
