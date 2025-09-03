import React, { forwardRef } from "react";
import clsx from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
};

const baseStyles =
  "flex items-center justify-center rounded-full font-medium duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 gap-x-1 hover:scale-105 hover:gap-x-4 ";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  dark: "bg-dark-900 text-light-100",
  light: "bg-light-200 text-dark-900",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-body-medium",
  md: "px-6 py-3.5 text-body-medium",
  lg: "px-8 py-4 text-body-medium uppercase futura",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = "dark", size = "md", className = "", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
