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
    default: "TaxIn60Sec | A clearer start for Indian tax and compliance",
    template: "%s | TaxIn60Sec",
  },

  description:
    "Answer a few plain-language questions to understand your Indian tax or compliance next step, then manage documents and case progress in one place.",

  keywords: [
    "income tax filing India",
    "GST filing",
    "NRI tax filing",
    "tax calculator",
    "tax deadlines India",
  ],

  openGraph: {
    title: "TaxIn60Sec | A clearer start for Indian tax and compliance",
    description:
      "Start with your situation, see a clear next step, and keep tax work organised.",
    url: BASE_URL,
    siteName: "TaxIn60Sec",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaxIn60Sec — A clearer start for Indian tax and compliance",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TaxIn60Sec | A clearer start for Indian tax and compliance",
    description:
      "Start with your situation, see a clear next step, and keep tax work organised.",
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
