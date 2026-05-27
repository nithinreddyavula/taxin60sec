"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Users2,
} from "lucide-react";

export default function About() {

  return (

    <section className="relative py-32 bg-[#020817] overflow-hidden text-white">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-200px] right-[-100px] w-[450px] h-[450px] bg-blue-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-200px] left-[-100px] w-[450px] h-[450px] bg-indigo-600/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <p className="uppercase tracking-[0.3em] text-sm text-blue-400 font-semibold">

            About Us

          </p>

          <h2 className="mt-6 text-5xl font-bold leading-tight">

            We Simplify
            <span className="text-blue-500">
              {" "}Finance & Compliance
            </span>

            <br />

            For Modern Businesses

          </h2>

          <p className="mt-8 text-lg text-gray-300 leading-8">

            Tax60Sec helps startups, businesses, creators,
            and professionals manage taxation, compliance,
            audits, and financial growth with confidence.

          </p>

          <p className="mt-6 text-lg text-gray-400 leading-8">

            Our mission is simple —
            make finance stress-free,
            fast, and transparent.

          </p>

          {/* FEATURES */}
          <div className="mt-10 space-y-5">

            <div className="flex items-start gap-4">

              <CheckCircle2
                className="text-blue-400 mt-1"
                size={24}
              />

              <div>

                <h4 className="font-semibold text-lg">
                  End-to-End Compliance
                </h4>

                <p className="text-gray-400 mt-1">
                  GST, Income Tax, ROC, Payroll & more.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <ShieldCheck
                className="text-blue-400 mt-1"
                size={24}
              />

              <div>

                <h4 className="font-semibold text-lg">
                  Trusted Financial Guidance
                </h4>

                <p className="text-gray-400 mt-1">
                  Expert-backed decisions for sustainable growth.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <TrendingUp
                className="text-blue-400 mt-1"
                size={24}
              />

              <div>

                <h4 className="font-semibold text-lg">
                  Growth-Focused Strategy
                </h4>

                <p className="text-gray-400 mt-1">
                  We help businesses optimize profits and operations.
                </p>

              </div>

            </div>

          </div>

        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative"
        >

          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-[36px] p-8 shadow-2xl shadow-blue-500/10">

            {/* TOP CARD */}
            <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/10">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400">
                    Client Satisfaction
                  </p>

                  <h3 className="mt-2 text-5xl font-bold">
                    98%
                  </h3>

                </div>

                <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center">

                  <Users2
                    size={36}
                    className="text-blue-400"
                  />

                </div>

              </div>

            </div>

            {/* STATS */}
            <div className="mt-6 grid grid-cols-2 gap-5">

              <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6">

                <h3 className="text-4xl font-bold text-blue-400">
                  500+
                </h3>

                <p className="mt-3 text-gray-400">
                  Happy Clients
                </p>

              </div>

              <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6">

                <h3 className="text-4xl font-bold text-blue-400">
                  10+
                </h3>

                <p className="mt-3 text-gray-400">
                  Years Experience
                </p>

              </div>

              <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6">

                <h3 className="text-4xl font-bold text-blue-400">
                  24/7
                </h3>

                <p className="mt-3 text-gray-400">
                  Support
                </p>

              </div>

              <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6">

                <h3 className="text-4xl font-bold text-blue-400">
                  100%
                </h3>

                <p className="mt-3 text-gray-400">
                  Transparency
                </p>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>

  );
}