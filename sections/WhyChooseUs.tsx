"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Clock3,
  FileSpreadsheet,
  Headphones,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Expert Professionals",
    desc: "Experienced tax and finance experts guiding your business growth.",
  },
  {
    icon: Clock3,
    title: "Fast Turnaround",
    desc: "Quick response times and streamlined compliance processing.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Secure",
    desc: "Your financial data stays protected with complete confidentiality.",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    desc: "We help businesses scale smarter and maximize profits.",
  },
  {
    icon: FileSpreadsheet,
    title: "Modern Financial Systems",
    desc: "Automation, dashboards, analytics & business reporting solutions.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Direct WhatsApp and consultation support whenever you need help.",
  },
];

export default function WhyChooseUs() {

  return (

    <section className="relative py-32 bg-[#020817] overflow-hidden">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full" />

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

            Why Choose Us

          </p>

          <h2 className="mt-5 text-5xl font-bold text-white leading-tight">

            Built For
            <span className="text-blue-500">
              {" "}Modern Businesses
            </span>

          </h2>

          <p className="mt-6 text-lg text-gray-300 leading-8">

            We combine financial expertise,
            automation, compliance strategy,
            and personalized support to help
            businesses grow confidently.

          </p>

        </motion.div>

        {/* GRID */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            features.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/20 relative overflow-hidden"
                >

                  {/* GLOW */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition" />

                  {/* ICON */}
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">

                    <Icon
                      size={30}
                      className="text-blue-400"
                    />

                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-white">

                    {item.title}

                  </h3>

                  <p className="mt-4 text-gray-300 leading-7">

                    {item.desc}

                  </p>

                </motion.div>

              );

            })
          }

        </div>

      </div>

    </section>

  );
}