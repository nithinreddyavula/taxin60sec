import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">

      <div className="container-main py-14">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>

            <h2 className="text-3xl font-bold mb-4">
              Tax<span className="text-blue-500">60</span>Sec
            </h2>

            <p className="text-secondary leading-8">
              Helping businesses stay compliant,
              save taxes and grow with confidence.
            </p>

          </div>

          {/* LINKS */}
          <div>

            <h4 className="font-semibold text-xl mb-5">
              Quick Links
            </h4>

            <div className="flex flex-col gap-4 text-secondary">

              <Link href="/">Home</Link>
              <Link href="/services">Services</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>

            </div>

          </div>

          {/* SERVICES */}
          <div>

            <h4 className="font-semibold text-xl mb-5">
              Services
            </h4>

            <div className="flex flex-col gap-4 text-secondary">

              <p>GST Filing</p>
              <p>Income Tax</p>
              <p>Virtual CFO</p>
              <p>Startup Services</p>

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h4 className="font-semibold text-xl mb-5">
              Contact
            </h4>

            <div className="space-y-4 text-secondary">

              <p>compliance@tax60sec.com</p>

              <p>+91 7013734079</p>

              <p>India</p>

            </div>

          </div>

        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center text-secondary">
          © 2026 Tax60Sec. All rights reserved.
        </div>

      </div>

    </footer>
  );
}