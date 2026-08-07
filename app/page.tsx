import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrustBadges from "@/components/TrustBadges";
import CtaBanner from "@/components/CtaBanner";

import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import ResultsAndServices from "@/sections/ResultsAndServices";
import Testimonials from "@/sections/Testimonials";
import FreeTools from "@/sections/FreeTools";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <TrustBadges />
        <ResultsAndServices />
        <Testimonials />
        <FreeTools />
        <CtaBanner />
      </main>

      <Footer />

      <WhatsAppButton />
    </>
  );
}