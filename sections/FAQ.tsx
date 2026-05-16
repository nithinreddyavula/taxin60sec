"use client";

import { motion } from "framer-motion";

export default function FAQ() {

  const faqs = [
    {
      question: "How quickly can I book a consultation?",
      answer:
        "You can book an appointment instantly through our website or WhatsApp.",
    },
    {
      question: "Do you provide GST filing services?",
      answer:
        "Yes, we provide complete GST registration, filing, and compliance support.",
    },
    {
      question: "Can startups get compliance assistance?",
      answer:
        "Absolutely. We help startups with registration, taxation, and ROC compliance.",
    },
    {
      question: "Do you offer online consultation?",
      answer:
        "Yes, we provide both online and offline consultation services.",
    },
  ];

  return (
    <section className="py-32 bg-white">

      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >

          <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4">
            FAQ
          </p>

          <h2 className="text-5xl font-bold mb-16">
            Frequently Asked Questions
          </h2>

        </motion.div>

        <div className="space-y-6">

          {faqs.map((faq, index) => (

            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-[25px] p-8 hover:shadow-lg transition"
            >

              <h3 className="text-2xl font-semibold">
                {faq.question}
              </h3>

              <p className="text-gray-600 mt-4 leading-relaxed">
                {faq.answer}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}