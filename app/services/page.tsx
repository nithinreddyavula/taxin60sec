import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCards from "@/components/ServiceCards";

const extraServices = [
  "GST Registration & Filing",
  "Income Tax Filing",
  "TDS Compliance",
  "Startup Registration",
  "Virtual CFO",
  "ROC Compliance",
  "Audit & Assurance",
  "Business Advisory",
  "NRI Taxation & Advisory",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">

      <Navbar />

      <section className="pt-16 lg:pt-20 pb-14">

        <div className="container-main">

          <div className="max-w-3xl">

            <p className="text-blue-400 uppercase tracking-[0.3em] text-sm">
              Services
            </p>

            <h1 className="mt-3 text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Complete Finance & Tax Solutions
            </h1>

            <p className="mt-4 text-secondary text-lg leading-8">
              Professional consulting and compliance support
              for modern businesses.
            </p>

          </div>

          <ServiceCards />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {extraServices.map((service) => (

              <div
                key={service}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm font-semibold text-slate-200"
              >
                {service}
              </div>

            ))}

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}