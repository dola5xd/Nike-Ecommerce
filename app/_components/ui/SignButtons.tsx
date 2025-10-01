"use client";

import { signIn } from "next-auth/react";
import clsx from "clsx";
import { FiChrome } from "react-icons/fi";

const baseClass =
  "py-3 px-3 lg:px-6 lg:py-3.5 flex items-center justify-center font-medium duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 gap-x-2 outline-1 w-full rounded-md text-body-medium hover:scale-105";

function SignButtons({ variant = "light" }: { variant?: "dark" | "light" }) {
  const classColors =
    variant === "light"
      ? "outline-light-300 bg-light-100"
      : "outline-dark-700/50 bg-dark-900";

  return (
    <>
      {/* Google login */}
      <button
        type="button"
        onClick={() => signIn("google")}
        className={clsx(baseClass, classColors)}
      >
        <FiChrome size={20} />
        Continue with Google
      </button>
    </>
  );
}

export default SignButtons;
