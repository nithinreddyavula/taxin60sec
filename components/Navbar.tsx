"use client";

import Link from "next/link";

export default function Navbar() {

  return (

    <nav className="fixed top-0 left-0 w-full z-[999] backdrop-blur-xl bg-[#020817]/80 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-24">

          {/* LOGO */}
          <Link
  href="/"
  className="cursor-pointer"
>

           <div className="flex items-center gap-3">

  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-blue-500/30">

    T

  </div>

  <div>

    <h1 className="text-3xl font-bold text-white">
      Tax60Sec
    </h1>

    <p className="text-xs tracking-[0.3em] text-gray-400">
      TAX • FINANCE • GROWTH
    </p>

  </div>

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