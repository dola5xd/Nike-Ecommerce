"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(DrawSVGPlugin, SplitText);

export default function NikeLoading() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    if (!containerRef.current || !pathRef.current || !textRef.current) return;

    const split = new SplitText(textRef.current, { type: "words" });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    // Path animation
    tl.fromTo(
      pathRef.current,
      { drawSVG: "0% 0%" },
      { drawSVG: "0% 100%", duration: 1.2, ease: "power2.inOut" }
    )
      .to(pathRef.current, { fill: "#fff", duration: 0.5 }, "-=0.2")

      // Text animation
      .fromTo(
        split.words,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      {/* Nike swoosh */}
      <svg
        viewBox="0 0 82 31"
        fill="none"
        className="z-10 w-[160px] h-[50px] sm:w-[200px] sm:h-[60px] md:w-[250px] md:h-[80px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M79.7143 0L21.418 25.1469C16.5644 27.2409 12.4814 28.2857 9.19105 28.2857C5.48886 28.2857 2.79193 26.9572 1.13569 24.3047C-1.01212 20.8822 -0.0732836 15.379 3.6112 9.56968C5.79885 6.17413 8.57993 3.05779 11.2901 0.0765583C10.6524 1.13035 5.02387 10.655 11.1794 15.1404C12.3973 16.041 14.1288 16.4824 16.2589 16.4824C17.9683 16.4824 19.9301 16.1986 22.0867 15.6267L79.7143 0Z"
          stroke="#fff"
          strokeWidth="2"
          fill="transparent"
        />
      </svg>

      {/* Nike tagline */}
      <h2
        ref={textRef}
        className="mt-6 font-bold tracking-wide text-center text-white uppercase text-heading sm:text-heading-2 md:text-heading-1 futura"
      >
        JUST DO IT.
      </h2>
    </div>
  );
}
