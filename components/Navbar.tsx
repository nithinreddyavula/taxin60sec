"use client";

import Link from "next/link";
import { ChevronDown, Menu, ShieldCheck, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppSession } from "./AppProviders";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAppSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 pointer-events-none">
      <div 
        className={`mx-auto max-w-5xl transition-all duration-300 pointer-events-auto rounded-full border ${
          scrolled 
            ? "bg-[#020817]/80 backdrop-blur-md border-white/10 shadow-lg shadow-black/20" 
            : "bg-[#020817]/40 backdrop-blur-sm border-white/5"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setIsOpen(false)}
          >
            <ShieldCheck size={22} className="text-white group-hover:text-emerald-400 transition-colors" />
            <span className="text-lg font-bold tracking-tight text-white">
              Tax60
            </span>
          </Link>

          {/* Separator - Hidden on mobile */}
          <div className="hidden lg:block w-px h-5 bg-white/10 mx-2"></div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/services" className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/tools" className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors">
              Free Tools
            </Link>
            <Link href="/deadlines" className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors">
              Deadlines
            </Link>
            <Link href="/contact" className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Separator - Hidden on mobile */}
          <div className="hidden lg:block w-px h-5 bg-white/10 mx-2"></div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/health-check"
                  className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Try Health Check
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-[#E5D5C5] px-4 py-1.5 text-[13px] font-bold text-black hover:bg-white transition-colors ml-1"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="rounded-full bg-[#E5D5C5] px-4 py-1.5 text-[13px] font-bold text-black hover:bg-white transition-colors ml-1"
                >
                  Profile
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 hover:text-white hover:bg-white/5 lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mx-auto max-w-5xl mt-2 pointer-events-auto lg:hidden">
          <nav className="rounded-3xl border border-white/10 bg-[#020817]/95 backdrop-blur-xl p-4 flex flex-col gap-1 shadow-2xl">
            <Link href="/services" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5" onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link href="/tools" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5" onClick={() => setIsOpen(false)}>
              Free Tools
            </Link>
            <Link href="/deadlines" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5" onClick={() => setIsOpen(false)}>
              Deadlines
            </Link>
            <Link href="/contact" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5" onClick={() => setIsOpen(false)}>
              FAQ
            </Link>
            
            <div className="mt-2 pt-3 border-t border-white/10 flex flex-col gap-2">
              {!user ? (
                <>
                  <Link href="/login" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 text-center" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <Link href="/health-check" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 text-center" onClick={() => setIsOpen(false)}>
                    Try Health Check
                  </Link>
                  <Link href="/register" className="rounded-xl bg-[#E5D5C5] px-4 py-3 text-sm font-bold text-black text-center mt-1" onClick={() => setIsOpen(false)}>
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 text-center" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                  <Link href="/profile" className="rounded-xl bg-[#E5D5C5] px-4 py-3 text-sm font-bold text-black text-center mt-1" onClick={() => setIsOpen(false)}>
                    Profile
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
