import Link from "next/link";
import Button from "../ui/OrignalButton";
import Shoe from "../ui/Shoe";

function Hero() {
  return (
    <section className="bg-[url('/hero-bg.png')] min-h-[calc(100vh_-_142px)] lg:min-h-[calc(100dvh_-_80px)] w-screen flex flex-col lg:flex-row items-center py-20 px-5 lg:py-32 lg:px-10 bg-no-repeat bg-cover bg-center  relative">
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
        <Link href={"#"}>
          <Button variant="dark">Find Your Shoe</Button>
        </Link>
      </div>
      <Shoe />
    </section>
  );
}

export default Hero;
