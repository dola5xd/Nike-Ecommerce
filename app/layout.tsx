import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./_providers/Providers";
import Lenis from "./_providers/LenisProvider";

const futuraExtraBold = localFont({
  src: [
    {
      path: "./_fonts/Futura-Condensed-Extra-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-futura-extra-bold",
});

const HelveticaNow = localFont({
  src: [
    {
      path: "./_fonts/helvetica-now-text-regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_fonts/helvetica-now-text-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./_fonts/helvetica-now-text-bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Nike Shoes - Shoes Online Store",
    template: "%s | Nike E-commerce",
  },
  description:
    "Shop the latest Nike shoes, sneakers, and sportswear online. Discover limited editions, best sellers, and exclusive deals with fast delivery.",
  keywords: [
    "Nike shoes",
    "Nike sneakers",
    "Nike store",
    "sportswear",
    "buy Nike online",
    "Nike ecommerce",
  ],
  openGraph: {
    title: "Nike Shoes - Shoes Online Store",
    description:
      "Shop the latest Nike shoes and sneakers. Limited editions, exclusive deals, and worldwide shipping.",
    url: "https://nike-ecommerce-smoky.vercel.app/",
    siteName: "Nike E-commerce",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://nike-ecommerce-smoky.vercel.app/og_image.webp",
        width: 1200,
        height: 630,
        alt: "Nike Shoes Online Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nike Shoes - Shoes Online Store",
    description:
      "Shop the latest Nike shoes and sneakers. Limited editions, exclusive deals, and worldwide shipping.",
    images: ["https://nike-ecommerce-smoky.vercel.app/og_image.webp"],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://nike-ecommerce-smoky.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${futuraExtraBold.variable} antialiased overflow-x-hidden ${HelveticaNow.className}`}
      >
        <Lenis>
          <Providers>{children}</Providers>
        </Lenis>
      </body>
    </html>
  );
}
