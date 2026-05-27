"use client";

import {
  ArrowRight,
  PlayCircle,
} from "lucide-react";

export default function Stats() {

  return (

    <section className="relative py-28 bg-[#020817] overflow-hidden">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

          {/* LEFT STATS */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8">

            <h3 className="text-3xl font-bold text-white">

              Trusted by Businesses

            </h3>

            <div className="mt-10 grid grid-cols-2 gap-8">

              <div>

                <h2 className="text-5xl font-bold text-blue-500">

                  500+

                </h2>

                <p className="mt-2 text-gray-300">

                  Happy Clients

                </p>

              </div>

              <div>

                <h2 className="text-5xl font-bold text-blue-500">

                  1000+

                </h2>

                <p className="mt-2 text-gray-300">

                  GST Returns Filed

                </p>

              </div>

              <div>

                <h2 className="text-5xl font-bold text-blue-500">

                  10+

                </h2>

                <p className="mt-2 text-gray-300">

                  Years Experience

                </p>

              </div>

              <div>

                <h2 className="text-5xl font-bold text-blue-500">

                  50+

                </h2>

                <p className="mt-2 text-gray-300">

                  Industries Served

                </p>

              </div>

            </div>

            <button className="mt-10 px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold flex items-center gap-3">

              View All Services

              <ArrowRight size={18} />

            </button>

          </div>

          {/* CENTER VIDEOS */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 lg:col-span-1">

            <div className="flex items-center justify-between">

              <h3 className="text-2xl font-bold text-white">

                Tax in 60 Sec — Learn with Us

              </h3>

              <button className="text-blue-400 hover:text-blue-300 transition text-sm font-semibold">

                View All Videos →

              </button>

            </div>

            {/* VIDEOS */}
            <div className="mt-8 space-y-5">

              {/* VIDEO 1 */}
              <div className="group flex gap-4">

                <div className="relative min-w-[130px] h-[80px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center">

                  <PlayCircle
                    size={40}
                    className="text-white"
                  />

                </div>

                <div>

                  <h4 className="text-white font-semibold leading-6">

                    5 GST Mistakes Every Business Should Avoid

                  </h4>

                  <p className="text-gray-400 text-sm mt-2">

                    60 sec guide

                  </p>

                </div>

              </div>

              {/* VIDEO 2 */}
              <div className="group flex gap-4">

                <div className="relative min-w-[130px] h-[80px] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-700 to-blue-900 flex items-center justify-center">

                  <PlayCircle
                    size={40}
                    className="text-white"
                  />

                </div>

                <div>

                  <h4 className="text-white font-semibold leading-6">

                    TDS Explained in 60 Seconds

                  </h4>

                  <p className="text-gray-400 text-sm mt-2">

                    Quick finance learning

                  </p>

                </div>

              </div>

              {/* VIDEO 3 */}
              <div className="group flex gap-4">

                <div className="relative min-w-[130px] h-[80px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-800 to-cyan-900 flex items-center justify-center">

                  <PlayCircle
                    size={40}
                    className="text-white"
                  />

                </div>

                <div>

                  <h4 className="text-white font-semibold leading-6">

                    Smart Tax Planning Tips For Businesses

                  </h4>

                  <p className="text-gray-400 text-sm mt-2">

                    Save tax legally

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT CTA */}
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-900 via-[#081229] to-[#020817] p-10 shadow-2xl shadow-blue-500/10">

            {/* GLOW */}
            <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-blue-500/20 blur-[100px] rounded-full" />

            <div className="relative z-10">

              <h2 className="text-4xl font-bold text-white leading-tight">

                Ready to Simplify Your Finance?

              </h2>

              <p className="mt-6 text-gray-300 leading-8">

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