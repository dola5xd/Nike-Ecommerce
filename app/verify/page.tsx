"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/_components/ui/button";
import { useSession } from "next-auth/react";
import TextSlider from "@/_components/ui/TextSlider";
import Logo from "@/_components/ui/Logo";

export default function VerifyPage() {
  const { data: session } = useSession();
  const email = session?.user.email;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (err) {
      const errorMes =
        err instanceof Error ? err.message : "Something went wrong.";
      setMessage(errorMes);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-start w-screen h-dvh">
      <section className="flex-col justify-between hidden w-1/2 h-full px-10 py-10 md:flex bg-dark-900 text-light-100">
        <Link
          href={"/"}
          className="flex items-center justify-center p-2 bg-white rounded-xl w-fit"
        >
          <Logo color="#000" height={40} width={40} />
        </Link>

        <div className="space-y-4">
          <h1 className="uppercase text-heading-2 futura">Just Do It.</h1>
          <TextSlider variant="light" />
        </div>

        <span className="text-footnote lg:text-caption text-dark-700">
          © {new Date().getFullYear()} Nike. All rights reserved.
        </span>
      </section>

      <section className="flex flex-col items-center justify-center w-full h-full px-10 text-center gap-y-4 py-7 md:w-1/2">
        <h1 className="uppercase text-heading-3 sm:text-heading xl:text-heading-2 md:text-heading futura">
          Verify your email
        </h1>

        <div className="space-y-6">
          <p className="text-footnote sm:text-body md:text-caption lg:text-body text-dark-700">
            We’ve sent you a verification link. Please check your inbox and
            confirm your email to continue.
          </p>

          <p className="text-footnote md:text-caption text-dark-500">
            Didn’t receive an email? Make sure to check your spam folder.
          </p>

          <div className="flex justify-center gap-2">
            <Button onClick={handleResend} disabled={loading}>
              {loading ? "Resending..." : "Resend Email"}
            </Button>
          </div>

          {message && (
            <p className="mt-2 text-caption md:text-footnote lg:text-caption text-dark-500">
              {message}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
