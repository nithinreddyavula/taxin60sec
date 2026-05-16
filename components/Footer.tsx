import Link from "next/link";

export default function Footer() {

  return (
    <footer className="bg-black text-white py-20 mt-24">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>

          <h2 className="text-3xl font-bold">
            TaxIn60Sec
          </h2>

          <p className="text-gray-400 mt-6 leading-relaxed">
            Professional taxation, GST, audit, and compliance
            services for startups, businesses, and individuals.
          </p>

        </div>

        {/* QUICK LINKS */}
        <div>

          <h3 className="text-xl font-semibold mb-6">
            Quick Links
          </h3>

          <div className="flex flex-col gap-4 text-gray-400">

            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>

          </div>

        </div>

        {/* SERVICES */}
        <div>

          <h3 className="text-xl font-semibold mb-6">
            Services
          </h3>

          <div className="flex flex-col gap-4 text-gray-400">

            <p>GST Filing</p>
            <p>Income Tax Filing</p>
            <p>Audit Services</p>
            <p>Startup Registration</p>

          </div>

        </div>

        {/* CONTACT */}
        <div>

          <h3 className="text-xl font-semibold mb-6">
            Contact
          </h3>

          <div className="flex flex-col gap-4 text-gray-400">

            <p>taxin60sec@gmail.com</p>
            <p>+91 9876543210</p>
            <p>Bangalore, India</p>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500">

        © 2026 TaxIn60Sec. All rights reserved.

      </div>

    </footer>
  );
}