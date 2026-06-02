import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/sections/Contact";

export default function ContactPage() {

  return (

    <main className="bg-[#020817] min-h-screen text-white">

      <Navbar />

      <div className="pt-24">

        <Contact />

      </div>

      <Footer />

    </main>

  );

}