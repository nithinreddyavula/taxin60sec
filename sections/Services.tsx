"use client";

import {
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  Calculator,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: Calculator,
    title: "GST & Indirect Tax",
    desc: "GST Registration, Filing, Refunds, LUT, Compliance & Notices.",
  },
  {
    icon: BadgeDollarSign,
    title: "Direct Taxation",
    desc: "ITR Filing, Tax Planning, Assessment & TDS Compliance.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Virtual CFO",
    desc: "MIS Reports, Budgeting, Financial Analysis & Business Advisory.",
  },
  {
    icon: Building2,
    title: "Startup Services",
    desc: "Company Registration, Compliance & Fundraising Support.",
  },
  {
    icon: ShieldCheck,
    title: "Audit & Assurance",
    desc: "Internal Audit, Statutory Audit & Due Diligence Services.",
  },
  {
    icon: FileCheck2,
    title: "Finance Automation",
    desc: "Dashboards, Process Setup & Accounting Automation.",
  },
];

export default function Services() {

  return (

    <section className="relative py-28 bg-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-100 blur-[100px] rounded-full" />

        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-indigo-100 blur-[100px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TOP TEXT */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="text-blue-600 uppercase tracking-[0.25em] text-sm font-semibold">

            What We Do

          </p>

          <h2 className="mt-4 text-5xl font-bold text-gray-900 leading-tight">

            Complete Finance &
            <span className="text-blue-600">
              {" "}Tax Solutions
            </span>

          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">

            Everything your business needs under one roof —
            from compliance and taxation to growth strategy
            and financial automation.

          </p>

        </div>

        {/* SERVICES GRID */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            services.map((service, index) => {

              const Icon = service.icon;

              return (

                <div
                  key={index}
                  className="group relative bg-white border border-gray-200 hover:border-blue-500/30 rounded-[28px] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
                >

                  {/* GLOW */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition" />

                  {/* ICON */}
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">

                    <Icon
                      size={30}
                      className="text-blue-600"
                    />

                  </div>

                  {/* TITLE */}
                  <h3 className="mt-8 text-2xl font-bold text-gray-900">

                    {service.title}

                  </h3>

                  {/* DESC */}
                  <p className="mt-4 text-gray-600 leading-7">

                    {service.desc}

                  </p>

                  {/* BUTTON */}
                  <button className="mt-8 text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">

                    Know More →

                  </button>

                </div>

              );

            })
          }

        </div>

      </div>

    </section>

  );
}