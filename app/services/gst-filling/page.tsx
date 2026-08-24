import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PriceBreakdown from "@/components/PriceBreakdown";
import { Clock, IndianRupee, Users } from "lucide-react";

export const metadata = {
  title: "GST Filing & Compliance Services",
  description: "CA-assisted GST registration, return filing and compliance support for Indian businesses.",
  alternates: { canonical: "/services/gst-filling" },
};

const bestFor = ["Freelancer", "Small Business", "E-commerce Seller"];

const gstServices = [
  "GST Registration",
  "Monthly & Quarterly Filing",
  "GST Notice Handling",
  "Input Tax Credit Assistance",
  "GST Compliance Support",
];

const GST_BASE_PRICE = 499;

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

            {/* Fix 4 — Best for / Time / Price at a glance, instead of a bare price. */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <span className="flex items-center gap-2 text-secondary">
                <Users size={15} className="text-emerald-400" />
                Best for{" "}
                <span className="font-semibold text-slate-200">{bestFor.join(", ")}</span>
              </span>
              <span className="flex items-center gap-2 text-secondary">
                <Clock size={15} className="text-emerald-400" />
                <span className="font-semibold text-slate-200">2 Days</span> turnaround
              </span>
              <span className="flex items-center gap-2 text-secondary">
                <IndianRupee size={15} className="text-emerald-400" />
                From <span className="font-semibold text-slate-200">₹{GST_BASE_PRICE} onwards</span>
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="card-dark max-w-3xl p-5 md:p-6">
              <h2 className="text-2xl font-bold">What&apos;s Included</h2>
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

            {/* Fix 5 — pricing transparency, itemized instead of a single number. */}
            <div>
              <h2 className="text-lg font-bold text-white">Price Breakdown</h2>
              <div className="mt-4">
                <PriceBreakdown label="GST Filing" basePrice={GST_BASE_PRICE} />
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/917013734079?text=${encodeURIComponent("Hello Tax60, I would like help with GST Filing. Service code: GST_FILING")}`}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-6"
          >
            Continue on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
