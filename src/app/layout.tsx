import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DealFinder AI | AI-Powered Property Deal Finder & Analysis",
  description: "Find, analyze, and close real estate deals with AI-powered scoring, automated comps, rehab estimates, and interactive maps. Built for serious investors.",
  keywords: ["real estate", "investment", "AI", "deal analysis", "property", "rental", "cash flow"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
