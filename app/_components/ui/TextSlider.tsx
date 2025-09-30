"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, useGSAP);

const texts = [
  "Join millions of athletes and fitness enthusiasts who trust Nike for their performance needs.",
  "Elevate your game with Nike’s latest innovations in sportswear and footwear.",
  "Unleash your potential — comfort, style, and performance in every step.",
];

export default function TextSlider({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [index, setIndex] = useState(0);

  useGSAP(
    () => {
      if (!textRef.current) return;

      let currentIndex = 0;

      const animateText = (text: string) => {
        // replace text
        textRef.current!.innerText = text;

        // split into characters
        const split = new SplitText(textRef.current, { type: "words" });

        // timeline for fade-in → hold → fade-out
        const tl = gsap.timeline({
          onComplete: () => {
            split.revert(); // cleanup spans
            currentIndex = (currentIndex + 1) % texts.length;
            setIndex(currentIndex); // ✅ update React state for dots
            animateText(texts[currentIndex]); // recursive loop
          },
        });

        tl.fromTo(
          split.words,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.6,
            ease: "power2.out",
          }
        )
          .to(split.words, { opacity: 1, duration: 2 }) // hold
          .to(split.words, {
            opacity: 0,
            y: -20,
            stagger: 0.02,
            duration: 0.5,
            ease: "power2.in",
          });
      };

      // start animation
      animateText(texts[currentIndex]);
    },
    { scope: textRef }
  );

  return (
    <>
      <p
        ref={textRef}
        className={`${
          variant === "dark" ? "text-dark-900" : "text-light-300"
        } text-caption max-w-md  lg:text-body min-h-[75px]`}
      />

      {/* dots */}
      <div className="flex gap-2">
        {texts.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === index
                ? variant === "light"
                  ? "bg-light-200 w-4"
                  : "bg-dark-900 w-4"
                : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </>
  );
}
