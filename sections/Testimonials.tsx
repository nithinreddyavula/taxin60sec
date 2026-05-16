"use client";

import { motion } from "framer-motion";

export default function Testimonials() {

  const testimonials = [
    {
      name: "Rahul Sharma",
      text: "Professional GST support and very responsive service.",
    },
    {
      name: "Ananya Reddy",
      text: "Helped us with startup registration smoothly.",
    },
    {
      name: "Vikram Patel",
      text: "Reliable tax consultation and excellent guidance.",
    },
  ];

  return (
    <section className="py-32 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >

          <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold mb-16">
            What Our Clients Say
          </h2>

        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((testimonial, index) => (

            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[30px] shadow hover:shadow-xl transition"
            >

              <p className="text-gray-700 leading-relaxed text-lg">
                "{testimonial.text}"
              </p>

              <h3 className="text-xl font-semibold mt-8">
                {testimonial.name}
              </h3>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}