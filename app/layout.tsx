import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TaxIn60Sec",
    template: "%s | TaxIn60Sec",
  },

  description:
    "Professional taxation, GST filing, audit, compliance, and startup advisory services.",

  keywords: [
    "CA Firm",
    "GST Filing",
    "Income Tax",
    "Tax Consultant",
    "Audit Services",
    "Startup Registration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        {children}

        <WhatsAppButton />

        <Toaster
          richColors
          position="top-right"
        />

      </body>
    </html>
  );
}