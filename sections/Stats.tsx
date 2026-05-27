"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Stats() {

  return (

    <section className="bg-[#f8fafc] py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* TOP TEXT */}
        <div className="text-center">

          <p className="text-blue-600 font-semibold uppercase tracking-[0.3em] text-sm">

            What We Do

          </p>

          <h2 className="mt-4 text-5xl font-bold text-[#0f172a]">

            Complete Finance & Tax Solutions

          </h2>

          <p className="mt-4 text-gray-600 text-lg">

            Everything your business needs under one roof

          </p>

        </div>

        {/* MAIN GRID */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT STATS */}
          <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100">

            <h3 className="text-3xl font-bold text-[#0f172a]">

              Trusted by Businesses

            </h3>

            <div className="mt-10 grid grid-cols-2 gap-8">

              <div>

                <h2 className="text-5xl font-bold text-blue-600">

                  500+

                </h2>

                <p className="mt-2 text-gray-600">

                  Happy Clients

                </p>

              </div>

              <div>

                <h2 className="text-5xl font-bold text-blue-600">

                  1000+

                </h2>

                <p className="mt-2 text-gray-600">

                  GST Returns Filed

                </p>

              </div>

              <div>

                <h2 className="text-5xl font-bold text-blue-600">

                  10+

                </h2>

                <p className="mt-2 text-gray-600">

                  Years Experience

                </p>

              </div>

              <div>

                <h2 className="text-5xl font-bold text-blue-600">

                  50+

                </h2>

                <p className="mt-2 text-gray-600">

                  Industries Served

                </p>

              </div>

            </div>

            {/* BUTTON */}
            <button className="mt-10 px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold flex items-center gap-3">

              View All Services

              <ArrowRight size={18} />

            </button>

          </div>

          {/* CENTER VIDEOS */}
          <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100">

            <div className="flex items-center justify-between">

              <h3 className="text-2xl font-bold text-[#0f172a]">

                Tax in 60 Sec — Learn with Us

              </h3>

              <button className="text-blue-600 font-semibold text-sm">

                View All Videos →

              </button>

            </div>

            {/* VIDEOS */}
            <div className="mt-8 grid gap-5">

              {/* VIDEO */}
              <div>

                <div className="relative rounded-2xl overflow-hidden">

                  <Image
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop"
                    alt="video"
                    width={500}
                    height={300}
                    className="rounded-2xl h-[140px] object-cover"
                  />

                </div>

                <h4 className="mt-3 font-bold text-[#0f172a] leading-6">

                  5 GST Mistakes Every Business Should Avoid

                </h4>

              </div>

              {/* VIDEO */}
              <div>

                <div className="relative rounded-2xl overflow-hidden">

                  <Image
                    src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop"
                    alt="video"
                    width={500}
                    height={300}
                    className="rounded-2xl h-[140px] object-cover"
                  />

                </div>

                <h4 className="mt-3 font-bold text-[#0f172a] leading-6">

                  TDS Explained in 60 Seconds

                </h4>

              </div>

            </div>

          </div>

          {/* RIGHT CTA */}
          <div className="rounded-[30px] bg-gradient-to-br from-[#08142e] via-[#081229] to-[#020817] p-10 relative overflow-hidden shadow-2xl">

            {/* GLOW */}
            <div className="absolute top-[-60px] right-[-60px] w-[220px] h-[220px] bg-blue-500/20 blur-[100px] rounded-full" />

            <div className="relative z-10">

              <h2 className="text-5xl font-bold text-white leading-tight">

                Ready to Simplify Your Finance?

              </h2>

              <p className="mt-6 text-gray-300 leading-8 text-lg">

                Book a free consultation with our experts
                and grow your business with confidence.

              </p>

              {/* BUTTONS */}
              <div className="mt-10 space-y-4">

                <a
                  href="/#contact"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold"
                >

                  Book Free Consultation

                  <ArrowRight size={18} />

                </a>

                <a
                  href="https://wa.me/917013734079"
                  target="_blank"
                  className="w-full flex items-center justify-center px-6 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition text-white font-semibold"
                >

                  Chat on WhatsApp

                </a>

              </div>

              <p className="mt-6 text-sm text-gray-400">

                No commitment. 100% confidential.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}