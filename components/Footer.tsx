import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "GST Filing",
  "Income Tax",
  "Virtual CFO",
  "Startup Services",
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f7faf9]">
      <div className="container-main py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Tax<span className="text-blue-500">60</span>Sec
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-secondary">
              Helping businesses stay compliant, save taxes and grow with
              confidence.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">
              Quick Links
            </h4>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-secondary">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">
              Services
            </h4>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-secondary">
              {services.map((service) => (
                <p key={service}>{service}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">
              Contact
            </h4>
            <div className="mt-4 space-y-2.5 text-sm text-secondary">
              <p>compliance@taxin60sec.com</p>
              <p>+91 7013734079</p>
              <p>Online Consultation Across India</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 Tax60Sec. All rights reserved.</p>
          <p>Tax | Finance | Growth</p>
        </div>
      </div>
    </footer>
  );
}