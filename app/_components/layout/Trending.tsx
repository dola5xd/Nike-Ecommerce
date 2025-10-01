import type { Trending } from "@/_types/trending";
import TrendingCard from "../ui/TrendingCard";

const trending: Trending[] = [
  {
    imageUrl: "/trending-1.webp",
    title: "React Presto",
    description: "With React foam for the most comfortable Presto ever.",
    herf: "#",
  },
  {
    imageUrl: "/trending-2.webp",
    description: "Air Jorden 11 Retro Low LE",
    herf: "#",
  },
  {
    imageUrl: "/trending-3.webp",
    description: "Summer Must-Haves: Air Max Dia",
    herf: "#",
  },
];

function Trending() {
  return (
    <section className="z-20 flex flex-col px-6 py-10 gap-y-4 min-h-dvh sm:px-10">
      <h3 className="uppercase text-heading-3 futura">Trending Now:</h3>

      <div className="grid grid-cols-1 grid-rows-1 gap-4.5 sm:grid-cols-2 ">
        {trending.map((e, i) => (
          <TrendingCard key={i} trending={e} index={i} />
        ))}
      </div>
    </section>
  );
}

export default Trending;
