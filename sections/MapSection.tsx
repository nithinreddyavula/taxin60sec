"use client";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function MapSection() {

  return (

    <section className="relative py-32 bg-[#020817] overflow-hidden">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="uppercase tracking-[0.3em] text-sm text-blue-400 font-semibold">

            Visit Us

          </p>

          <h2 className="mt-5 text-5xl font-bold text-white leading-tight">

            Let’s Connect &
            <span className="text-blue-500">
              {" "}Grow Together
            </span>

          </h2>

          <p className="mt-6 text-lg text-gray-300 leading-8">

            Reach out for taxation,
            compliance, startup registration,
            audits, and business growth support.

          </p>

        </div>

        {/* CONTENT */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-8">

            {/* PHONE */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-8">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">

                  <Phone
                    className="text-blue-400"
                    size={28}
                  />

                </div>

                <div>

                  <p className="text-gray-400">
                    Phone Number
                  </p>

                  <h3 className="text-2xl font-bold text-white mt-1">

                    +91 7013734079

                  </h3>

                </div>

              </div>

            </div>

            {/* EMAIL */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-8">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">

                  <Mail
                    className="text-blue-400"
                    size={28}
                  />

                </div>

                <div>

                  <p className="text-gray-400">
                    Email Address
                  </p>

                  <h3 className="text-xl font-bold text-white mt-1 break-all">

                    compliance@taxin60sec.com

                  </h3>

                </div>

              </div>

            </div>

            {/* LOCATION */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-8">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">

                  <MapPin
                    className="text-blue-400"
                    size={28}
                  />

                </div>

                <div>

                  <p className="text-gray-400">
                    Availability
                  </p>

                  <h3 className="text-2xl font-bold text-white mt-1">

                    Online Consultation Across India

                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* MAP */}
          <div className="rounded-[36px] overflow-hidden border border-white/10 h-[550px] shadow-2xl shadow-blue-500/10">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.033640134168!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9e0f4d7%3A0xf9f1a5cdd8c4a3ef!2sBangalore!5e0!3m2!1sen!2sin!4v1715946374000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

        </div>

      </div>

    </section>

  );
}