"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Logo from "../ui/Logo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function Matriels() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<SVGSVGElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
        scrub: true,
      },
    });

    // Logo animation
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.5, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Heading
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.3"
    );

    // Paragraph
    tl.fromTo(
      paraRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.5"
    );

    // Quote (split by line)
    if (headingRef.current) {
      const split = new SplitText(headingRef.current, {
        type: "words,lines",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
      });

      tl.from(
        split.lines,
        {
          y: 120,
          opacity: 0,
          rotationX: 90,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.15,
        },
        "-=0.3"
      );
    }
  }, []);

  return (
    <section
      id="matriels"
      ref={containerRef}
      className="h-[100dvh] flex flex-col justify-start items-center py-28 md:py-10 lg:py-28 px-10 w-full relative overflow-hidden"
    >
      {/* Text Content */}
      <div className="relative flex flex-col items-center max-w-3xl gap-6 text-center">
        <Logo
          ref={logoRef}
          color="#000"
          height="90"
          width="200"
          className="z-50 hidden md:block "
        />
        <Logo
          ref={logoRef}
          color="#000"
          height="45"
          width="100"
          className="z-50 md:hidden"
        />

        <h2
          ref={headingRef}
          className="z-50 tracking-tight uppercase md:max-w-lg text-heading-2 text-dark-900 futura"
        >
          Nike Is The <span className="text-[#FF3C00]">Perfection</span>
        </h2>

        <p ref={paraRef} className="z-0 text-gray-600 text-caption">
          Crafted with precision. Designed for performance. Worn for confidence.
        </p>
      </div>
    </section>
  );
}

export default Matriels;
