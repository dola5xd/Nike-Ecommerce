"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import MagneticButton from "../ui/MagnetButton";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText);

function JustDoIt() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    if (
      !sectionRef.current ||
      !containerRef.current ||
      !textRef.current ||
      !pathRef.current ||
      !videoRef.current
    )
      return;

    // ✅ gsap.matchMedia context
    const mm = gsap.matchMedia();

    // === Video playback control ===
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      onEnter: () => videoRef.current?.play(),
      onLeaveBack: () => videoRef.current?.pause(),
    });

    // === Smooth looping video ===
    const handleEnded = () => {
      gsap.to(videoRef.current, { opacity: 0, duration: 1 });
      gsap.to(containerRef.current, { backgroundColor: "black", duration: 1 });

      gsap.delayedCall(1, () => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play();

        gsap.to(videoRef.current, { opacity: 1, duration: 1 });
        gsap.to(containerRef.current, {
          backgroundColor: "transparent",
          duration: 1,
        });
      });
    };
    videoRef.current.addEventListener("ended", handleEnded);

    // ✅ Animations per screen size
    mm.add("(max-width: 640px)", () => {
      // Create timeline with pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=125%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate in
      tl.fromTo(sectionRef.current, { padding: 0 }, { padding: "20px" })
        .fromTo(
          containerRef.current,
          { borderRadius: 0 },
          { borderRadius: "4px" }
        )
        // ✅ Animate back out when scroll ends
        .to(sectionRef.current, { padding: 0 })
        .to(containerRef.current, { borderRadius: 0 });

      // Path animation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
          },
        })
        .fromTo(
          pathRef.current,
          { drawSVG: "0% 0%" },
          { drawSVG: "0% 100%", duration: 2, ease: "power2.inOut" }
        )
        .to(pathRef.current, { fill: "#fff", duration: 1 });

      const split = new SplitText(textRef.current!, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top center" },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 25%",
          },
        }
      );
    });

    mm.add("(min-width: 641px)", () => {
      // Larger padding, stronger animations
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom bottom",
            scrub: true,
          },
        })
        .fromTo(sectionRef.current, { padding: 0 }, { padding: "40px" })
        .fromTo(
          containerRef.current,
          { borderRadius: 0 },
          { borderRadius: "24px" }
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
          },
        })
        .fromTo(
          pathRef.current,
          { drawSVG: "0% 0%" },
          { drawSVG: "0% 100%", duration: 2, ease: "power2.inOut" }
        )
        .to(pathRef.current, { fill: "#fff", duration: 1 });

      const split = new SplitText(textRef.current!, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top center" },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 25%",
          },
        }
      );
    });

    // ✅ Cleanup on unmount
    return () => {
      videoRef.current?.removeEventListener("ended", handleEnded);
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-screen h-screen md:p-10">
      <div
        ref={containerRef}
        className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden rounded md:justify-center text-light-100 lg:rounded-3xl gap-y-3 sm:gap-y-5 md:gap-y-10 bg-dark-900"
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          src="/video/just-do-it.webm"
          className="absolute inset-0 object-cover object-center w-full h-full rounded lg:rounded-3xl"
          muted
          autoPlay
          playsInline
        />
        {/* Overlay */}
        <div className="absolute inset-0 rounded bg-black/50 lg:rounded-3xl" />

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

        <h3
          ref={textRef}
          className="text-heading sm:text-heading-2 md:text-heading-1 leading-[3.5rem] uppercase text-center pointer-events-none futura"
        >
          JUST DO IT.
        </h3>

        <MagneticButton
          ref={ctaRef}
          variant="light"
          size="lg"
          className="z-20 uppercase"
        >
          Shop Now
        </MagneticButton>
      </div>
    </section>
  );
}

export default JustDoIt;
