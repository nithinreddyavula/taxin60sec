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
  {
    question: "How do I get started?",
    answer:
      "Simply book a consultation through the website or contact us on WhatsApp.",
  },
];

export default function FAQ() {

  const [active, setActive] = useState<number | null>(0);

  return (

    <section className="relative py-32 bg-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-100 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-indigo-100 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* TOP */}
        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-sm text-blue-600 font-semibold">

            FAQs

          </p>

          <h2 className="mt-5 text-5xl font-bold text-gray-900 leading-tight">

            Frequently Asked
            <span className="text-blue-600">
              {" "}Questions
            </span>

          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8 max-w-2xl mx-auto">

            Everything you need to know about our
            services, support, and consultation process.

          </p>

        </div>

        {/* FAQ LIST */}
        <div className="mt-20 space-y-6">

          {
            faqs.map((faq, index) => (

              <div
                key={index}
                className="bg-white border border-gray-200 rounded-[24px] overflow-hidden shadow-sm"
              >

                {/* QUESTION */}
                <button
                  onClick={() =>
                    setActive(active === index ? null : index)
                  }
                  className="w-full flex items-center justify-between px-8 py-6 text-left"
                >

                  <span className="text-xl font-semibold text-gray-900">

                    {faq.question}

                  </span>

                  <ChevronDown
                    size={24}
                    className={`text-blue-600 transition-transform duration-300 ${
                      active === index
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {/* ANSWER */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    active === index
                      ? "max-h-[300px] pb-8 px-8"
                      : "max-h-0"
                  }`}
                >

                  <p className="text-gray-600 leading-8">

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