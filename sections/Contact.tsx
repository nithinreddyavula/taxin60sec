"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContactService } from "@/services/contact-service";

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
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

 const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setLoading(true);

  try {
    await ContactService.create(form);

    // Send Email
    await emailjs.send(
      "service_ac55cc6",
      "template_0oql9a6",
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      },
      "N1xUsD8z_7K1Ia69l"
    );

    alert("Message Sent Successfully!");

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

  } catch (error: unknown) {
    alert(
      (error as { text?: string; message?: string })?.text ||
      (error as { text?: string; message?: string })?.message ||
      "Failed to send message"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <section id="contact" className="section-space">
      <div className="container-main">
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_0.8fr]">

          <div>
            <p className="eyebrow">Contact Us</p>

            <h2 className="section-title mt-3">
              Let&apos;s Build Your{" "}
              <span className="text-emerald-600">
                Business Smarter
              </span>
            </h2>

            <p className="section-copy mt-4 max-w-2xl">
              Get expert help with taxation, compliance,
              business setup, financial reporting,
              and growth strategy.
            </p>

            <div className="mt-6 grid gap-3">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                      <Icon className="h-5 w-5 text-emerald-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                        {item.label}
                      </p>

                      <h3 className="mt-1 break-words text-lg font-semibold text-slate-900">
                        {item.value}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-dark w-full p-5 md:p-6">

            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              Book Free Consultation
            </h3>

            <p className="mt-2 text-sm leading-6 text-secondary">
              Fill out the form and our team will
              contact you shortly.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-5 space-y-3"
            >

              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="input-dark h-11 px-3.5"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="input-dark h-11 px-3.5"
                required
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="input-dark h-11 px-3.5"
                required
              />

              <textarea
                rows={4}
                placeholder="Tell us about your requirements"
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                className="input-dark min-h-28 resize-none px-3.5 py-3"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading
                  ? "Sending..."
                  : "Book Consultation"}
              </button>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
}