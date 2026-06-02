"use client";

import Link from "next/link";

export default function Footer() {

  return (

    <footer className="border-t border-white/10 bg-[#020817] text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>

            <Link
              href="/"
              className="flex items-center gap-3"
            >

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold">

                T

              </div>

              <div>

                <h2 className="text-3xl font-bold">

                  Tax<span className="text-blue-500">60</span>Sec

                </h2>

                <p className="text-xs tracking-[0.35em] text-gray-400 uppercase">

                  Tax • Finance • Growth

                </p>

              </div>

            </Link>

            <p className="mt-6 text-gray-400 leading-8">

              Modern taxation and finance solutions
              for startups, businesses and creators.

            </p>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-xl font-bold">

              Quick Links

            </h3>

            <div className="mt-6 flex flex-col gap-4 text-gray-400">

              <Link href="/" className="hover:text-blue-400 transition">

                Home

              </Link>

              <Link href="/about" className="hover:text-blue-400 transition">

                About Us

              </Link>

              <Link href="/services" className="hover:text-blue-400 transition">

                Services

              </Link>

              <Link href="/contact" className="hover:text-blue-400 transition">

                Contact

              </Link>

            </div>

          </div>

          {/* SERVICES */}
          <div>

            <h3 className="text-xl font-bold">

              Services

            </h3>

            <div className="mt-6 flex flex-col gap-4 text-gray-400">

              <Link href="/services" className="hover:text-blue-400 transition">

                GST Filing

              </Link>

              <Link href="/services" className="hover:text-blue-400 transition">

                Income Tax

              </Link>

              <Link href="/services" className="hover:text-blue-400 transition">

                Virtual CFO

              </Link>

              <Link href="/services" className="hover:text-blue-400 transition">

                Startup Registration

              </Link>

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-xl font-bold">

              Contact

            </h3>

            <div className="mt-6 space-y-4 text-gray-400">

              <p>

                compliance@taxin60sec.com

              </p>

              <p>

                +91 7013734079

              </p>

              <a
                href="https://wa.me/917013734079"
                target="_blank"
                className="inline-block mt-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold"
              >

                Chat on WhatsApp

              </a>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">

          <p>

            © 2026 Tax60Sec. All rights reserved.

          </p>

          <div className="flex items-center gap-6">

            <Link href="/" className="hover:text-blue-400 transition">

              Home

            </Link>

            <Link href="/services" className="hover:text-blue-400 transition">

              Services

            </Link>

            <Link href="/about" className="hover:text-blue-400 transition">

              About

            </Link>

            <Link href="/contact" className="hover:text-blue-400 transition">

              Contact

            </Link>

          </div>

        </div>

      </div>

    </footer>

  );

}