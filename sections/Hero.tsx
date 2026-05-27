"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#020817] text-white min-h-screen pt-36">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* TAG */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-5 py-2 rounded-full text-sm font-medium">

            Modern Finance. Smart Compliance. Stronger Business.

          </div>

          {/* HEADING */}
          <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">

            All-in-One
            <span className="text-blue-500">
              {" "}Finance &
            </span>

            <br />

            Tax Solutions for
            <span className="text-blue-500">
              {" "}Growing Businesses
            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="mt-8 text-lg text-gray-300 leading-8 max-w-2xl">

            From GST to Global Compliance, from Startup Registration
            to Virtual CFO — we simplify finance so you can focus
            on growth.

          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row gap-5">

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-2xl font-semibold shadow-2xl shadow-blue-500/20"
            >

              Book a Free Consultation

              <ArrowRight
                className="group-hover:translate-x-1 transition"
                size={18}
              />

            </Link>

            <a
              href="https://wa.me/917013734079"
              target="_blank"
              className="inline-flex items-center justify-center border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition px-8 py-4 rounded-2xl font-semibold"
            >

              Chat on WhatsApp

            </a>

          </div>

          {/* STATS */}
          <div className="mt-12 flex flex-wrap gap-8 text-sm text-gray-300">

            <div className="flex items-center gap-2">

              <CheckCircle2
                size={18}
                className="text-blue-400"
              />

              <span>500+ Clients</span>

            </div>

            <div className="flex items-center gap-2">

              <ShieldCheck
                size={18}
                className="text-blue-400"
              />

              <span>10+ Years Experience</span>

            </div>

            <div className="flex items-center gap-2">

              <Clock3
                size={18}
                className="text-blue-400"
              />

              <span>24hr Response Time</span>

            </div>

          </div>

        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >

          <div className="relative rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-blue-500/10">

            {/* TOP CARDS */}
            <div className="grid grid-cols-2 gap-4">

              <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5">

                <p className="text-gray-400 text-sm">
                  Total Revenue
                </p>

                <h3 className="mt-3 text-3xl font-bold">
                  ₹48,75,000
                </h3>

                <p className="mt-2 text-green-400 text-sm">
                  +12.5% this month
                </p>

              </div>

              <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5">

                <p className="text-gray-400 text-sm">
                  Tax Savings
                </p>

                <h3 className="mt-3 text-3xl font-bold">
                  ₹3,25,000
                </h3>

                <p className="mt-2 text-green-400 text-sm">
                  +8.7% improvement
                </p>

              </div>

            </div>

            {/* CHART */}
            <div className="mt-6 bg-[#0f172a] border border-white/5 rounded-2xl p-6">

              <div className="flex items-center justify-between">

                <h3 className="text-lg font-semibold">
                  Business Growth
                </h3>

                <span className="text-sm text-gray-400">
                  This Year
                </span>

              </div>

              <div className="mt-8 flex items-end gap-4 h-[220px]">

                <div className="w-full bg-blue-500/40 rounded-t-xl h-[30%]" />

                <div className="w-full bg-blue-500/40 rounded-t-xl h-[40%]" />

                <div className="w-full bg-blue-500/40 rounded-t-xl h-[35%]" />

                <div className="w-full bg-blue-500 rounded-t-xl h-[70%]" />

                <div className="w-full bg-blue-500/40 rounded-t-xl h-[50%]" />

                <div className="w-full bg-blue-500 rounded-t-xl h-[90%]" />

                <div className="w-full bg-blue-500/40 rounded-t-xl h-[65%]" />

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}