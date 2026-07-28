import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";

import WhatsAppButton from "@/components/WhatsAppButton";
import QueryProvider from "@/components/QueryProvider";
import AppProviders from "@/components/AppProviders";
import ReferralCapture from "@/components/ReferralCapture";

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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">

        <QueryProvider><AppProviders>{children}</AppProviders></QueryProvider>

        <ReferralCapture />

        <WhatsAppButton />

        <Toaster
          richColors
          position="top-right"
        />

      </body>
    </html>
  );
}