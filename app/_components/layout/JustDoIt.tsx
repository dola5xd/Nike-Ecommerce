"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import MagneticButton from "../ui/MagnetButton";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

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

    // === Play video on enter ===
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      onEnter: () => videoRef.current?.play(),
      onLeaveBack: () => videoRef.current?.pause(),
    });

    // === Smooth looping video ===
    const handleEnded = () => {
      // Fade out video + fade bg
      gsap.to(videoRef.current, { opacity: 0, duration: 1 });
      gsap.to(containerRef, { backgroundColor: "black", duration: 1 });

      // Restart video after fade-out
      gsap.delayedCall(1, () => {
        videoRef.current!.currentTime = 0;
        videoRef.current!.play();

        // Fade back in video + reset bg
        gsap.to(videoRef.current, { opacity: 1, duration: 1 });
        gsap.to(containerRef, { backgroundColor: "transparent", duration: 1 });
      });
    };
    videoRef.current.addEventListener("ended", handleEnded);

    // === Main container animation (padding + borderRadius) ===
    const containerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom bottom",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    });

    containerTl
      .fromTo(
        sectionRef.current,
        { padding: 0 },
        { padding: "40px", ease: "power2.inOut" },
        0
      )
      .fromTo(
        containerRef.current,
        { borderRadius: 0 },
        { borderRadius: "24px", ease: "power2.inOut" },
        0
      );

    // === Swoosh animation (draw + fill) ===
    const swooshTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    });

    swooshTl
      .fromTo(
        pathRef.current,
        { drawSVG: "0% 0%" },
        { drawSVG: "0% 100%", duration: 2, ease: "power2.inOut" }
      )
      .to(pathRef.current, {
        fill: "#fff",
        duration: 1,
        ease: "power2.inOut",
      });

    // === Split text animation ===
    const split = new SplitText(textRef.current, { type: "words" });

    gsap.fromTo(
      split.words,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      }
    );

    // === CTA animation ===
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
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="w-screen p-10 h-dvh">
      <div
        ref={containerRef}
        className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden text-light-100 rounded-3xl gap-y-10 bg-dark-900"
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          src="/video/just-do-it.mp4"
          className="absolute inset-0 object-cover object-center w-full h-full rounded-3xl"
          muted
          autoPlay
          playsInline
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-3xl" />
        <svg
          width={250}
          height={80}
          viewBox={`0 0 82 31`}
          fill="none"
          className="z-10"
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
          className="text-heading-1 leading-[3.5rem] uppercase text-center pointer-events-none futura"
        >
          JUST DO IT.
        </h3>
        <MagneticButton
          ref={ctaRef}
          variant="light"
          size="lg"
          className="uppercase"
        >
          Shop Now
        </MagneticButton>
      </div>
    </section>
  );
}

export default JustDoIt;
