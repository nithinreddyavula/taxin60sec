import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";

import WhatsAppButton from "@/components/WhatsAppButton";
import QueryProvider from "@/components/QueryProvider";
import AppProviders from "@/components/AppProviders";
import ReferralCapture from "@/components/ReferralCapture";
import Analytics from "@/components/Analytics";

const BASE_URL = "https://tax60sec.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "TaxIn60Sec | AI-Powered Tax Filing & CA Compliance in India",
    template: "%s | TaxIn60Sec",
  },

  description:
    "Professional taxation, GST filing, audit, compliance, and startup advisory services. AI-powered tax health check, backed by verified Chartered Accountants.",

  keywords: [
    "CA Firm",
    "GST Filing",
    "Income Tax",
    "Tax Consultant",
    "Audit Services",
    "Startup Registration",
  ],

  openGraph: {
    title: "TaxIn60Sec | AI-Powered Tax Filing & CA Compliance",
    description:
      "Know exactly what your taxes need in 60 seconds. AI-powered clarity, backed by verified Chartered Accountants.",
    url: BASE_URL,
    siteName: "TaxIn60Sec",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaxIn60Sec — AI-Powered Tax Filing & CA Compliance",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TaxIn60Sec | AI-Powered Tax Filing & CA Compliance",
    description:
      "Know exactly what your taxes need in 60 seconds. AI-powered clarity, backed by verified Chartered Accountants.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Analytics />

        <QueryProvider><AppProviders>{children}</AppProviders></QueryProvider>

        <ReferralCapture />

        <WhatsAppButton />

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}