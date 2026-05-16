"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f8f7f4]/90 backdrop-blur-md border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}
        <h1 className="text-2xl font-bold tracking-wide">
          TaxIn60Sec
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-10 text-sm font-medium">

          <a href="#" className="hover:text-gray-500 transition">
            Home
          </a>

          <a href="#" className="hover:text-gray-500 transition">
            About
          </a>

          <a href="#" className="hover:text-gray-500 transition">
            Services
          </a>

          <a href="#" className="hover:text-gray-500 transition">
            Team
          </a>

          <a href="#" className="hover:text-gray-500 transition">
            Contact
          </a>

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

          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Team</a>
          <a href="#">Contact</a>

        </div>
      )}

    </nav>
  );
}