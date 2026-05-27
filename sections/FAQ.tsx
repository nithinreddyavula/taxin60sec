"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services does Tax60Sec provide?",
    answer:
      "We provide GST filing, income tax filing, startup registration, virtual CFO services, audit support, compliance management, and financial advisory solutions.",
  },
  {
    question: "How quickly can I get support?",
    answer:
      "Our team usually responds within a few hours through WhatsApp, email, or consultation booking.",
  },
  {
    question: "Do you work with startups and creators?",
    answer:
      "Yes. We work with startups, freelancers, YouTubers, e-commerce businesses, and growing companies.",
  },
  {
    question: "Can I consult online?",
    answer:
      "Absolutely. We provide complete online consultation and support across India.",
  },
];

export default function FAQ() {

  const [active, setActive] = useState<number | null>(0);

  return (

    <section className="relative py-32 bg-[#020817] overflow-hidden">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* TOP */}
        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-sm text-blue-400 font-semibold">

            FAQs

          </p>

          <h2 className="mt-5 text-5xl font-bold text-white leading-tight">

            Frequently Asked
            <span className="text-blue-500">
              {" "}Questions
            </span>

          </h2>

          <p className="mt-6 text-lg text-gray-300 leading-8 max-w-2xl mx-auto">

            Everything you need to know
            about our services and support.

          </p>

        </div>

        {/* FAQS */}
        <div className="mt-20 space-y-6">

          {
            faqs.map((faq, index) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[28px] overflow-hidden"
              >

                <button
                  onClick={() =>
                    setActive(
                      active === index ? null : index
                    )
                  }
                  className="w-full flex items-center justify-between px-8 py-7 text-left"
                >

                  <span className="text-xl font-semibold text-white">

                    {faq.question}

                  </span>

                  <ChevronDown
                    size={24}
                    className={`text-blue-400 transition-transform duration-300 ${
                      active === index
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    active === index
                      ? "max-h-[300px] pb-8 px-8"
                      : "max-h-0"
                  }`}
                >

                  <p className="text-gray-300 leading-8">

                    {faq.answer}

                  </p>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </section>

  );
}