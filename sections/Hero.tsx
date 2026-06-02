"use client";

import Link from "next/link";

export default function Hero() {

  return (

    <section className="py-12 lg:py-20 overflow-hidden">

      <div className="container-main">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* LEFT */}
          <div className="max-w-xl">

            {/* BADGE */}
            <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs sm:text-sm text-blue-300">

              Trusted by 500+ Businesses

            </div>

            {/* HEADING */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">

              All-in-One Finance
              <br />
              & Tax Solutions

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 text-base sm:text-lg leading-8 text-secondary max-w-lg">

              We help startups, businesses and professionals
              stay compliant, optimize taxes and simplify
              financial operations with expert support.

            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              <Link
                href="/contact"
                className="btn-primary w-full sm:w-auto"
              >

                Book Consultation →

              </Link>

              <a
                href="https://wa.me/917013734079"
                target="_blank"
                className="btn-secondary w-full sm:w-auto"
              >

                Chat on WhatsApp

              </a>

            </div>

            {/* STATS */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">

              <div>
                <h3 className="text-2xl font-bold">
                  500+
                </h3>

                <p className="mt-1 text-sm text-secondary">
                  Happy Clients
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  10+
                </h3>

                <p className="mt-1 text-sm text-secondary">
                  Years Experience
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  24hr
                </h3>

                <p className="mt-1 text-sm text-secondary">
                  Response Time
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  95%
                </h3>

                <p className="mt-1 text-sm text-secondary">
                  Compliance Rate
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT CARD */}
          <div className="card-dark overflow-hidden">

            {/* TOP METRICS */}
            <div className="grid grid-cols-2 border-b border-white/5">

              <div className="p-5 sm:p-6 border-r border-white/5">

                <p className="text-xs sm:text-sm text-secondary">

                  Total Revenue

                </p>

                <h3 className="mt-3 text-2xl sm:text-4xl font-bold break-words">

                  ₹24,50,000

                </h3>

                <p className="mt-3 text-green-400 text-xs sm:text-sm">

                  ↑ 18.6% vs last month

                </p>

              </div>

              <div className="p-5 sm:p-6">

                <p className="text-xs sm:text-sm text-secondary">

                  Tax Savings

                </p>

                <h3 className="mt-3 text-2xl sm:text-4xl font-bold break-words">

                  ₹4,25,000

                </h3>

                <p className="mt-3 text-green-400 text-xs sm:text-sm">

                  ↑ 22.4% vs last month

                </p>

              </div>

            </div>

            {/* LOWER SECTION */}
            <div className="grid lg:grid-cols-2">

              {/* CHART */}
              <div className="p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/5">

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold text-base sm:text-lg">

                    Business Growth

                  </h3>

                  <p className="text-xs sm:text-sm text-secondary">

                    This Year

                  </p>

                </div>

                {/* GRAPH */}
                <div className="mt-8 h-40 sm:h-48 flex items-end gap-2">

                  <div className="w-full rounded-t-lg bg-blue-900 h-[20%]" />
                  <div className="w-full rounded-t-lg bg-blue-700 h-[35%]" />
                  <div className="w-full rounded-t-lg bg-blue-800 h-[28%]" />
                  <div className="w-full rounded-t-lg bg-blue-500 h-[60%]" />
                  <div className="w-full rounded-t-lg bg-blue-700 h-[42%]" />
                  <div className="w-full rounded-t-lg bg-blue-400 h-[78%]" />
                  <div className="w-full rounded-t-lg bg-blue-600 h-[52%]" />

                </div>

              </div>

              {/* COMPLIANCE */}
              <div className="p-5 sm:p-6">

                <h3 className="font-semibold text-base sm:text-lg">

                  Compliance Overview

                </h3>

                <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">

                  {/* DONUT */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">

                    <div className="absolute inset-0 rounded-full border-[10px] border-blue-900" />

                    <div className="absolute inset-0 rounded-full border-[10px] border-blue-500 border-t-transparent rotate-45" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center">

                      <h3 className="text-2xl sm:text-3xl font-bold">

                        92%

                      </h3>

                      <p className="text-xs text-secondary">

                        Compliant

                      </p>

                    </div>

                  </div>

                  {/* LIST */}
                  <div className="w-full space-y-3 text-sm">

                    <div className="flex justify-between gap-4">

                      <span>GST Returns</span>

                      <span className="text-green-400">
                        On Time
                      </span>

                    </div>

                    <div className="flex justify-between gap-4">

                      <span>Income Tax</span>

                      <span className="text-green-400">
                        On Time
                      </span>

                    </div>

                    <div className="flex justify-between gap-4">

                      <span>TDS Compliance</span>

                      <span className="text-green-400">
                        On Time
                      </span>

                    </div>

                    <div className="flex justify-between gap-4">

                      <span>ROC Filing</span>

                      <span className="text-green-400">
                        On Time
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}