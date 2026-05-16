"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    try {

      const response = await fetch(
        "https://taxin60sec-backend-production.up.railway.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      await emailjs.send(
        "service_h7uxsh6",
        "template_b2yeqtp",
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "jYU-j6IxwfjyPtkQw"
      );

      toast.success("Appointment Booked Successfully!");

      console.log(data);

      setForm({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {

      toast.error("Something went wrong!");

      console.error(error);

    }
  };

  return (
    <section className="py-32">

      <div className="max-w-4xl mx-auto px-6">

        <div className="bg-black text-white rounded-[40px] p-16">

          <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-6">
            Contact Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Talk To Our Experts
          </h2>

          <div className="mt-12 space-y-6">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-5 rounded-xl bg-white text-black outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-5 rounded-xl bg-white text-black outline-none"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full p-5 rounded-xl bg-white text-black outline-none"
            />

            <button
              onClick={handleSubmit}
              className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-200 transition"
            >
              Book Appointment
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}