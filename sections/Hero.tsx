"use client";

import Link from "next/link";

export default function Hero() {

  return (

    <section className="py-16 lg:py-20">

      <div className="container-main">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE */}
          <div className="max-w-xl">

            {/* BADGE */}
            <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">

              Trusted by 500+ Businesses

            </div>

            {/* TITLE */}
            <h1 className="mt-6 text-4xl lg:text-5xl font-bold leading-tight tracking-tight">

              All-in-One Finance
              <br />
              & Tax Solutions

            </h1>

            {/* DESC */}
            <p className="mt-6 text-lg leading-8 text-secondary">

              We help startups, businesses and professionals
              stay compliant, optimize taxes and simplify
              financial operations with expert support.

            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/contact"
                className="btn-primary"
              >

                Book Consultation →

              </Link>

              <a
                href="https://wa.me/917013734079"
                target="_blank"
                className="btn-secondary"
              >

                Chat on WhatsApp

              </a>

            </div>

            {/* STATS */}
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">

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

          {/* RIGHT SIDE */}
          <div className="card-dark overflow-hidden">

            {/* TOP */}
            <div className="grid grid-cols-2 border-b border-white/5">

              <div className="p-6 border-r border-white/5">

                <p className="text-secondary text-sm">

                  Total Revenue

                </p>

                <h3 className="mt-3 text-4xl font-bold">

                  ₹24,50,000

                </h3>

                <p className="mt-3 text-green-400 text-sm">

                  ↑ 18.6% vs last month

                </p>

              </div>

              <div className="p-6">

                <p className="text-secondary text-sm">

                  Tax Savings

                </p>

                <h3 className="mt-3 text-4xl font-bold">

                  ₹4,25,000

                </h3>

                <p className="mt-3 text-green-400 text-sm">

                  ↑ 22.4% vs last month

                </p>

              </div>

            </div>

            {/* BOTTOM */}
            <div className="grid lg:grid-cols-2">

              {/* CHART */}
              <div className="p-6 border-r border-white/5">

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold text-lg">

                    Business Growth

                  </h3>

                  <p className="text-sm text-secondary">

                    This Year

                  </p>

                </div>

                {/* CHART */}
                <div className="mt-8 h-48 flex items-end gap-3">

                  <div className="w-full rounded-t-xl bg-blue-900 h-[20%]" />

                  <div className="w-full rounded-t-xl bg-blue-700 h-[35%]" />

                  <div className="w-full rounded-t-xl bg-blue-800 h-[28%]" />

                  <div className="w-full rounded-t-xl bg-blue-500 h-[60%]" />

                  <div className="w-full rounded-t-xl bg-blue-700 h-[42%]" />

                  <div className="w-full rounded-t-xl bg-blue-400 h-[78%]" />

                  <div className="w-full rounded-t-xl bg-blue-600 h-[52%]" />

                </div>

              </div>

              {/* COMPLIANCE */}
              <div className="p-6">

                <h3 className="font-semibold text-lg">

                  Compliance Overview

                </h3>

                <div className="mt-8 flex items-center gap-6">

                  {/* DONUT */}
                  <div className="relative w-32 h-32 flex-shrink-0">

                    <div className="absolute inset-0 rounded-full border-[10px] border-blue-900" />

                    <div className="absolute inset-0 rounded-full border-[10px] border-blue-500 border-t-transparent rotate-45" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center">

                      <h3 className="text-3xl font-bold">

                        92%

                      </h3>

                      <p className="text-xs text-secondary">

                        Compliant

                      </p>

                    </div>

                  </div>

                  {/* LIST */}
                  <div className="space-y-4 text-sm">

                    <div className="flex items-center justify-between gap-4">

                      <span>GST Returns</span>

                      <span className="text-green-400">

                        On Time

                      </span>

                    </div>

                    <div className="flex items-center justify-between gap-4">

                      <span>Income Tax</span>

                      <span className="text-green-400">

                        On Time

                      </span>

                    </div>

                    <div className="flex items-center justify-between gap-4">

                      <span>TDS Compliance</span>

                      <span className="text-green-400">

                        On Time

                      </span>

                    </div>

                    <div className="flex items-center justify-between gap-4">

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