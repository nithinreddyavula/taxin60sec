"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAppSession } from "./AppProviders";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/health-check", label: "Free Tax Health Check" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSession();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#f7faf9]/90 backdrop-blur-xl">
      <div className="container-main">
        <div className="flex min-h-16 items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-lg font-bold shadow-lg shadow-emerald-500/20">
              T
            </div>

            <div className="min-w-0">
              <h2 className="text-xl font-bold leading-none tracking-tight sm:text-2xl">
                Tax<span className="text-emerald-500">60</span>Sec
              </h2>
              <p className="mt-1 hidden text-[0.62rem] font-semibold tracking-[0.22em] text-secondary sm:block">
                TAX | FINANCE | GROWTH
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <Link href="/dashboard" className="btn-secondary">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="btn-secondary">
                Log in
              </Link>
            )}
            <Link href="/health-check" className="btn-primary">
              Get Started Free
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/[0.03] text-slate-900 lg:hidden"
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
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="grid gap-2 border-t border-slate-200 pt-2 sm:grid-cols-2">
                {user ? (
                  <Link
                    href="/dashboard"
                    className="btn-secondary"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="btn-secondary"
                    onClick={() => setIsOpen(false)}
                  >
                    Log in
                  </Link>
                )}
                <Link
                  href="/health-check"
                  className="btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started Free
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}