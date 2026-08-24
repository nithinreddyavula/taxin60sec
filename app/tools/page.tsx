import type { Metadata } from "next";
import Link from "next/link";
import TaxCalculator from "@/components/tools/TaxCalculator";

export const metadata: Metadata = {
  title: "Free Income Tax Calculator",
  description: "Estimate income tax under India's old and new tax regimes. Informational only; get a CA review for your filing.",
  alternates: { canonical: "/tools" },
  openGraph: { title: "Free Income Tax Calculator | TaxIn60Sec", description: "Estimate your income tax under India's old and new tax regimes." },
};

export default function ToolsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TaxIn60Sec Income Tax Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: "An informational Indian income tax estimator for old and new regimes.",
  };
  return <main className="min-h-screen"><section className="page-hero"><div className="container-main max-w-3xl">
    <p className="eyebrow">Free tools</p><h1 className="mt-3 text-4xl font-bold">Income Tax Calculator</h1>
    <p className="section-copy mt-3">Compare a simple estimate under the old and new tax regimes. It does not replace professional tax advice.</p>
    <TaxCalculator />
    <p className="mt-6 text-sm text-secondary">Need help filing or validating deductions? <Link href="/services" className="font-semibold text-emerald-400">Explore CA-assisted services</Link>.</p>
  </div></section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></main>;
}
