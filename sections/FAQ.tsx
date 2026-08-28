"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How does the platform actually work?",
    a: "Unlike traditional firms, you don't start by guessing which service to buy. You begin with a simple health check. Based on your answers, we provide a clear next step. If you need a service, you move into a private case workspace where you can upload documents securely and track your filing's progress.",
  },
  {
    q: "Is my financial data secure?",
    a: "Yes. Tax60 uses bank-grade encryption to protect your data. Your documents are stored securely in a private vault accessible only to you and your assigned CA.",
  },
  {
    q: "How long does a typical filing take?",
    a: "Most individual filings are completed within 24-48 hours once all required documents are uploaded. Business and complex NRI cases take longer, but you will always see an estimated timeline in your dashboard.",
  },
  {
    q: "What happens after I pay for a service?",
    a: "A private case workspace is created immediately. You'll be given a checklist of documents to upload. Once uploaded, a verified Chartered Accountant reviews your file, prepares the draft, and requests your approval before final submission.",
  },
  {
    q: "Can I just talk to a CA directly?",
    a: "Yes. While the platform automates data collection and updates, every case is managed by a qualified professional. You can send messages directly to your assigned CA within your case workspace.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6">
              <span className="text-xs font-semibold tracking-wide text-slate-300 uppercase">SUPPORT</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
              Frequently asked questions
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Everything you need to know about how Tax60 manages your compliance securely and efficiently.
            </p>
            <div className="card-dark p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <HelpCircle className="text-[#E5D5C5]" size={20} />
                <h3 className="font-bold text-white">Still have questions?</h3>
              </div>
              <p className="text-sm text-slate-400 mb-4">Our support team is ready to help you with your specific case.</p>
              <a href="mailto:support@tax60sec.com" className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                Contact support →
              </a>
            </div>
          </div>

          <div className="lg:w-2/3 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={faq.q} className="card-dark overflow-hidden transition-all duration-300 hover:border-white/20">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-bold text-white">{faq.q}</span>
                    <div className={`flex items-center justify-center h-8 w-8 rounded-full bg-white/5 border border-white/10 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-white/10' : ''}`}>
                      <ChevronDown size={18} className={isOpen ? "text-[#E5D5C5]" : "text-slate-400"} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-base leading-relaxed text-slate-400">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}