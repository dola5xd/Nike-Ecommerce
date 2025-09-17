import { ScrollArea } from "@/_components/ui/scroll-area";
import { authOptions } from "@/_lib/authOptions";
import { favoriteItem } from "@/_types/favorites";
import { getServerSession } from "next-auth";
import Link from "next/link";
import FavoriteCard from "../_components/FavoriteCard";

async function page() {
  const session = await getServerSession(authOptions);
  const favorites = session?.user.favorites as favoriteItem[];
  console.log("favorites: ", favorites);

  return (
    <div className="flex flex-col h-full col-span-4 px-10 py-10 rounded outline outline-light-300 gap-y-10">
      <div className="space-y-1.5">
        <h1 className="text-heading-3">My Favorites</h1>
        <p className="text-caption text-dark-700">
          Keep tracking your favorites products from here.
        </p>
      </div>
      {favorites.length > 0 ? (
        <ScrollArea className="max-h-[320px] pr-4">
          <div className="flex flex-col gap-y-10">
            {favorites.map((favorite) => (
              <FavoriteCard key={favorite.id} favorite={favorite} />
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
            Let&apos;s Makes some favorites now!
          </Link>
          ✨
        </p>
      )}
    </div>
  );
}

export default page;
