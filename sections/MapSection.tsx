"use client";

import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function MapSection() {

  return (

    <section className="relative py-32 bg-white overflow-hidden">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-100 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-indigo-100 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="uppercase tracking-[0.3em] text-sm text-blue-600 font-semibold">

            Visit Us

          </p>

          <h2 className="mt-5 text-5xl font-bold text-gray-900 leading-tight">

            Let’s Connect &
            <span className="text-blue-600">
              {" "}Grow Together
            </span>

          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">

            Reach out for consultation, taxation,
            compliance, startup registration,
            and financial growth support.

          </p>

        </div>

        {/* CONTENT */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-8">

            {/* PHONE */}
            <div className="bg-white border border-gray-200 rounded-[28px] p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">

                  <Phone
                    className="text-blue-600"
                    size={28}
                  />

                </div>

                <div>

                  <p className="text-gray-500">
                    Phone Number
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-1">

                    +91 7013734079

                  </h3>

                </div>

              </div>

            </div>

            {/* EMAIL */}
            <div className="bg-white border border-gray-200 rounded-[28px] p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">

                  <Mail
                    className="text-blue-600"
                    size={28}
                  />

                </div>

                <div>

                  <p className="text-gray-500">
                    Email Address
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-1 break-all">

                    compliance@taxin60sec.com

                  </h3>

                </div>

              </div>

            </div>

            {/* LOCATION */}
            <div className="bg-white border border-gray-200 rounded-[28px] p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">

                  <MapPin
                    className="text-blue-600"
                    size={28}
                  />

                </div>

                <div>

                  <p className="text-gray-500">
                    Availability
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-1">

                    Online Consultation Across India

                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT MAP */}
          <div className="rounded-[36px] overflow-hidden shadow-2xl border border-gray-200 h-[550px]">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d289.0476787380129!2d77.57696482946456!3d12.911159472607718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1500604f5e69%3A0xa1d4fcab8c3f715a!2stech%20bite%E2%80%99s%20cafe!5e0!3m2!1sen!2sin!4v1778999692340!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

        </div>

      </div>

    </section>

  );
}