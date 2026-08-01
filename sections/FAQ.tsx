"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How fast can you complete GST filing?",
    a: "Most GST filings are completed within 24 hours after receiving documents.",
  },
  {
    q: "Do you support startups?",
    a: "Yes. We help with company registration, compliance, accounting and fundraising support.",
  },
  {
    q: "Can I contact directly on WhatsApp?",
    a: "Absolutely. Our team is available for quick support on WhatsApp.",
  },
  {
    q: "Do you provide Virtual CFO services?",
    a: "Yes. We help businesses manage reporting, budgeting and strategic financial planning.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-space">
      <div className="container-main">
        <div className="mx-auto max-w-3xl">
          <div className="section-header">
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title mt-3">Frequently Asked Questions</h2>
            <p className="section-copy mt-3">Everything you need to know.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={faq.q} className="card-dark overflow-hidden">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-white">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-emerald-400 transition ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="border-t border-white/8 px-5 py-4 text-sm leading-6 text-secondary">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}