import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DealFinder AI | AI-Powered Real Estate Investment Platform",
  description:
    "Find, analyze, and close real estate deals with AI-powered scoring, automated comps, rehab estimates, and interactive maps. Trusted by 500+ investors managing $2.3B in deal volume.",
  keywords: [
    "real estate",
    "investment",
    "AI",
    "deal analysis",
    "property",
    "rental",
    "cash flow",
    "cap rate",
  ],
  icons: {
    icon: "/icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
