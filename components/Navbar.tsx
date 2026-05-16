"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f8f7f4]/90 backdrop-blur-md border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide"
        >
          TaxIn60Sec
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-10 text-sm font-medium">

          <Link
            href="/"
            className="hover:text-gray-500 transition"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="hover:text-gray-500 transition"
          >
            About
          </Link>

          <Link
            href="/services"
            className="hover:text-gray-500 transition"
          >
            Services
          </Link>

          <Link
            href="/contact"
            className="hover:text-gray-500 transition"
          >
            Contact
          </Link>

        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-6 text-sm font-medium bg-[#f8f7f4]">

          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>

          <Link href="/services" onClick={() => setOpen(false)}>
            Services
          </Link>

          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>

        </div>
      )}

    </nav>
  );
}