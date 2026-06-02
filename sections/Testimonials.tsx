import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Mehta",
    role: "Founder, FinEdge",
    text: "Tax60Sec simplified our entire GST and compliance process. Highly reliable and very responsive team!",
  },
  {
    name: "Priya Sharma",
    role: "CEO, BizCraft",
    text: "Their Virtual CFO services helped us improve financial clarity and save significant taxes.",
  },
  {
    name: "Amit Verma",
    role: "Director, Verma Traders",
    text: "Professional, knowledgeable and always available on WhatsApp. Great experience working with them.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-space">
      <div className="container-main">
        <div className="section-header">
          <p className="eyebrow">Testimonials</p>
          <h2 className="section-title mt-3">What Our Clients Say</h2>
          <p className="section-copy mt-3">Trusted by businesses across India.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="card-dark p-5">
              <div className="mb-4 flex items-center gap-1 text-blue-300">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="text-sm leading-6 text-secondary">&quot;{item.text}&quot;</p>

              <div className="mt-5 border-t border-white/10 pt-4">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="mt-1 text-sm text-secondary">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
