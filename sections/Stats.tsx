"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "500+",
    title: "Happy Clients",
  },
  {
    number: "10+",
    title: "Years Experience",
  },
  {
    number: "98%",
    title: "Client Satisfaction",
  },
  {
    number: "24/7",
    title: "Support",
  },
];

export default function Stats() {

  return (

    <section className="relative py-28 bg-[#020817] overflow-hidden">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >

          <p className="uppercase tracking-[0.3em] text-sm text-blue-400 font-semibold">

            Our Impact

          </p>

          <h2 className="mt-5 text-5xl font-bold text-white leading-tight">

            Trusted By
            <span className="text-blue-500">
              {" "}Businesses Across India
            </span>

          </h2>

          <p className="mt-6 text-lg text-gray-300 leading-8">

            Helping startups, professionals, creators,
            and businesses manage finance,
            taxation, and compliance seamlessly.

          </p>

        </motion.div>

        {/* GRID */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {
            stats.map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-10 text-center hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              >

                <h3 className="text-6xl font-bold text-blue-500">

                  {item.number}

                </h3>

                <p className="mt-5 text-gray-300 text-lg">

                  {item.title}

                </p>

              </motion.div>

            ))
          }

        </div>

      </div>

    </section>

  );
}