import Image from "next/image";
import {
  CheckCircle2,
} from "lucide-react";

const points = [
  "Expert CA & Ex-Big4 Team",
  "Technology-Driven Processes",
  "On-Time Compliance Every Time",
  "Transparent Pricing",
  "Personalized Business Support",
];

export default function WhyChooseUs() {
  return (
    <section className="py-20">

      <div className="container-main">

        <div className="card-dark overflow-hidden">

          <div className="grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-12">

            {/* LEFT */}
            <div>

              <h2 className="text-4xl font-bold mb-6">
                Why Choose Tax60Sec?
              </h2>

              <p className="text-secondary text-lg leading-8 mb-8">
                We combine expert knowledge with technology
                to deliver faster, smarter and hassle-free
                compliance for your business.
              </p>

              <div className="space-y-5">

                {points.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4"
                  >

                    <CheckCircle2
                      className="text-blue-500"
                      size={24}
                    />

                    <span className="text-lg">
                      {point}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            {/* RIGHT */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10">

              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop"
                alt="Finance"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}