"use client";

import { motion } from "framer-motion";

import {
  BadgeDollarSign,
  Building2,
  Calculator,
  FileSpreadsheet,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    icon: Calculator,
    title: "GST & Indirect Tax",
    desc: "GST registration, returns, notices, refunds, LUT, and compliance.",
  },
  {
    icon: BadgeDollarSign,
    title: "Direct Taxation",
    desc: "ITR filing, tax planning, assessments, and TDS compliance.",
  },
  {
    icon: TrendingUp,
    title: "Virtual CFO",
    desc: "Financial planning, budgeting, analytics, and advisory.",
  },
  {
    icon: Building2,
    title: "Startup Services",
    desc: "Company registration, compliance, fundraising, and ESOP setup.",
  },
  {
    icon: ShieldCheck,
    title: "Audit & Assurance",
    desc: "Statutory audit, internal audit, due diligence, and compliance.",
  },
  {
    icon: FileSpreadsheet,
    title: "Finance Automation",
    desc: "Accounting automation, dashboards, and reporting systems.",
  },
];

export default function Services() {

  return (

    <section className="relative py-32 bg-[#020817] overflow-hidden">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-120px] left-[-120px] w-[350px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full" />

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

            What We Do

          </p>

          <h2 className="mt-5 text-5xl font-bold text-white leading-tight">

            Complete
            <span className="text-blue-500">
              {" "}Finance & Tax Solutions
            </span>

          </h2>

          <p className="mt-6 text-lg text-gray-300 leading-8">

            Everything your business needs under one roof —
            taxation, compliance, audits, financial reporting,
            automation, and growth advisory.

          </p>

        </motion.div>

        {/* GRID */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            services.map((service, index) => {

              const Icon = service.icon;

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
                  className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden"
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

                  {/* TITLE */}
                  <h3 className="mt-8 text-2xl font-bold text-white">

                    {service.title}

                  </h3>

                  {/* DESC */}
                  <p className="mt-4 text-gray-300 leading-7">

                    {service.desc}

                  </p>

                  {/* LINK */}
                  <button className="mt-8 text-blue-400 font-semibold hover:text-blue-300 transition">

                    Know More →

                  </button>

                </motion.div>

              );

            })
          }

        </div>

      </div>

    </section>

  );
}