"use client";

import { ArrowRight } from "lucide-react";

export default function Hero() {

  return (

    <section className="relative bg-[#020817] overflow-hidden text-white pt-32 lg:pt-36 pb-20">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-150px] left-[-100px] w-[350px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT */}
        <div>

          {/* TAG */}
          <div className="inline-flex items-center px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm font-medium">

            Modern Finance. Smart Compliance. Stronger Business.

          </div>

          {/* HEADING */}
          <h1 className="mt-8 text-5xl sm:text-6xl lg:text-6xl leading-[1.1] font-bold">

            All-in-One

            <br />

            <span className="text-blue-500">
              Finance &
            </span>

            <br />

            Tax Solutions

            <br />

            For Businesses

          </h1>

          {/* DESC */}
          <p className="mt-8 text-lg text-gray-300 leading-8 max-w-2xl">

            From GST filing to startup registration,
            audits, tax planning, and virtual CFO services —
            we simplify finance for modern businesses.

          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-5">

            <a
              href="#contact"
              className="px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold flex items-center gap-3 shadow-2xl shadow-blue-500/20"
            >

              Book Consultation

              <ArrowRight size={18} />

            </a>

            <a
              href="https://wa.me/917013734079"
              target="_blank"
              className="px-7 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition text-white font-semibold"
            >

              WhatsApp

            </a>

          </div>

        </div>

        {/* RIGHT */}
        <div className="relative">

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[36px] p-6 shadow-2xl shadow-blue-500/10">

            {/* TOP CARDS */}
            <div className="grid grid-cols-2 gap-4">

              <div className="bg-[#0f172a] rounded-3xl p-6 border border-white/10">

                <p className="text-gray-400 text-sm">
                  Total Revenue
                </p>

                <h3 className="mt-3 text-4xl font-bold">

                  ₹48L+

                </h3>

                <p className="mt-3 text-green-400 text-sm">

                  +12.5% this month

                </p>

              </div>

              <div className="bg-[#0f172a] rounded-3xl p-6 border border-white/10">

                <p className="text-gray-400 text-sm">
                  Tax Savings
                </p>

                <h3 className="mt-3 text-4xl font-bold">

                  ₹3.2L

                </h3>

                <p className="mt-3 text-green-400 text-sm">

                  +8.7% improvement

                </p>

              </div>

            </div>

            {/* CHART */}
            <div className="mt-5 bg-[#0f172a] rounded-3xl p-6 border border-white/10">

              <div className="flex items-center justify-between">

                <h3 className="text-2xl font-bold">

                  Business Growth

                </h3>

                <p className="text-gray-400 text-sm">

                  This Year

                </p>

              </div>

              {/* BARS */}
              <div className="mt-8 flex items-end justify-between gap-3 h-[180px]">

                <div className="w-full bg-blue-900 rounded-t-2xl h-[20%]" />

                <div className="w-full bg-blue-700 rounded-t-2xl h-[40%]" />

                <div className="w-full bg-blue-800 rounded-t-2xl h-[25%]" />

                <div className="w-full bg-blue-500 rounded-t-2xl h-[65%]" />

                <div className="w-full bg-blue-700 rounded-t-2xl h-[35%]" />

                <div className="w-full bg-blue-400 rounded-t-2xl h-[85%]" />

                <div className="w-full bg-blue-700 rounded-t-2xl h-[50%]" />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}