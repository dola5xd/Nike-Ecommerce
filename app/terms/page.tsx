import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Nike E-commerce",
  description:
    "Read the terms of service for using Nike E-commerce, including user responsibilities and policies.",
  keywords: "Nike, e-commerce, terms of service, policies",
  openGraph: {
    title: "Terms of Service | Nike E-commerce",
    description:
      "Read the terms of service for using Nike E-commerce, including user responsibilities and policies.",
    url: "https://nike-ecommerce-smoky.vercel.app/terms",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Nike E-commerce",
    description:
      "Read the terms of service for using Nike E-commerce, including user responsibilities and policies.",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-center max-w-2xl text-gray-700">
        Welcome to Nike E-commerce. By using our website, you agree to our terms
        and conditions. Please use our platform responsibly.
      </p>
    </main>
  );
}
