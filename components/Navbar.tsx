"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (

    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#020817]/90 backdrop-blur-lg">

      <div className="container-main">

        <div className="h-16 flex items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg">

              T

            </div>

            <div>

              <h2 className="text-2xl font-bold">

                Tax<span className="text-blue-500">60</span>Sec

              </h2>

              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">

                Tax | Finance | Growth

              </p>

            </div>

          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

            <Link href="/">Home</Link>

            <Link href="/services">Services</Link>

            <Link href="/about">About</Link>

            <Link href="/contact">Contact</Link>

          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">

            <a
              href="https://wa.me/917013734079"
              target="_blank"
              className="btn-secondary text-sm"
            >

              WhatsApp

            </a>

            <Link
              href="/contact"
              className="btn-primary text-sm"
            >

              Book Consultation

            </Link>

          </div>

          {/* MOBILE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
          >

            {
              open
                ? <X size={24} />
                : <Menu size={24} />
            }

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {
        open && (

          <div className="md:hidden border-t border-white/5 bg-[#020817]">

            <div className="container-main py-6 flex flex-col gap-5">

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