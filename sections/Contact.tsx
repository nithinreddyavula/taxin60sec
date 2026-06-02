"use client";

import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Contact() {
  return (
    <section className="section-space overflow-hidden">
      <div className="container-main">

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center">

            <p className="text-blue-400 uppercase tracking-[0.3em] text-sm font-medium mb-4">
              Contact Us
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Let’s Build Your{" "}
              <span className="text-blue-500">
                Business Smarter
              </span>
            </h2>

            <p className="text-secondary text-lg leading-8 max-w-xl mb-10">
              Get expert help with taxation, compliance,
              business setup, financial reporting, and
              growth strategy.
            </p>

            <div className="space-y-6">

              {/* PHONE */}
              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-blue-400 w-6 h-6" />
                </div>

                <div>
                  <p className="text-secondary mb-1">
                    Phone Number
                  </p>

                  <h3 className="text-2xl font-semibold">
                    +91 7013734079
                  </h3>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-blue-400 w-6 h-6" />
                </div>

                <div>
                  <p className="text-secondary mb-1">
                    Email Address
                  </p>

                  <h3 className="text-xl sm:text-2xl font-semibold break-words">
                    compliance@taxin60sec.com
                  </h3>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-blue-400 w-6 h-6" />
                </div>

                <div>
                  <p className="text-secondary mb-1">
                    Availability
                  </p>

                  <h3 className="text-xl sm:text-2xl font-semibold">
                    Online Consultation Across India
                  </h3>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="card-dark p-6 sm:p-8">

            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Book Free Consultation
            </h3>

            <p className="text-secondary mb-8 leading-7">
              Fill out the form and our team will
              contact you shortly.
            </p>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-[#0B1220]
                  border
                  border-white/10
                  px-5
                  text-white
                  outline-none
                  focus:border-blue-500
                "
              />

              <input
                type="email"
                placeholder="Your Email"
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-[#0B1220]
                  border
                  border-white/10
                  px-5
                  text-white
                  outline-none
                  focus:border-blue-500
                "
              />

              <textarea
                rows={5}
                placeholder="Tell us about your requirements"
                className="
                  w-full
                  rounded-2xl
                  bg-[#0B1220]
                  border
                  border-white/10
                  px-5
                  py-4
                  text-white
                  outline-none
                  resize-none
                  focus:border-blue-500
                "
              />

              <button
                className="
                  btn-primary
                  w-full
                  justify-center
                  h-14
                  text-lg
                "
              >
                Book Consultation
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}