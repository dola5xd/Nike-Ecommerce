import Link from "next/link";
import Button from "../ui/Button";
import Shoe from "../ui/Shoe";

function Hero() {
  return (
    <section className="bg-[url('/hero-bg.png')] min-h-[calc(100dvh_-_80px)] w-screen flex items-center py-32 px-10 bg-no-repeat bg-cover bg-center  relative">
      <div className="flex flex-col items-start w-2/3 gap-y-7">
        <span className="text-lead text-red">Bold & Sporty</span>
        <h1 className="text-heading-1 futura">Style That Moves With You.</h1>
        <p className="max-w-xl text-lead text-dark-700">
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
