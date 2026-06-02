import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Expert CA & Ex-Big4 Team",
  "Technology-Driven Processes",
  "On-Time Compliance Every Time",
  "Transparent Pricing",
  "Personalized Business Support",
];

export default function WhyChooseUs() {
  return (
    <section className="section-space">
      <div className="container-main">
        <div className="card-dark overflow-hidden">
          <div className="grid items-center gap-6 p-5 md:p-6 lg:grid-cols-[0.9fr_1fr]">
            <div>
              <p className="eyebrow">Why Choose Us</p>
              <h2 className="section-title mt-3">Why Choose Tax60Sec?</h2>
              <p className="section-copy mt-4">
                We combine expert knowledge with technology to deliver faster,
                smarter and hassle-free compliance for your business.
              </p>

              <div className="mt-6 grid gap-3">
                {points.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3"
                  >
                    <CheckCircle2
                      className="h-5 w-5 shrink-0 text-blue-400"
                    />
                    <span className="text-sm font-semibold text-slate-200">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop"
                alt="Finance consulting workspace"
                width={800}
                height={500}
                className="h-72 w-full object-cover lg:h-[420px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
