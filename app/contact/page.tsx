import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/sections/Contact";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7faf9] text-slate-900">
      <Navbar />
      <Contact />
      <Footer />
    </main>
  );
}