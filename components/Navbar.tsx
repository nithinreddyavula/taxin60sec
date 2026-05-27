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
  className="group cursor-pointer"
>

  <div className="flex items-center gap-4">

    {/* PREMIUM ICON */}
    <div className="relative">

      {/* GLOW */}
      <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-40 rounded-2xl group-hover:opacity-70 transition duration-500" />

      {/* ICON BOX */}
      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center border border-white/10 shadow-2xl shadow-blue-500/30 overflow-hidden">

        {/* INNER DESIGN */}
        <div className="absolute inset-0 opacity-20">

          <div className="absolute top-2 left-2 w-6 h-6 border border-white/30 rounded-full" />

          <div className="absolute bottom-2 right-2 w-4 h-4 bg-white/20 rounded-full" />

        </div>

        {/* TEXT */}
        <span className="text-white font-extrabold text-2xl tracking-tight">

          T

        </span>

      </div>

    </div>

    {/* BRAND */}
    <div>

      <h1 className="text-4xl font-extrabold tracking-tight leading-none">

        <span className="text-white">
          Tax
        </span>

        <span className="text-blue-500">
          60
        </span>

        <span className="text-white">
          Sec
        </span>

      </h1>

      <p className="mt-1 text-[11px] tracking-[0.45em] uppercase text-gray-400 font-medium">

        Tax • Finance • Growth

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