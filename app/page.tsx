import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

import Hero from "@/sections/Hero";
import DeadlinesWidget from "@/sections/DeadlinesWidget";
import Services from "@/sections/Services";
import WhyChooseUs from "@/sections/WhyChooseUs";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import Contact from "@/sections/Contact";


export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>

        <Hero />

        <DeadlinesWidget />

        <Services />

        <WhyChooseUs />

        <Testimonials />

        <FAQ />

        <Contact />


      </main>

      <Footer />

      <WhatsAppButton />
    </>
  );
}