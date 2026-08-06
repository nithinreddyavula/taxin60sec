"use client";

import Link from "next/link";
import { ChevronDown, Menu, ShieldCheck, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useAppSession } from "./AppProviders";

const servicesMenu = [
  { href: "/services", label: "ITR Filing" },
  { href: "/services", label: "GST Compliance" },
  { href: "/services", label: "Company Services" },
  { href: "/services", label: "TDS Services" },
  { href: "/services", label: "NRI Taxation" },
];

const supportMenu = [
  { href: "/contact", label: "Contact Us" },
  { href: "/cases", label: "Track Case" },
  { href: "/notices", label: "Notices" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<"services" | "support" | null>(null);
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
                AI Powered. CA Verified.
                <span className="text-emerald-400">&#10003;</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 lg:flex">
            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDesktopMenu("services")}
              onMouseLeave={() => setOpenDesktopMenu(null)}
            >
              <Link href="/services" className="flex items-center gap-1 transition hover:text-white">
                Services <ChevronDown size={14} />
              </Link>
              {openDesktopMenu === "services" && (
                <div className="absolute left-0 top-full pt-3">
                  <div className="card-dark w-56 p-2">
                    {servicesMenu.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/services" className="transition hover:text-white">
              Pricing
            </Link>

            <Link href="/cases" className="transition hover:text-white">
              Track Case
            </Link>

            {/* Support dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDesktopMenu("support")}
              onMouseLeave={() => setOpenDesktopMenu(null)}
            >
              <Link href="/contact" className="flex items-center gap-1 transition hover:text-white">
                Support <ChevronDown size={14} />
              </Link>
              {openDesktopMenu === "support" && (
                <div className="absolute left-0 top-full pt-3">
                  <div className="card-dark w-52 p-2">
                    {supportMenu.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {!user && (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl border border-white/12 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
              >
                Login
              </Link>
            )}

            {user ? (
              <Link href="/dashboard" className="btn-primary">
                Dashboard
              </Link>
            ) : (
              <Link href="/health-check" className="btn-primary">
                Check Tax Health Free
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
              <Link href="/services" className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/5" onClick={() => setIsOpen(false)}>
                Services
              </Link>
              <Link href="/services" className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/5" onClick={() => setIsOpen(false)}>
                Pricing
              </Link>
              <Link href="/cases" className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/5" onClick={() => setIsOpen(false)}>
                Track Case
              </Link>
              <Link href="/contact" className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/5" onClick={() => setIsOpen(false)}>
                Support
              </Link>

              <div className="grid gap-2 border-t border-white/10 pt-2 sm:grid-cols-2">
                {!user && (
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/12 px-4 py-2.5 text-sm font-semibold text-slate-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )}

                {user ? (
                  <Link href="/dashboard" className="btn-primary" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                ) : (
                  <Link href="/health-check" className="btn-primary" onClick={() => setIsOpen(false)}>
                    Check Tax Health Free
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