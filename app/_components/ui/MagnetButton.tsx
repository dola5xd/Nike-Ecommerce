"use client";

import { ReactNode, forwardRef, RefObject } from "react";
import gsap from "gsap";
import Button, { ButtonProps } from "./OrignalButton";

type MagneticButtonProps = ButtonProps & {
  children: ReactNode;
  className?: string;
};

const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className = "", ...props }, ref) => {
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = (ref as RefObject<HTMLButtonElement>)?.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.5, // control magnetic strength
        y: y * 0.5,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      const btn = (ref as RefObject<HTMLButtonElement>)?.current;
      if (!btn) return;
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "elastic.out(1, 1)",
      });
    };

    return (
      <Button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
export default MagneticButton;
