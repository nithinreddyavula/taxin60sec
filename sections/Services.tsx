"use client";

import Link from "next/link";

import {
  Briefcase,
  Building2,
  Calculator,
  FileCheck,
  Landmark,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    title: "GST & Indirect Tax",
    description:
      "GST Registration, Returns, Notices, Refunds, LUT, Compliance",
    icon: Calculator,
  },
  {
    title: "Direct Taxation",
    description:
      "ITR Filing, Tax Planning, Assessment Support, TDS Compliance",
    icon: Landmark,
  },
  {
    title: "Virtual CFO",
    description:
      "MIS, Cash Flow, Budgeting, Financial Analysis, Advisory",
    icon: Briefcase,
  },
  {
    title: "Startup Services",
    description:
      "Company Registration, Compliance, Fundraising Support",
    icon: Building2,
  },
  {
    title: "Audit & Assurance",
    description:
      "Statutory Audit, Internal Audit, Due Diligence",
    icon: ShieldCheck,
  },
  {
    title: "Finance Automation",
    description:
      "Dashboard Setup, Process Automation, AI Solutions",
    icon: FileCheck,
  },
];

export default function Services() {

  return (

    <section className="relative overflow-hidden bg-[#020817] py-24 text-white">

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-blue-600/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-indigo-600/10 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center">

          <p className="text-blue-400 uppercase tracking-[0.35em] text-sm font-semibold">

            What We Do

          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold">

            Complete Finance & Tax Solutions

          </h2>

          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-8">

            Everything your business needs under one roof —
            from taxation and compliance to automation and growth strategy.

          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">

          {
            services.map((service, i) => {

              const Icon = service.icon;

              return (

                <Link
                  href="/services"
                  key={i}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-blue-500/40 hover:bg-white/[0.07] transition-all duration-300 block"
                >

                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">

                    <Icon
                      size={28}
                      className="text-blue-400"
                    />

                  </div>

                  <h3 className="mt-6 text-2xl font-bold">

                    {service.title}

                  </h3>

                  <p className="mt-4 text-gray-400 leading-8">

                    {service.description}

                  </p>

                  <span className="mt-6 inline-block text-blue-400 font-semibold hover:text-blue-300 transition">

                    Know More →

                  </span>

                </Link>

              );

            })
          }

        </div>

      </div>

    </section>

  );

}