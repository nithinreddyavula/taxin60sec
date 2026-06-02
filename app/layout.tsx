import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";

import WhatsAppButton from "@/components/WhatsAppButton";

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
