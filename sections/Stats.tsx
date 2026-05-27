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

        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-indigo-600/20 blur-[120px] rounded-full" />

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

            {/* BUTTON */}
            <button className="mt-10 px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold flex items-center gap-3 shadow-xl shadow-blue-500/20">

              View All Services

              <ArrowRight size={18} />

            </button>

          </div>

          {/* CENTER VIDEOS */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8">

            <div className="flex items-center justify-between">

              <h3 className="text-2xl font-bold text-white">

                Tax in 60 Sec — Learn with Us

              </h3>

              <button className="text-blue-400 hover:text-blue-300 transition text-sm font-semibold">

                View All Videos →

              </button>

            </div>

            {/* VIDEO LIST */}
            <div className="mt-8 space-y-5">

              {/* VIDEO */}
              <div className="flex gap-4 group">

                <div className="min-w-[130px] h-[80px] rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center relative overflow-hidden">

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

                    Quick 60 sec finance lesson

                  </p>

                </div>

              </div>

              {/* VIDEO */}
              <div className="flex gap-4 group">

                <div className="min-w-[130px] h-[80px] rounded-2xl bg-gradient-to-br from-indigo-700 to-blue-900 flex items-center justify-center relative overflow-hidden">

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

                    Simplified finance concepts

                  </p>

                </div>

              </div>

              {/* VIDEO */}
              <div className="flex gap-4 group">

                <div className="min-w-[130px] h-[80px] rounded-2xl bg-gradient-to-br from-blue-800 to-cyan-900 flex items-center justify-center relative overflow-hidden">

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

                    Save taxes legally & smartly

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT CTA */}
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#08142e] via-[#081229] to-[#020817] p-10 shadow-2xl shadow-blue-500/10 min-h-[420px] flex flex-col justify-between">

            {/* GLOW */}
            <div className="absolute top-[-80px] right-[-80px] w-[250px] h-[250px] bg-blue-500/20 blur-[120px] rounded-full" />

            <div className="absolute bottom-[-100px] left-[-100px] w-[220px] h-[220px] bg-indigo-500/10 blur-[100px] rounded-full" />

            <div className="relative z-10">

              {/* TAG */}
              <div className="inline-flex px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm font-medium">

                Free Consultation Available

              </div>

              {/* TITLE */}
              <h2 className="mt-8 text-5xl font-bold text-white leading-tight">

                Ready to
                <span className="text-blue-500">
                  {" "}Simplify
                </span>

                <br />

                Your Finance?

              </h2>

              {/* DESC */}
              <p className="mt-6 text-gray-300 leading-8 text-lg">

                Book a free consultation with our finance experts
                and grow your business with confidence,
                compliance, and smart tax planning.

              </p>

              {/* BUTTONS */}
              <div className="mt-10 space-y-4">

                {/* BTN */}
                <a
                  href="/#contact"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold shadow-2xl shadow-blue-500/20"
                >

                  Book Free Consultation

                  <ArrowRight size={18} />

                </a>

                {/* BTN */}
                <a
                  href="https://wa.me/917013734079"
                  target="_blank"
                  className="w-full flex items-center justify-center px-6 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition text-white font-semibold"
                >

                  Chat on WhatsApp

                </a>

              </div>

              {/* FOOTER */}
              <p className="mt-6 text-sm text-gray-400">

                No commitment • 100% confidential • Fast response

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}