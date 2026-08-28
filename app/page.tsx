import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrustBadges from "@/components/TrustBadges";
import CtaBanner from "@/components/CtaBanner";

import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import ProductShowcase from "@/sections/ProductShowcase";
import ResultsAndServices from "@/sections/ResultsAndServices";
import Testimonials from "@/sections/Testimonials";
import Pricing from "@/sections/Pricing";
import FAQ from "@/sections/FAQ";
import FreeTools from "@/sections/FreeTools";
import DeadlinesWidget from "@/sections/DeadlinesWidget";

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "TaxIn60Sec", url: "https://tax60sec.com" },
      { "@type": "WebSite", name: "TaxIn60Sec", url: "https://tax60sec.com" },
    ],
  };
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <ProductShowcase />
        <ResultsAndServices />
        <Pricing />
        <FAQ />
        <CtaBanner />
      </main>

      <Footer />

      <WhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
