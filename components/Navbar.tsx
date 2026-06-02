"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#020817]/90 backdrop-blur-xl">

      <div className="container-main">

        <div className="h-24 flex items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-4"
          >

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/30">
              T
            </div>

            <div>

              <h2 className="text-4xl font-bold leading-none">
                Tax<span className="text-blue-500">60</span>Sec
              </h2>

              <p className="text-secondary tracking-[0.35em] text-sm mt-1">
                TAX | FINANCE | GROWTH
              </p>

            </div>

          </Link>

          {/* NAV */}
          <nav className="hidden lg:flex items-center gap-12 font-medium">

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

          {/* MOBILE MENU */}
          <button className="lg:hidden">
            <Menu size={34} />
          </button>

        </div>

      </div>

    </header>
  );
}