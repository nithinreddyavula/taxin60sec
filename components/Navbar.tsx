"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (

    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#020817]/90 backdrop-blur-xl">

      <div className="container-main">

        <div className="h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-500/30">

              T

            </div>

            <div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">

                Tax<span className="text-blue-500">60</span>Sec

              </h2>

              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-gray-400">

                Tax | Finance | Growth

              </p>

            </div>

          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-10 text-sm font-medium">

            <Link href="/">Home</Link>

            <Link href="/services">Services</Link>

            <Link href="/about">About Us</Link>

            <Link href="/contact">Contact</Link>

          </nav>

          {/* BUTTONS */}
          <div className="hidden lg:flex items-center gap-4">

            <a
              href="https://wa.me/917013734079"
              target="_blank"
              className="btn-secondary"
            >

              Chat on WhatsApp

            </a>

            <Link
              href="/contact"
              className="btn-primary"
            >

              Book Consultation →

            </Link>

          </div>

          {/* MOBILE */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden"
          >

            {
              open
                ? <X size={28} />
                : <Menu size={28} />
            }

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {
        open && (

          <div className="lg:hidden border-t border-white/5 bg-[#020817]">

            <div className="container-main py-6 flex flex-col gap-6">

              <Link href="/">Home</Link>

              <Link href="/services">Services</Link>

              <Link href="/about">About</Link>

              <Link href="/contact">Contact</Link>

            </div>

          </div>

        )
      }

    </header>

  );

}