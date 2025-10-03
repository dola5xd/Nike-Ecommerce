"use client";

import Link from "next/link";
import Button from "../ui/OrignalButton";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

function DiscoverMore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shoeRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const ButtonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (
      !containerRef.current ||
      !pathRef.current ||
      !shoeRef.current ||
      !headingRef.current ||
      !paragraphRef.current ||
      !labelRef.current ||
      !ButtonRef.current
    )
      return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 1024px)", () => {
      const swooshTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        },
      });

      swooshTl
        .fromTo(
          shoeRef.current,
          { y: "-80vh", rotate: -15, scale: 0.6, opacity: 0 },
          {
            keyframes: [
              { opacity: 0, duration: 0 },
              { opacity: 1, duration: 0.8, ease: "power2.inOut" },
              { y: 0, rotate: 0, scale: 1, ease: "power1.out" },
            ],
          }
        )
        .from(
          [
            labelRef.current,
            headingRef.current,
            paragraphRef.current,
            ButtonRef.current,
          ],
          {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.6,
            ease: "power2.out",
          }
        );
    });

    mm.add("(min-width: 1024px)", () => {
      const swooshTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        },
      });

      swooshTl
        .fromTo(
          pathRef.current,
          { drawSVG: "0%", opacity: 0 },
          { drawSVG: "100%", opacity: 1, duration: 1 }
        )
        .addLabel("reveal", "-=0.2")
        .to(pathRef.current, {
          fillOpacity: 1,
          duration: 1,
          ease: "elastic.out(0.5,0.5)",
        })
        .fromTo(
          shoeRef.current,
          { y: "-100vh", rotate: -20, scale: 0.5, opacity: 0 },
          {
            keyframes: [
              { opacity: 0, duration: 0 },
              { opacity: 1, duration: 0.8, ease: "power2.inOut" },
              { y: 0, rotate: 0, scale: 0.8, ease: "power1.out" },
            ],
          },
          "reveal"
        )
        .from([labelRef.current, headingRef.current, paragraphRef.current], {
          opacity: 0,
          y: 40,
          stagger: 0.2,
          duration: 0.7,
          ease: "power2.out",
        })
        .fromTo(
          ButtonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="discover-more"
      aria-labelledby="discover-heading"
      className="relative flex flex-col lg:flex-row items-center w-full px-5 py-16 lg:px-0 lg:pl-5 lg:py-20 xl:py-0 lg:min-h-[80vh] xl:min-h-screen overflow-hidden bg-gradient-to-b md:bg-gradient-to-br via-white to-90% to-[#FF8342] xl:bg-none"
    >
      <div className="flex flex-col items-start xl:w-1/2 gap-y-6">
        <span
          ref={labelRef}
          className="text-caption lg:text-lead text-red block"
          id="discover-label"
        >
          Bold & Sporty
        </span>
        <h2
          ref={headingRef}
          id="discover-heading"
          className="max-w-xl lg:max-w-lg text-heading sm:text-heading-2 lg:text-heading-1"
        >
          Nike React Presto by you
        </h2>
        <p
          ref={paragraphRef}
          id="discover-desc"
          className="max-w-xl text-caption lg:text-lead text-dark-700"
        >
          Take advantage of brand new, proprietary cushioning technology with a
          fresh pair of Nike React shoes.
        </p>
        <Link href="/products" aria-label="Shop Nike React Presto products">
          <Button
            ref={ButtonRef}
            variant="dark"
            size="md"
            aria-describedby="discover-desc"
          >
            Shop Now
          </Button>
        </Link>
      </div>
      <div className="relative flex items-center justify-center w-full h-64 overflow-hidden xl:w-2/3 sm:h-80 lg:h-screen">
        <div
          aria-hidden="true"
          className="absolute inset-0 items-center justify-center hidden lg:flex -z-20"
        >
          <svg
            className="w-full max-w-[480px] sm:max-w-[600px] lg:max-w-[653px] h-full lg:scale-125"
            viewBox="0 0 653 622"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={pathRef}
              d="M0 0 H212 V1135.86 H0 Z"
              transform="translate(489.94 -247) rotate(25.5526)"
              stroke="url(#paint0_linear_44002_2053)"
              strokeWidth="2"
              className="opacity-0"
              fill="url(#paint0_linear_44002_2053)"
              fillOpacity="0"
            />
            <defs>
              <linearGradient
                id="paint0_linear_44002_2053"
                x1="106"
                y1="0"
                x2="106"
                y2="1135.86"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFBE87" />
                <stop offset="1" stopColor="#FF8342" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <Image
          ref={shoeRef}
          src="/feature.webp"
          alt="Nike Air Jordan shoe product preview"
          fill
          fetchPriority="high"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 100vw"
          className="object-contain object-bottom select-none lg:object-center drop-shadow-xl lg:scale-80"
        />
      </div>
    </section>
  );
}

export default DiscoverMore;
