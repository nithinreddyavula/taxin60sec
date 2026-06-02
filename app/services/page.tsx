import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ServicesPage() {

  const services = [
    "GST Registration & Filing",
    "Income Tax Filing",
    "TDS Compliance",
    "Startup Registration",
    "Virtual CFO",
    "ROC Compliance",
    "Audit & Assurance",
    "Business Advisory",
  ];

  return (

    <main className="bg-[#020817] text-white min-h-screen">

      <Navbar />

      <section className="pt-40 pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <p className="text-blue-400 uppercase tracking-[0.3em] font-semibold">

            Services

          </p>

          <h1 className="mt-6 text-6xl font-bold">

            Complete Finance &
            <br />
            Tax Solutions

          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">

            {
              services.map((service, i) => (

                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-500/40 transition"
                >

                  <h3 className="text-2xl font-bold">

                    {service}

                  </h3>

                  <p className="mt-4 text-gray-400 leading-8">

                    Professional consulting and compliance support
                    for modern businesses.

                  </p>

                </div>

              ))
            }

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}