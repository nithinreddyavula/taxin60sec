"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020817]/90 backdrop-blur-xl">
      <div className="container-main">
        <div className="flex min-h-16 items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-lg font-bold shadow-lg shadow-blue-500/20">
              T
            </div>

            <div className="min-w-0">
              <h2 className="text-xl font-bold leading-none tracking-tight sm:text-2xl">
                Tax<span className="text-blue-500">60</span>Sec
              </h2>
              <p className="mt-1 hidden text-[0.62rem] font-semibold tracking-[0.22em] text-secondary sm:block">
                TAX | FINANCE | GROWTH
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-300 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="https://wa.me/917013734079"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Chat on WhatsApp
            </a>
            <Link href="/intake" className="btn-primary">
              Start your case
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="pb-4 lg:hidden">
            <nav className="card-dark grid gap-1 p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="grid gap-2 border-t border-white/10 pt-2 sm:grid-cols-2">
                <a
                  href="https://wa.me/917013734079"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  WhatsApp
                </a>
                <Link
                  href="/intake"
                  className="btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Start your case
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
