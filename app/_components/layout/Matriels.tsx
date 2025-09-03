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
  const quoteRef = useRef<HTMLHeadingElement | null>(null);

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
    if (quoteRef.current) {
      const split = new SplitText(quoteRef.current, {
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
      className="h-[100dvh] flex flex-col justify-start items-center py-28 px-10 w-full relative overflow-hidden futura"
    >
      {/* Text Content */}
      <div className="flex flex-col items-center gap-6 text-center max-w-3xl relative z-50">
        <Logo ref={logoRef} color="#000" height="90" width="200" />

        <h2
          ref={headingRef}
          className="text-5xl font-extrabold tracking-tight text-dark-900"
        >
          Nike Is The <span className="text-[#FF3C00]">Perfection</span>
        </h2>

        <p ref={paraRef} className="text-lg text-gray-600">
          Crafted with precision. Designed for performance. Worn for confidence.
        </p>
      </div>
    </section>
  );
}

export default Matriels;
