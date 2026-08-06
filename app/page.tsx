import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrustBadges from "@/components/TrustBadges";
import CtaBanner from "@/components/CtaBanner";
import SocialProofBar from "@/components/SocialProofBar";

import Hero from "@/sections/Hero";
import DeadlinesWidget from "@/sections/DeadlinesWidget";
import Services from "@/sections/Services";
import WhyChooseUs from "@/sections/WhyChooseUs";
import HowItWorks from "@/sections/HowItWorks";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import Contact from "@/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <SocialProofBar />
        <TrustBadges />
        <HowItWorks />
        <Services />
        <Testimonials />
        <CtaBanner />

        <WhyChooseUs />
        <DeadlinesWidget />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      <WhatsAppButton />
    </>
  );
}