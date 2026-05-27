"use client";

import {
  ArrowRight,
} from "lucide-react";

export default function Hero() {

  return (

    <section className="relative pt-44 pb-24 bg-[#020817] overflow-hidden text-white min-h-screen">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <div>

          <div className="inline-flex items-center px-6 py-3 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-medium">

            Modern Finance. Smart Compliance. Stronger Business.

          </div>

          <h1 className="mt-10 text-7xl leading-[1.05] font-bold">

            All-in-One

            <br />

            <span className="text-blue-500">
              Finance &
            </span>

            <br />

            Tax Solutions for

            <br />

            <span className="text-blue-500">
              Growing Businesses
            </span>

          </h1>

          <p className="mt-10 text-xl text-gray-300 leading-9 max-w-2xl">

            From GST filing to startup registration,
            virtual CFO services, audits, and tax planning —
            we simplify finance for modern businesses.

          </p>

          {/* BUTTONS */}
          <div className="mt-12 flex flex-wrap items-center gap-5">

            <a
              href="#contact"
              className="px-8 py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold flex items-center gap-3 shadow-2xl shadow-blue-500/20"
            >

              Book Consultation

              <ArrowRight size={20} />

            </a>

            <a
              href="https://wa.me/917013734079"
              target="_blank"
              className="px-8 py-5 rounded-2xl border border-white/10 hover:bg-white/10 transition text-white font-semibold"
            >

              Chat on WhatsApp

            </a>

          </div>

        </div>

        {/* RIGHT */}
        <div className="relative">

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-8 shadow-2xl shadow-blue-500/10">

            {/* TOP CARDS */}
            <div className="grid grid-cols-2 gap-5">

              <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/10">

                <p className="text-gray-400">
                  Total Revenue
                </p>

                <h3 className="mt-4 text-5xl font-bold">

                  ₹48,75,000

                </h3>

                <p className="mt-4 text-green-400">

                  +12.5% this month

                </p>

              </div>

              <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/10">

                <p className="text-gray-400">
                  Tax Savings
                </p>

                <h3 className="mt-4 text-5xl font-bold">

                  ₹3,25,000

                </h3>

                <p className="mt-4 text-green-400">

                  +8.7% improvement

                </p>

              </div>

            </div>

            {/* CHART */}
            <div className="mt-6 bg-[#0f172a] rounded-3xl p-8 border border-white/10 h-[400px] flex flex-col justify-between">

              <div className="flex items-center justify-between">

                <h3 className="text-3xl font-bold">

                  Business Growth

                </h3>

                <p className="text-gray-400">

                  This Year

                </p>

              </div>

              {/* BARS */}
              <div className="flex items-end justify-between gap-4 h-[250px]">

                <div className="w-full bg-blue-900 rounded-t-3xl h-[20%]" />

                <div className="w-full bg-blue-700 rounded-t-3xl h-[40%]" />

                <div className="w-full bg-blue-800 rounded-t-3xl h-[25%]" />

                <div className="w-full bg-blue-500 rounded-t-3xl h-[65%]" />

                <div className="w-full bg-blue-700 rounded-t-3xl h-[35%]" />

                <div className="w-full bg-blue-400 rounded-t-3xl h-[85%]" />

                <div className="w-full bg-blue-700 rounded-t-3xl h-[50%]" />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}