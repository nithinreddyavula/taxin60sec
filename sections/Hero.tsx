"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-14 lg:pt-20 pb-16 lg:pb-20 overflow-hidden">
      <div className="container-main">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>

            <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm mb-6">
              Trusted by 500+ Businesses
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              All-in-One Finance
              <br />
              & Tax Solutions
            </h1>

            <p className="text-secondary text-lg leading-8 max-w-xl mb-8">
              We help startups, businesses and professionals
              stay compliant, optimize taxes and simplify
              financial operations with expert support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">

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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">

              <div>
                <h3 className="text-3xl font-bold">
                  500+
                </h3>

                <p className="text-secondary mt-2">
                  Happy Clients
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  10+
                </h3>

                <p className="text-secondary mt-2">
                  Years Experience
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  24hr
                </h3>

                <p className="text-secondary mt-2">
                  Response Time
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  95%
                </h3>

                <p className="text-secondary mt-2">
                  Compliance Rate
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT DASHBOARD */}
          <div className="card-dark p-5">

            {/* TOP CARDS */}
            <div className="grid grid-cols-2 gap-4 mb-4">

              <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
                <p className="text-secondary mb-3">
                  Total Revenue
                </p>

                <h3 className="text-4xl font-bold mb-3">
                  ₹24,50,000
                </h3>

                <p className="text-green-400">
                  ↑ 18.6% vs last month
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
                <p className="text-secondary mb-3">
                  Tax Savings
                </p>

                <h3 className="text-4xl font-bold mb-3">
                  ₹4,25,000
                </h3>

                <p className="text-green-400">
                  ↑ 22.4% vs last month
                </p>
              </div>

            </div>

            {/* BOTTOM */}
            <div className="grid lg:grid-cols-[1fr_220px] gap-4">

              {/* GRAPH */}
              <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">

                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-semibold">
                    Business Growth
                  </h3>

                  <span className="text-secondary">
                    This Year
                  </span>
                </div>

                <div className="flex items-end gap-4 h-56">

                  <div className="w-full bg-blue-900 rounded-t-xl h-16"></div>

                  <div className="w-full bg-blue-700 rounded-t-xl h-24"></div>

                  <div className="w-full bg-blue-800 rounded-t-xl h-20"></div>

                  <div className="w-full bg-blue-500 rounded-t-xl h-36"></div>

                  <div className="w-full bg-blue-700 rounded-t-xl h-28"></div>

                  <div className="w-full bg-blue-400 rounded-t-xl h-44"></div>

                  <div className="w-full bg-blue-600 rounded-t-xl h-32"></div>

                </div>

              </div>

              {/* COMPLIANCE */}
              <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">

                <div>

                  <h3 className="text-2xl font-semibold mb-6">
                    Compliance
                  </h3>

                  <div className="relative w-36 h-36 mx-auto mb-6">

                    <div className="absolute inset-0 rounded-full border-[10px] border-blue-500/20"></div>

                    <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-blue-500 border-r-blue-400 rotate-45"></div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <h3 className="text-4xl font-bold">
                        92%
                      </h3>

                      <p className="text-secondary text-sm">
                        Compliant
                      </p>
                    </div>

                  </div>

                </div>

                <div className="space-y-4">

                  <div className="flex items-center justify-between">
                    <span>GST Returns</span>
                    <span className="text-green-400">
                      On Time
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Income Tax</span>
                    <span className="text-green-400">
                      On Time
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>TDS Compliance</span>
                    <span className="text-green-400">
                      On Time
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
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
    </section>
  );
}