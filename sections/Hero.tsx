"use client";

import Link from "next/link";

export default function Hero() {

  return (

    <section className="section-space">

      <div className="container-main">

        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* LEFT */}
          <div>

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">

              Trusted by 500+ Businesses

            </div>

            {/* TITLE */}
            <h1 className="mt-6 text-4xl lg:text-5xl font-bold leading-[1.1] max-w-2xl">

              All-in-One Finance
              <br />
              & Tax Solutions

            </h1>

            {/* DESC */}
            <p className="mt-5 text-base text-secondary leading-8 max-w-xl">

              We help startups, businesses and professionals
              stay compliant, optimize taxes and simplify
              financial operations with expert support.

            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-wrap items-center gap-4">

              <Link
                href="/contact"
                className="btn-primary"
              >

                Book Consultation

              </Link>

              <a
                href="https://wa.me/917013734079"
                target="_blank"
                className="btn-secondary"
              >

                Chat on WhatsApp

              </a>

            </div>

            {/* TRUST METRICS */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">

              <div>

                <h3 className="text-2xl font-bold">

                  500+

                </h3>

                <p className="text-sm text-secondary mt-1">

                  Happy Clients

                </p>

              </div>

              <div>

                <h3 className="text-2xl font-bold">

                  10+

                </h3>

                <p className="text-sm text-secondary mt-1">

                  Years Experience

                </p>

              </div>

              <div>

                <h3 className="text-2xl font-bold">

                  24hr

                </h3>

                <p className="text-sm text-secondary mt-1">

                  Response Time

                </p>

              </div>

              <div>

                <h3 className="text-2xl font-bold">

                  95%

                </h3>

                <p className="text-sm text-secondary mt-1">

                  Compliance Rate

                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="card-dark p-6">

            {/* TOP CARDS */}
            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-[#111827] p-5 border border-white/5">

                <p className="text-sm text-secondary">

                  Total Revenue

                </p>

                <h3 className="mt-3 text-3xl font-bold">

                  ₹24,50,000

                </h3>

                <p className="mt-2 text-sm text-green-400">

                  ↑ 18.6% this month

                </p>

              </div>

              <div className="rounded-2xl bg-[#111827] p-5 border border-white/5">

                <p className="text-sm text-secondary">

                  Tax Savings

                </p>

                <h3 className="mt-3 text-3xl font-bold">

                  ₹4,25,000

                </h3>

                <p className="mt-2 text-sm text-green-400">

                  ↑ 22.4% this month

                </p>

              </div>

            </div>

            {/* GRAPH */}
            <div className="mt-5 rounded-2xl bg-[#111827] border border-white/5 p-5">

              <div className="flex items-center justify-between">

                <h3 className="font-semibold">

                  Business Growth

                </h3>

                <p className="text-sm text-secondary">

                  This Year

                </p>

              </div>

              <div className="mt-6 h-44 flex items-end gap-3">

                <div className="w-full bg-blue-900 rounded-t-xl h-[20%]" />

                <div className="w-full bg-blue-700 rounded-t-xl h-[35%]" />

                <div className="w-full bg-blue-800 rounded-t-xl h-[28%]" />

                <div className="w-full bg-blue-500 rounded-t-xl h-[60%]" />

                <div className="w-full bg-blue-700 rounded-t-xl h-[42%]" />

                <div className="w-full bg-blue-400 rounded-t-xl h-[78%]" />

                <div className="w-full bg-blue-600 rounded-t-xl h-[52%]" />

              </div>

            </div>

            {/* COMPLIANCE */}
            <div className="mt-5 rounded-2xl bg-[#111827] border border-white/5 p-5">

              <div className="flex items-center justify-between">

                {/* DONUT */}
                <div className="relative w-32 h-32">

                  <div className="absolute inset-0 rounded-full border-[10px] border-blue-500/20" />

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
                <div className="space-y-3 text-sm">

                  <div className="flex items-center gap-3">

                    <div className="w-2 h-2 rounded-full bg-green-400" />

                    GST Returns

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="w-2 h-2 rounded-full bg-green-400" />

                    Income Tax

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="w-2 h-2 rounded-full bg-green-400" />

                    TDS Compliance

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="w-2 h-2 rounded-full bg-green-400" />

                    ROC Filing

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