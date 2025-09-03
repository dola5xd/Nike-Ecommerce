"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Shoe() {
  const scrollWrapRef = useRef<HTMLDivElement | null>(null); // outer: scroll
  const floatRef = useRef<HTMLDivElement | null>(null); // inner: float

  useGSAP(
    () => {
      if (!scrollWrapRef.current || !floatRef.current) return;

      gsap.to(floatRef.current, {
        yPercent: 5, // ~5% gentle float
        rotation: 8,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const triggerEl =
        (document.querySelector("#matriels") as Element | null) ||
        scrollWrapRef.current;

      gsap.fromTo(
        scrollWrapRef.current,
        { y: 0, xPercent: 0, rotate: 0, scale: 0.7 },
        {
          y: "120vh",
          xPercent: -50,
          rotate: 360,
          scale: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.set([scrollWrapRef.current, floatRef.current], {
        willChange: "transform",
      });

      ScrollTrigger.refresh();
    },
    { dependencies: [] }
  );

  return (
    <div
      ref={scrollWrapRef}
      className="relative w-full max-w-1/2 mx-auto z-20 pointer-events-none scale-70"
    >
      <div ref={floatRef} className="relative w-full">
        <div className="relative w-full aspect-[402/233]">
          <Image
            src="/hero-shoe.png"
            alt="Nike Air Jordan shoe"
            fill
            priority
            quality={100}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
            className="object-contain drop-shadow-xl select-none "
            onLoadingComplete={() => ScrollTrigger.refresh()}
          />
        </div>
      </div>
    </div>
  );
}

export default Shoe;
