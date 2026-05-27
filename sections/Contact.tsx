"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Contact() {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async () => {

    try {

      setLoading(true);

      await fetch(
        "https://taxin60sec-backend.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      await emailjs.send(
        "service_ouw63sj",
        "template_yd0879u",
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "lzNVEjLF6iMNz2tOP"
      );

      alert("Consultation Booked Successfully!");

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

      alert("Something went wrong!");

    }

  };

  return (

    <section className="relative py-32 bg-[#020817] overflow-hidden text-white">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <div>

          <p className="uppercase tracking-[0.3em] text-sm text-blue-400 font-semibold">

            Contact Us

          </p>

          <h2 className="mt-5 text-5xl font-bold leading-tight">

            Let’s Build Your
            <span className="text-blue-500">
              {" "}Business Smarter
            </span>

          </h2>

          <p className="mt-8 text-lg text-gray-300 leading-8">

            Get expert help with taxation, compliance,
            business setup, financial reporting,
            and growth strategy.

          </p>

          {/* CONTACT INFO */}
          <div className="mt-12 space-y-6">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">

                <Phone className="text-blue-400" />

              </div>

              <div>

                <p className="text-gray-400 text-sm">
                  Phone Number
                </p>

                <h4 className="text-xl font-semibold">
                  +91 7013734079
                </h4>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">

                <Mail className="text-blue-400" />

              </div>

              <div>

                <p className="text-gray-400 text-sm">
                  Email Address
                </p>

                <h4 className="text-xl font-semibold">
                  compliance@taxin60sec.com
                </h4>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">

                <MapPin className="text-blue-400" />

              </div>

              <div>

                <p className="text-gray-400 text-sm">
                  Availability
                </p>

                <h4 className="text-xl font-semibold">
                  Online Consultation Across India
                </h4>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[36px] p-8">

          <h3 className="text-3xl font-bold">

            Book Free Consultation

          </h3>

          <p className="mt-4 text-gray-400 leading-7">

            Fill out the form and our team will contact you shortly.

          </p>

          <div className="mt-10 space-y-6">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-white/10 focus:border-blue-500 outline-none rounded-2xl px-6 py-5"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-white/10 focus:border-blue-500 outline-none rounded-2xl px-6 py-5"
            />

            <textarea
              rows={5}
              name="message"
              placeholder="Tell us about your requirements"
              value={form.message}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-white/10 focus:border-blue-500 outline-none rounded-2xl px-6 py-5"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 transition rounded-2xl py-5 font-semibold text-lg shadow-2xl shadow-blue-500/20"
            >

              {
                loading
                  ? "Booking..."
                  : "Book Consultation"
              }

            </button>

          </div>

        </div>

      </div>

    </section>

  );
}