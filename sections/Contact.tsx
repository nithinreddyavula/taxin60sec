"use client";

import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {

  return (

    <section
      id="contact"
      className="relative overflow-hidden bg-[#020817] py-24 text-white"
    >

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] right-[-120px] h-[350px] w-[350px] rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute bottom-[-120px] left-[-120px] h-[350px] w-[350px] rounded-full bg-indigo-600/20 blur-[120px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT FORM */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 lg:p-10 backdrop-blur-xl shadow-2xl shadow-blue-500/10">

            <h2 className="text-4xl font-bold">

              Book Free Consultation

            </h2>

            <p className="mt-4 text-lg text-gray-400 leading-8">

              Fill out the form and our team will contact you shortly.

            </p>

            <form className="mt-10 space-y-6">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-6 py-5 text-white outline-none transition focus:border-blue-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-6 py-5 text-white outline-none transition focus:border-blue-500"
              />

              <textarea
                rows={6}
                placeholder="Tell us about your requirements"
                className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-6 py-5 text-white outline-none transition focus:border-blue-500"
              />

              <button
                type="submit"
                className="w-full rounded-2xl bg-blue-600 py-5 text-lg font-semibold transition hover:bg-blue-500 shadow-xl shadow-blue-500/20"
              >

                Book Consultation

              </button>

            </form>

          </div>

          {/* RIGHT CONTENT */}
          <div className="pt-4">

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">

              Contact Us

            </p>

            <h2 className="mt-6 text-5xl lg:text-6xl font-bold leading-tight">

              Let’s Build Your{" "}

              <span className="text-blue-500">

                Business Smarter

              </span>

            </h2>

            <p className="mt-8 max-w-xl text-lg leading-9 text-gray-300">

              Get expert help with taxation, compliance,
              business setup, financial reporting,
              and growth strategy.

            </p>

            {/* CONTACT ITEMS */}
            <div className="mt-12 space-y-8">

              {/* PHONE */}
              <div className="flex items-start gap-5">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">

                  <Phone className="text-blue-400" size={30} />

                </div>

                <div>

                  <p className="text-gray-400">

                    Phone Number

                  </p>

                  <h3 className="mt-1 text-3xl font-bold">

                    +91 7013734079

                  </h3>

                </div>

              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-5">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">

                  <Mail className="text-blue-400" size={30} />

                </div>

                <div>

                  <p className="text-gray-400">

                    Email Address

                  </p>

                  <h3 className="mt-1 text-2xl lg:text-3xl font-bold break-all">

                    compliance@taxin60sec.com

                  </h3>

                </div>

              </div>

              {/* LOCATION */}
              <div className="flex items-start gap-5">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">

                  <MapPin className="text-blue-400" size={30} />

                </div>

                <div>

                  <p className="text-gray-400">

                    Availability

                  </p>

                  <h3 className="mt-1 text-2xl lg:text-3xl font-bold">

                    Online Consultation Across India

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}