import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Nike E-commerce",
  description:
    "Learn how Nike E-commerce collects, uses, and protects your personal information.",
  keywords: "Nike, e-commerce, privacy policy, data protection",
  openGraph: {
    title: "Privacy Policy | Nike E-commerce",
    description:
      "Learn how Nike E-commerce collects, uses, and protects your personal information.",
    url: "https://nike-ecommerce-smoky.vercel.app/privacy",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Nike E-commerce",
    description:
      "Learn how Nike E-commerce collects, uses, and protects your personal information.",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-center max-w-2xl text-gray-700">
        We respect your privacy. Any information collected is used only to
        provide a better shopping experience and to manage your account
        securely.
      </p>
    </main>
  );
}
