"use client";

import Link from "next/link";
import Button from "../ui/OrignalButton";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);

function DiscoverMore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shoeRef = useRef<HTMLImageElement>(null);

  // text refs
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

    // mobile/tablet
    mm.add("(max-width: 1024px)", () => {
      const swooshTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        },
      });

      const headingSplit = new SplitText(headingRef.current, {
        type: "words,chars",
      });
      const paraSplit = new SplitText(paragraphRef.current, { type: "words" });
      const labelSplit = new SplitText(labelRef.current, { type: "words" });

      swooshTl
        .fromTo(
          shoeRef.current,
          { y: "-80vh", rotate: -15, scale: 0.6, opacity: 0 },
          {
            keyframes: [
              { opacity: 0, ease: "none", duration: 0 },
              { opacity: 1, ease: "power2.inOut", duration: 0.8 },
              { y: 0, rotate: 0, scale: 1, ease: "power1.out" },
            ],
          }
        )
        .from(labelSplit.words, {
          opacity: 0,
          y: 15,
          stagger: 0.04,
          duration: 0.4,
          ease: "power3.out",
        })
        .from(headingSplit.words, {
          opacity: 0,
          y: 30,
          stagger: 0.03,
          duration: 0.5,
          ease: "power3.out",
        })
        .from(paraSplit.words, {
          opacity: 0,
          y: 15,
          stagger: 0.02,
          duration: 0.4,
          ease: "power2.out",
        })
        .fromTo(
          ButtonRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
    });

    // desktop
    mm.add("(min-width: 1024px)", () => {
      const swooshTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          markers: false,
          toggleActions: "play none none reverse",
        },
      });

      const headingSplit = new SplitText(headingRef.current, {
        type: "words,chars",
      });
      const paraSplit = new SplitText(paragraphRef.current, { type: "words" });
      const labelSplit = new SplitText(labelRef.current, { type: "words" });

      swooshTl
        .fromTo(
          pathRef.current,
          { drawSVG: "0%", opacity: 0 },
          { drawSVG: "100%", opacity: 1, duration: 1, ease: "power2.inOut" }
        )
        .addLabel("reveal", "-=0.2")
        .to(pathRef.current, {
          fillOpacity: 1,
          duration: 1,
          ease: "elastic.out(0.5, 0.5)",
        })
        .fromTo(
          shoeRef.current,
          { y: "-100vh", rotate: -20, scale: 0.8, opacity: 0 },
          {
            keyframes: [
              { opacity: 0, ease: "none", duration: 0 },
              { opacity: 1, ease: "power2.inOut", duration: 0.8 },
              { y: 0, rotate: 0, scale: 1, ease: "power1.out" },
            ],
          },
          "reveal"
        )
        .from(labelSplit.words, {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
        })
        .from(headingSplit.words, {
          opacity: 0,
          y: 40,
          stagger: 0.04,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(paraSplit.words, {
          opacity: 0,
          y: 20,
          stagger: 0.03,
          duration: 0.5,
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
      className="relative flex flex-col lg:flex-row items-center w-full px-5 py-16 lg:px-0 lg:pl-5 lg:py-20 xl:py-0 lg:min-h-[80vh] xl:min-h-screen overflow-hidden bg-gradient-to-b md:bg-gradient-to-br via-white to-90% to-[#FF8342] xl:bg-none"
    >
      {/* Left Content */}
      <div className="flex flex-col items-start xl:w-1/2 gap-y-6">
        <span ref={labelRef} className="text-caption lg:text-lead text-red">
          Bold & Sporty
        </span>
        <h1
          ref={headingRef}
          className="max-w-xl lg:max-w-lg text-heading sm:text-heading-2 lg:text-heading-1"
        >
          Nike React Presto by you
        </h1>
        <p
          ref={paragraphRef}
          className="max-w-xl text-caption lg:text-lead text-dark-700"
        >
          Take advantage of brand new, proprietary cushioning technology with a
          fresh pair of Nike react shoes.
        </p>
        <Link href={"#"}>
          <Button ref={ButtonRef} variant="dark" size="md">
            Shop Now
          </Button>
        </Link>
      </div>

      {/* Right Content */}
      <div className="relative flex items-center justify-center w-full h-64 overflow-hidden xl:w-2/3 sm:h-80 lg:h-screen">
        {/* SVG Background */}
        <span className="absolute inset-0 items-center justify-center hidden lg:flex -z-20">
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
        </span>

        {/* Shoe Image */}
        <Image
          ref={shoeRef}
          src="/feature.png"
          alt="Nike Air Jordan shoe"
          fill
          priority
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 100vw"
          className="object-contain object-bottom select-none lg:object-center drop-shadow-xl "
        />
      </div>
    </section>
  );
}

export default DiscoverMore;
