import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/sections/Contact";
import BusinessIdentity from "@/components/BusinessIdentity";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Contact />
      <section className="pb-12"><div className="container-main max-w-3xl"><BusinessIdentity /></div></section>
      <Footer />
    </main>
  );
}
