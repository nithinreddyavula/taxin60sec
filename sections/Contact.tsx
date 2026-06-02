"use client";

import { Phone, Mail, MapPin } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    label: "Phone Number",
    value: "+91 7013734079",
  },
  {
    icon: Mail,
    label: "Email Address",
    value: "compliance@taxin60sec.com",
  },
  {
    icon: MapPin,
    label: "Availability",
    value: "Online Consultation Across India",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-space">
      <div className="container-main">
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_0.8fr]">
          <div>
            <p className="eyebrow">Contact Us</p>
            <h2 className="section-title mt-3">
              Let&apos;s Build Your{" "}
              <span className="text-blue-400">Business Smarter</span>
            </h2>
            <p className="section-copy mt-4 max-w-2xl">
              Get expert help with taxation, compliance, business setup,
              financial reporting, and growth strategy.
            </p>

            <div className="mt-6 grid gap-3">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/15 bg-blue-500/10">
                      <Icon className="h-5 w-5 text-blue-300" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                        {item.label}
                      </p>
                      <h3 className="mt-1 break-words text-lg font-semibold">
                        {item.value}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-dark w-full p-5 md:p-6">
            <h3 className="text-2xl font-bold tracking-tight">
              Book Free Consultation
            </h3>
            <p className="mt-2 text-sm leading-6 text-secondary">
              Fill out the form and our team will contact you shortly.
            </p>

            <form className="mt-5 space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="input-dark h-11 px-3.5"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input-dark h-11 px-3.5"
              />
              <textarea
                rows={4}
                placeholder="Tell us about your requirements"
                className="input-dark min-h-28 resize-none px-3.5 py-3"
              />
              <button type="submit" className="btn-primary w-full">
                Book Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
