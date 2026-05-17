import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../sections/Hero";
import Services from "../sections/Services";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import WhyChooseUs from "@/sections/WhyChooseUs";
import Stats from "@/sections/Stats";
import MapSection from "@/sections/MapSection";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Stats />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <MapSection />
      <Footer />
    </main>
  );
}