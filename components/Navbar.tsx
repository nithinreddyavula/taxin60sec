"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (

    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#020817]/80 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold shadow-xl shadow-blue-500/20">

              T

            </div>

            <div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white">

                Tax<span className="text-blue-500">60</span>Sec

              </h2>

              <p className="hidden sm:block text-[10px] tracking-[0.35em] text-gray-400 uppercase">

                Tax • Finance • Growth

              </p>

            </div>

          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10 text-white font-medium">

            <Link href="/" className="hover:text-blue-400 transition">

              Home

            </Link>

            <Link href="/services" className="hover:text-blue-400 transition">

              Services

            </Link>

            <Link href="/about" className="hover:text-blue-400 transition">

              About Us

            </Link>

            <Link href="/contact" className="hover:text-blue-400 transition">

              Contact

            </Link>

          </nav>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex items-center gap-4">

            <a
              href="https://wa.me/917013734079"
              target="_blank"
              className="px-6 py-3 rounded-2xl border border-white/10 text-white font-medium hover:bg-white/10 transition"
            >

              WhatsApp

            </a>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold shadow-xl shadow-blue-500/20"
            >

              Book Consultation

            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-white bg-white/5"
          >

            {
              open ? <X size={24} /> : <Menu size={24} />
            }

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {
        open && (

          <div className="md:hidden border-t border-white/10 bg-[#020817]/95 backdrop-blur-xl">

            <div className="px-6 py-6 flex flex-col gap-5 text-white font-medium">

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="hover:text-blue-400 transition"
              >

                Home

              </Link>

              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="hover:text-blue-400 transition"
              >

                Services

              </Link>

              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="hover:text-blue-400 transition"
              >

                About Us

              </Link>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="hover:text-blue-400 transition"
              >

                Contact

              </Link>

              {/* MOBILE BUTTONS */}
              <div className="flex flex-col gap-3 pt-4">

                <a
                  href="https://wa.me/917013734079"
                  target="_blank"
                  className="w-full text-center px-6 py-3 rounded-2xl border border-white/10 hover:bg-white/10 transition"
                >

                  WhatsApp

                </a>

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="w-full text-center px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition font-semibold"
                >

                  Book Consultation

                </Link>

              </div>

            </div>

          </div>

        )
      }

    </header>

  );

}