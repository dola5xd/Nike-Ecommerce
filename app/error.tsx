"use client";

import Link from "next/link";
import { Button } from "@/_components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center text-white bg-black">
      <h1 className="mb-4 text-5xl font-bold">Something went wrong</h1>
      <p className="mb-6 text-lg">Please try again or return to home.</p>

      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          className="px-6 py-3 font-bold text-black transition bg-white rounded-xl hover:bg-gray-200"
        >
          Try Again
        </Button>

        <Link href="/">
          <Button className="px-6 py-3 font-bold text-black transition bg-white rounded-xl hover:bg-gray-200">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
