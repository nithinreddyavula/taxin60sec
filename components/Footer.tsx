export default function Footer() {
  return (
    <footer className="py-20 border-t border-gray-200">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>

            <h2 className="text-2xl font-bold">
              TaxIn60Sec
            </h2>

            <p className="mt-6 text-gray-600 leading-7">
              Modern taxation, audit, and compliance solutions
              for startups, businesses, and individuals.
            </p>

          </div>

          {/* SERVICES */}
          <div>

            <h3 className="font-semibold text-lg mb-6">
              Services
            </h3>

            <div className="space-y-4 text-gray-600">
              <p>Taxation</p>
              <p>GST Filing</p>
              <p>Audit & Assurance</p>
              <p>Compliance</p>
            </div>

          </div>

          {/* COMPANY */}
          <div>

            <h3 className="font-semibold text-lg mb-6">
              Company
            </h3>

            <div className="space-y-4 text-gray-600">
              <p>About</p>
              <p>Services</p>
              <p>Team</p>
              <p>Contact</p>
            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="font-semibold text-lg mb-6">
              Contact
            </h3>

            <div className="space-y-4 text-gray-600">
              <p>Bangalore, India</p>
              <p>contact@taxin60sec.com</p>
              <p>+91 8050976596</p>
            </div>

          </div>

        </div>

        <div className="border-t border-gray-200 mt-16 pt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-4">

          <p>
            © 2026 TaxIn60Sec. All rights reserved.
          </p>

          <p>
            Designed with precision.
          </p>

        </div>

      </div>

    </footer>
  );
}