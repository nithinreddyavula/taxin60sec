"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rohan Mehta",
    role: "Business Owner",
    text: "I thought I needed GST registration. The Tax Health Check showed I didn't, saving me unnecessary costs.",
  },
  {
    name: "Priya Sharma",
    role: "Salaried Professional",
    text: "The AI identified deductions I had missed. My tax refund increased by ₹28,000. Very accurate and helpful!",
  },
  {
    name: "Amit Verma",
    role: "Freelancer",
    text: "Everything happened over WhatsApp. I barely spent 15 minutes. Super convenient!",
  },
  {
    name: "Neha Singh",
    role: "Startup Founder",
    text: "Company incorporation and ROC compliance handled end-to-end. One less thing to worry about.",
  },
  {
    name: "Karthik Reddy",
    role: "NRI Client",
    text: "Filing from abroad used to be a headache. Tax60Sec's NRI team made it completely painless.",
  },
  {
    name: "Sneha Iyer",
    role: "Consultant",
    text: "Got a tax notice and panicked — their team responded within hours and resolved it fast.",
  },
];

const PAGE_SIZE = 3;
const totalPages = Math.ceil(testimonials.length / PAGE_SIZE);

export default function Testimonials() {
  const [page, setPage] = useState(0);

  const visible = testimonials.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section className="section-space">
      <div className="container-main">
        <div className="section-header">
          <h2 className="section-title">What Our Clients Say</h2>
        </div>

        <div className="relative mt-8">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
            className="absolute -left-4 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#020817] text-slate-300 transition hover:bg-white/5 md:flex"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <div key={item.name} className="card-dark p-5">
                <div className="mb-4 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={14} fill="currentColor" />
                  ))}
                </div>

                <p className="text-sm leading-6 text-secondary">&quot;{item.text}&quot;</p>

                <div className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.name}</h4>
                    <p className="text-sm text-secondary">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => setPage((p) => (p + 1) % totalPages)}
            className="absolute -right-4 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#020817] text-slate-300 transition hover:bg-white/5 md:flex"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to page ${index + 1}`}
              onClick={() => setPage(index)}
              className={`h-2 rounded-full transition-all ${
                page === index ? "w-6 bg-emerald-400" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}