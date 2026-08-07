import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin, Phone, ShieldCheck, Youtube } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/services", label: "Pricing" },
  { href: "/cases", label: "Track Case" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const services = [
  { href: "/services", label: "Income Tax Filing" },
  { href: "/services", label: "GST Compliance" },
  { href: "/services", label: "ROC Compliance" },
  { href: "/services", label: "Startup Registration" },
  { href: "/services", label: "Business Compliance" },
  { href: "/services", label: "Virtual CFO" },
];

const support = [
  { href: "/contact", label: "Help Center" },
  { href: "/contact", label: "Contact Support" },
  { href: "https://wa.me/917013734079", label: "WhatsApp Support" },
  { href: "/contact", label: "Privacy Policy" },
  { href: "/contact", label: "Terms & Conditions" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#020817]">
      <div className="container-main py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.9fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-500/10">
                <ShieldCheck size={18} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">Tax60</h2>
                <p className="text-[11px] text-secondary">AI Powered. CA Verified.</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-secondary">
              Your trusted partner for taxation, compliance, and business growth.
            </p>
            <div className="mt-4 flex items-center gap-2">

                href="https://wa.me/917013734079"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-secondary transition hover:bg-white/5 hover:text-white"
              >
                <Phone size={14} />
              </a>

                href="#"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-secondary transition hover:bg-white/5 hover:text-white"
              >
                <Linkedin size={14} />
              </a>

                href="#"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-secondary transition hover:bg-white/5 hover:text-white"
              >
                <Youtube size={14} />
              </a>

                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-secondary transition hover:bg-white/5 hover:text-white"
              >
                <Instagram size={14} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
              Quick Links
            </h4>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-secondary">
              {quickLinks.map((link) => (
                <Link key={link.label} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
              Our Services
            </h4>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-secondary">
              {services.map((service) => (
                <Link key={service.label} href={service.href} className="transition hover:text-white">
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
              Support
            </h4>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-secondary">
              {support.map((item) => (
                <a key={item.label} href={item.href} className="transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>

            <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
              Contact Us
            </h4>
            <div className="mt-4 space-y-2.5 text-sm text-secondary">
              <p className="flex items-center gap-2">
                <Phone size={13} /> +91 7013734079
              </p>
              <p className="flex items-center gap-2">
                <Mail size={13} /> compliance@taxin60sec.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={13} /> Online Consultation Across India
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Tax60Sec. All rights reserved.</p>
          <p>
            Made with <span className="text-rose-400">♥</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}