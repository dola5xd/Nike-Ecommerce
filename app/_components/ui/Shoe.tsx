"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Shoe() {
  const scrollWrapRef = useRef<HTMLDivElement | null>(null);
  const floatRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!scrollWrapRef.current || !floatRef.current) return;

    // Floating animation (always runs)
    gsap.to(floatRef.current, {
      yPercent: 5,
      rotation: 8,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const triggerEl =
      (document.querySelector("#matriels") as Element | null) ||
      scrollWrapRef.current;

    // ✅ Use gsap.matchMedia for responsive ScrollTriggers
    const mm = gsap.matchMedia();

    mm.add("(max-width: 640px)", () => {
      gsap.fromTo(
        scrollWrapRef.current,
        { y: "0", xPercent: 0, rotate: 0 },
        {
          y: "100vh",
          xPercent: 0,
          rotate: 360,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top 75%",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    mm.add("(min-width: 641px) and (max-width: 1024px)", () => {
      gsap.fromTo(
        scrollWrapRef.current,
        { y: 0, xPercent: 0, rotate: 0, scale: 0.75 },
        {
          y: "110vh",
          xPercent: 0,
          rotate: 360,
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
    });

    mm.add("(min-width: 1025px)", () => {
      gsap.fromTo(
        scrollWrapRef.current,
        { y: 0, xPercent: 0, rotate: 0, scale: 0.7 },
        {
          y: "120vh",
          xPercent: -50,
          rotate: 360,
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
    });

    gsap.set([scrollWrapRef.current, floatRef.current], {
      willChange: "transform",
    });

    ScrollTrigger.refresh();

    // 🧹 Clean up on unmount
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={scrollWrapRef}
      className="
        relative z-20 mx-auto pointer-events-none 
        w-[90%] sm:w-[80%] lg:max-w-[50%]
      "
    >
      <div ref={floatRef} className="relative w-full">
        <div className="relative w-full aspect-[402/233]">
          <Image
            src="/hero-shoe.png"
            alt="Nike Air Jordan shoe"
            fill
            priority
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 70vw"
            className="object-contain select-none drop-shadow-xl"
            onLoadingComplete={() => ScrollTrigger.refresh()}
          />
        </div>
      </div>
    </div>
  );
}

export default Shoe;
