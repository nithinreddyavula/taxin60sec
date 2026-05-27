"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Startup Founder",
    review:
      "Tax60Sec completely simplified our GST and compliance workflow. Their support is incredibly fast and professional.",
  },
  {
    name: "Priya Reddy",
    role: "Business Owner",
    review:
      "The team helped us save taxes and organize our finances better. Very responsive and knowledgeable.",
  },
  {
    name: "Kiran Patel",
    role: "E-Commerce Seller",
    review:
      "Excellent service quality. Their automation and reporting systems helped us scale operations smoothly.",
  },
];

export default function Testimonials() {

  return (

    <section className="relative py-32 bg-[#020817] overflow-hidden text-white">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-200px] left-[-150px] w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-200px] right-[-150px] w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >

          <p className="uppercase tracking-[0.3em] text-sm text-blue-400 font-semibold">

            Testimonials

          </p>

          <h2 className="mt-5 text-5xl font-bold leading-tight">

            Trusted By
            <span className="text-blue-500">
              {" "}Businesses & Startups
            </span>

          </h2>

          <p className="mt-6 text-lg text-gray-300 leading-8">

            Hundreds of businesses trust Tax60Sec
            for taxation, compliance, financial reporting,
            and growth advisory services.

          </p>

        </motion.div>

        {/* CARDS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            testimonials.map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-8 hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              >

                {/* STARS */}
                <div className="flex items-center gap-1">

                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />

                </div>

                {/* REVIEW */}
                <p className="mt-6 text-gray-300 leading-8">

                  "{item.review}"

                </p>

                {/* USER */}
                <div className="mt-8">

                  <h4 className="text-xl font-semibold">

                    {item.name}

                  </h4>

                  <p className="mt-1 text-blue-400 text-sm">

                    {item.role}

                  </p>

                </div>

              </motion.div>

            ))
          }

        </div>

      </div>

    </section>

  );
}