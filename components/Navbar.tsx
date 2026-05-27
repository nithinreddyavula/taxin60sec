"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (

    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#020817]/70 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="flex flex-col"
        >

          <h1 className="text-3xl font-bold text-white tracking-tight">

            Tax
            <span className="text-blue-500">
              60
            </span>
            Sec

          </h1>

          <span className="text-xs text-gray-400 tracking-[0.2em] uppercase">

            Tax | Finance | Growth

          </span>

        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-gray-300">

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

        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-4">

          <a
            href="https://wa.me/917013734079"
            target="_blank"
            className="border border-white/10 hover:border-white/30 text-white px-5 py-3 rounded-xl transition bg-white/5 hover:bg-white/10"
          >

            WhatsApp

          </a>

          <Link
            href="/contact"
            className="bg-blue-600 hover:bg-blue-500 transition text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20"
          >

            Book Consultation

          </Link>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white"
        >

          {
            isOpen
              ? <X size={30} />
              : <Menu size={30} />
          }

        </button>

      </div>

      {/* MOBILE MENU */}
      {
        isOpen && (

          <div className="lg:hidden bg-[#020817] border-t border-white/10">

            <div className="px-6 py-8 flex flex-col gap-6 text-gray-300 font-medium">

              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-400 transition"
              >
                Home
              </Link>

              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-400 transition"
              >
                Services
              </Link>

              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-400 transition"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-400 transition"
              >
                Contact
              </Link>

              <a
                href="https://wa.me/917013734079"
                target="_blank"
                className="bg-green-600 hover:bg-green-500 transition text-white px-5 py-3 rounded-xl text-center"
              >

                Chat on WhatsApp

              </a>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 hover:bg-blue-500 transition text-white px-5 py-3 rounded-xl text-center"
              >

                Book Consultation

              </Link>

            </div>

          </div>

        )
      }

    </header>

  );
}