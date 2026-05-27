import Link from "next/link";

import {
  Mail,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {

  return (

    <footer className="relative bg-[#020817] text-white overflow-hidden border-t border-white/10">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-150px] right-[-100px] w-[350px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-150px] left-[-100px] w-[350px] h-[350px] bg-indigo-600/10 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* BRAND */}
          <div>

            <h2 className="text-4xl font-bold">

              Tax
              <span className="text-blue-500">
                60
              </span>
              Sec

            </h2>

            <p className="mt-6 text-gray-400 leading-8">

              Smart taxation, finance, and compliance
              solutions for startups, businesses,
              creators, and professionals.

            </p>

            {/* SOCIALS */}
            <div className="mt-8 flex items-center gap-4">

              <a
                href="#"
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-blue-600 transition flex items-center justify-center"
              >

                <FaInstagram size={20} />

              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-blue-600 transition flex items-center justify-center"
              >

                <FaLinkedinIn size={20} />

              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-blue-600 transition flex items-center justify-center"
              >

                <FaFacebookF size={20} />

              </a>

            </div>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-2xl font-semibold">

              Quick Links

            </h3>

            <div className="mt-8 flex flex-col gap-5 text-gray-400">

              <Link
                href="/"
                className="hover:text-blue-400 transition"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="hover:text-blue-400 transition"
              >
                About Us
              </Link>

              <Link
                href="/services"
                className="hover:text-blue-400 transition"
              >
                Services
              </Link>

              <Link
                href="/contact"
                className="hover:text-blue-400 transition"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* SERVICES */}
          <div>

            <h3 className="text-2xl font-semibold">

              Services

            </h3>

            <div className="mt-8 flex flex-col gap-5 text-gray-400">

              <p>GST Filing</p>

              <p>Income Tax</p>

              <p>Virtual CFO</p>

              <p>Audit & Compliance</p>

              <p>Startup Registration</p>

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-2xl font-semibold">

              Contact

            </h3>

            <div className="mt-8 space-y-6">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">

                  <Phone
                    size={20}
                    className="text-blue-400"
                  />

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <p className="text-gray-300">
                    +91 7013734079
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">

                  <Mail
                    size={20}
                    className="text-blue-400"
                  />

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="text-gray-300 break-all">
                    compliance@taxin60sec.com
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5">

          <p className="text-gray-500 text-sm">

            © 2026 Tax60Sec. All rights reserved.

          </p>

          <p className="text-gray-500 text-sm">

            Built for modern businesses 🚀

          </p>

        </div>

      </div>

    </footer>

  );
}