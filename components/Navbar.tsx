"use client";

import Link from "next/link";

export default function Navbar() {

  return (

    <nav className="fixed top-0 left-0 w-full z-[999] backdrop-blur-xl bg-[#020817]/80 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-24">

          {/* LOGO */}
          <Link href="/">

            <div>

              <h1 className="text-4xl font-bold text-white">

                Tax
                <span className="text-blue-500">
                  60
                </span>
                Sec

              </h1>

              <p className="text-gray-400 text-sm tracking-[0.3em] mt-1">

                TAX | FINANCE | GROWTH

              </p>

            </div>

          </Link>

          {/* MENU */}
          <div className="hidden md:flex items-center gap-12 text-white font-medium">

            <Link
              href="/"
              className="hover:text-blue-400 transition"
            >
              Home
            </Link>

            <Link
              href="/services"
              className="hover:text-blue-400 transition"
            >
              Services
            </Link>

            <Link
              href="/about"
              className="hover:text-blue-400 transition"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="hover:text-blue-400 transition"
            >
              Contact
            </Link>

          </div>

          {/* BUTTONS */}
          <div className="hidden md:flex items-center gap-5">

            <a
              href="https://wa.me/917013734079"
              target="_blank"
              className="px-8 py-4 rounded-2xl border border-white/10 text-white hover:bg-white/10 transition"
            >

              WhatsApp

            </a>

            <a
              href="#contact"
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold shadow-2xl shadow-blue-500/20"
            >

              Book Consultation

            </a>

          </div>

        </div>

      </div>

    </nav>

  );
}