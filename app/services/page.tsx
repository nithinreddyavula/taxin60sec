import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { services } from "../../sections/Services";

const extraServices = [
  "GST Registration & Filing",
  "Income Tax Filing",
  "TDS Compliance",
  "Startup Registration",
  "Virtual CFO",
  "ROC Compliance",
  "Audit & Assurance",
  "Business Advisory",
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

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {services.map((service) => {

              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="card-dark p-6"
                >

                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/15 bg-blue-500/10">

                    <Icon
                      className="text-blue-400"
                      size={26}
                    />

                  </div>

                  <h3 className="text-2xl font-bold tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-secondary leading-7">
                    {service.desc}
                  </p>

                  <a className="btn-primary mt-5 w-full" target="_blank" rel="noreferrer" href={`https://wa.me/917013734079?text=${encodeURIComponent(`Hello Tax60, I would like help with ${service.title}. Service code: ${service.code}`)}>`}>
                    Continue on WhatsApp
                  </a>

                </div>
              );

            })}

          </div>

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
