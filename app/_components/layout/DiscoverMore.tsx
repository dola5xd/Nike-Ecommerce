"use client";

import Link from "next/link";
import Button from "../ui/Button";
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

    const swooshTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        toggleActions: "play none pause reverse",
      },
    });

    // split texts
    const headingSplit = new SplitText(headingRef.current, {
      type: "words,chars",
    });
    const paraSplit = new SplitText(paragraphRef.current, { type: "words" });
    const labelSplit = new SplitText(labelRef.current, { type: "words" });

    swooshTl
      // line drawing
      .fromTo(
        pathRef.current,
        { drawSVG: "0%", opacity: 0 },
        {
          drawSVG: "100%",
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        }
      )
      // shoe drop + text start together
      .addLabel("reveal", "-=0.2")
      // fill
      .to(pathRef.current, {
        fillOpacity: 1,
        duration: 1,
        ease: "elastic.out(0.5, 0.5)",
      })

      .fromTo(
        shoeRef.current,
        { y: "-100dvh", rotate: -20, scale: 0, opacity: 0 },
        {
          keyframes: [
            { opacity: 0, ease: "none", duration: 0 },
            { opacity: 1, ease: "power2.inOut", duration: 0.8 },
            { y: 0, rotate: 0, scale: 1, ease: "power1.out" },
          ],
        },
        "reveal"
      )

      // label text
      .from(
        labelSplit.words,
        {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
        },
        "reveal"
      )

      // heading text
      .from(
        headingSplit.words,
        {
          opacity: 0,
          y: 50,
          stagger: 0.04,
          duration: 0.6,
          ease: "power3.out",
        },
        "reveal+=0.2"
      )

      // paragraph text
      .from(
        paraSplit.words,
        {
          opacity: 0,
          y: 20,
          stagger: 0.03,
          duration: 0.4,
          ease: "power2.out",
        },
        "reveal+=0.4"
      )
      .fromTo(
        ButtonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "reveal+=0.6"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex items-center w-screen px-10 py-0 min-h-dvh "
    >
      <div className="flex flex-col items-start w-1/2 gap-y-7">
        <span ref={labelRef} className="text-lead text-red">
          Bold & Sporty
        </span>
        <h1 ref={headingRef} className="max-w-lg text-heading-1">
          Nike React Presto by you
        </h1>
        <p ref={paragraphRef} className="max-w-xl text-lead text-dark-700">
          Take advantage of brand new, proprietary cushioning technology with a
          fresh pair of Nike react shoes.
        </p>
        <Link href={"#"}>
          <Button ref={ButtonRef} variant="dark" size="md">
            Shop Now
          </Button>
        </Link>
      </div>

      <div className="relative w-1/2 aspect-[2/1] h-screen">
        <span className="absolute h-screen -translate-x-1/2 -z-20 left-1/2">
          <svg
            className="w-[653px] h-full"
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
        <Image
          ref={shoeRef}
          src="/feature.png"
          alt="Nike Air Jordan shoe"
          fill
          priority
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 100vw"
          className="object-contain object-center select-none -z-10 drop-shadow-xl"
        />
      </div>
    </section>
  );
}

export default DiscoverMore;
