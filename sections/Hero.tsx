"use client";

import Link from "next/link";

export default function Hero() {

  return (

    <section className="section-space">

      <div className="container-main">

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">

              Trusted by 500+ Businesses

            </div>

            {/* TITLE */}
            <h1 className="mt-8 text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight max-w-xl">

              All-in-One Finance
              <br />
              & Tax Solutions

            </h1>

            {/* DESC */}
            <p className="mt-7 text-lg text-secondary leading-9 max-w-lg">

              We help startups, businesses and professionals stay
              100% compliant while optimizing taxes and
              streamlining finance.

            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap items-center gap-5">

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
            <div className="mt-12 flex flex-wrap gap-10">

              <div>
                <h3 className="text-4xl font-bold">500+</h3>
                <p className="mt-1 text-sm text-secondary">
                  Happy Clients
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">10+</h3>
                <p className="mt-1 text-sm text-secondary">
                  Years Experience
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">24hr</h3>
                <p className="mt-1 text-sm text-secondary">
                  Response Time
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">95%</h3>
                <p className="mt-1 text-sm text-secondary">
                  Compliance Rate
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="card-dark p-7">

            {/* TOP */}
            <div className="grid grid-cols-2">

              <div className="p-7 border-b border-r border-white/5">

                <p className="text-secondary">
                  Total Revenue
                </p>

                <h3 className="mt-4 text-5xl font-bold">

                  ₹24,50,000

                </h3>

                <p className="mt-4 text-green-400">

                  ↑ 18.6% vs last month

                </p>

              </div>

              <div className="p-7 border-b border-white/5">

                <p className="text-secondary">
                  Tax Savings
                </p>

                <h3 className="mt-4 text-5xl font-bold">

                  ₹4,25,000

                </h3>

                <p className="mt-4 text-green-400">

                  ↑ 22.4% vs last month

                </p>

              </div>

            </div>

            {/* BOTTOM */}
            <div className="grid lg:grid-cols-2">

              {/* CHART */}
              <div className="p-7 border-r border-white/5">

                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-semibold">

                    Business Growth

                  </h3>

                  <p className="text-secondary">

                    This Year

                  </p>

                </div>

                <div className="mt-10 flex items-end gap-3 h-56">

                  <div className="w-full rounded-t-2xl bg-blue-900 h-[20%]" />
                  <div className="w-full rounded-t-2xl bg-blue-700 h-[35%]" />
                  <div className="w-full rounded-t-2xl bg-blue-800 h-[28%]" />
                  <div className="w-full rounded-t-2xl bg-blue-500 h-[60%]" />
                  <div className="w-full rounded-t-2xl bg-blue-700 h-[42%]" />
                  <div className="w-full rounded-t-2xl bg-blue-400 h-[78%]" />
                  <div className="w-full rounded-t-2xl bg-blue-600 h-[52%]" />

                </div>

              </div>

              {/* COMPLIANCE */}
              <div className="p-7 flex items-center justify-between gap-8">

                <div className="relative w-44 h-44">

                  <div className="absolute inset-0 rounded-full border-[14px] border-blue-900" />

                  <div className="absolute inset-0 rounded-full border-[14px] border-blue-500 border-t-transparent rotate-45" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <h3 className="text-5xl font-bold">

                      92%

                    </h3>

                    <p className="mt-2 text-secondary">

                      Compliant

                    </p>

                  </div>

                </div>

                <div className="space-y-5 text-lg">

                  <div className="flex items-center justify-between gap-8">

                    <span>GST Returns</span>

                    <span className="text-green-400">

                      On Time

                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-8">

                    <span>Income Tax</span>

                    <span className="text-green-400">

                      On Time

                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-8">

                    <span>TDS Compliance</span>

                    <span className="text-green-400">

                      On Time

                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-8">

                    <span>ROC Compliance</span>

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

    </section>

  );

}