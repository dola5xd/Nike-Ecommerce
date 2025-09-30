"use client";

import Link from "next/link";
import { Button } from "@/_components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center text-white bg-black">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="mb-6 text-xl">Page Not Found</p>
      <Link href="/">
        <Button className="px-6 py-3 font-bold text-black transition bg-white rounded-xl hover:bg-gray-200">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
