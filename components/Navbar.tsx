"use client";

import Link from "next/link";
import { ChevronDown, Menu, Phone, ShieldCheck, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useAppSession } from "./AppProviders";

const navLinks: { href: string; label: string; hasMenu?: boolean }[] = [
  { href: "/services", label: "Services", hasMenu: true },
  { href: "/health-check", label: "Solutions", hasMenu: true },
  { href: "/about", label: "Why Tax60" },
  { href: "/contact", label: "Resources", hasMenu: true },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSession();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020817]/90 backdrop-blur-xl">
      <div className="container-main">
        <div className="flex min-h-16 items-center justify-between gap-4 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-500/10">
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>

            <div className="min-w-0">
              <span className="block text-xl font-bold leading-tight tracking-tight text-white">
                Tax60
              </span>
              <span className="hidden whitespace-nowrap text-[10px] font-medium text-secondary sm:flex sm:items-center sm:gap-1">
                AI Powered. CA Verified. 100% Secure.
                <span className="text-emerald-400">&#10003;</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 transition hover:text-white"
              >
                {link.label}
                {link.hasMenu && <ChevronDown size={14} />}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+917013734079"
              className="flex items-center gap-2 rounded-xl border border-white/12 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
            >
              <Phone size={16} />
              Talk to Expert
            </a>

            {user ? (
              <Link href="/dashboard" className="btn-primary">
                Dashboard
              </Link>
            ) : (
              <Link href="/health-check" className="btn-primary">
                Get Started Free
              </Link>
            )}

            <Link
              href={user ? "/profile" : "/login"}
              aria-label={user ? "Open profile" : "Sign in"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 text-slate-200 transition hover:bg-white/5"
            >
              <UserRound size={18} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 text-slate-200 lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="pb-4 lg:hidden">
            <nav className="card-dark grid gap-1 p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="grid gap-2 border-t border-white/10 pt-2 sm:grid-cols-2">
                <a
                  href="tel:+917013734079"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/12 px-4 py-2.5 text-sm font-semibold text-slate-200"
                >
                  <Phone size={16} />
                  Talk to Expert
                </a>

                {user ? (
                  <Link
                    href="/dashboard"
                    className="btn-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/health-check"
                    className="btn-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started Free
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}