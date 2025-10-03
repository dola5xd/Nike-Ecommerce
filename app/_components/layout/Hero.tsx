import Link from "next/link";
import Button from "../ui/OrignalButton";
import Shoe from "../ui/Shoe";
import Image from "next/image";

function Hero() {
  return (
    <section className=" min-h-[calc(100vh_-_142px)] lg:min-h-[calc(100dvh_-_80px)] w-screen flex flex-col lg:flex-row items-center py-20 px-5 lg:py-32 lg:px-10 relative">
      <Image
        src="/hero-bg.webp"
        alt="Hero background"
        fill
        priority
        fetchPriority="high"
        className="absolute inset-0 object-cover -z-10"
      />

      <div className="flex flex-col items-start lg:w-2/3 gap-y-7">
        <span className="text-caption lg:text-lead text-red">
          Bold & Sporty
        </span>
        <h1 className="uppercase text-heading md:text-heading-1 futura">
          Style That Moves With You.
        </h1>
        <p className="max-w-xl text-caption md:text-lead text-dark-700">
          Not just style. Not just comfort. Footwear that effortlessly moves
          with your every step.
        </p>
        <Link href="/products">
          <Button variant="dark">Find Your Shoe</Button>
        </Link>
      </div>

      <Shoe />
    </section>
  );
}

export default Hero;
