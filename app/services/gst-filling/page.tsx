import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GST Filing",
};

const gstServices = [
  "GST Registration",
  "Monthly & Quarterly Filing",
  "GST Notice Handling",
  "Input Tax Credit Assistance",
  "GST Compliance Support",
];

export default function GSTFilingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="page-hero">
        <div className="container-main">
          <div className="max-w-3xl">
            <p className="eyebrow">GST Services</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              GST Filing & Compliance
            </h1>
            <p className="section-copy mt-4">
              We provide complete GST registration, filing, compliance, return
              filing, and advisory services for businesses and startups across
              India.
            </p>
          </div>

          <div className="card-dark mt-8 max-w-3xl p-5 md:p-6">
            <h2 className="text-2xl font-bold">Our GST Services Include</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {gstServices.map((service) => (
                <li
                  key={service}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm font-semibold text-slate-200"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <a href={`https://wa.me/917013734079?text=${encodeURIComponent("Hello Tax60, I would like help with GST Filing. Service code: GST_FILING")}`} target="_blank" rel="noreferrer" className="btn-primary mt-6">
            Continue on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}