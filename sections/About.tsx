"use client";

import Link from "next/link";

import {
  ArrowRight,
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
      "Registration, Returns, Refunds, LUT & Complete GST Compliance",
    icon: Calculator,
  },
  {
    title: "Direct Taxation",
    description:
      "ITR Filing, TDS Compliance, Tax Planning & Assessments",
    icon: Landmark,
  },
  {
    title: "Virtual CFO",
    description:
      "Financial Reporting, Cash Flow & Business Advisory",
    icon: Briefcase,
  },
  {
    title: "Startup Services",
    description:
      "Company Registration, ROC Compliance & Fundraising Support",
    icon: Building2,
  },
  {
    title: "Audit & Assurance",
    description:
      "Internal Audit, Statutory Audit & Due Diligence",
    icon: ShieldCheck,
  },
  {
    title: "Finance Automation",
    description:
      "AI Dashboards, Workflow Automation & Smart Finance Systems",
    icon: FileCheck,
  },
];

export default function Services() {

  return (

    <section className="relative bg-[#020817] py-18 overflow-hidden">

      {/* GLOW */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-indigo-600/10 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* TOP */}
        <div className="max-w-3xl">

          <p className="text-blue-400 text-sm uppercase tracking-[0.35em] font-semibold">

            What We Do

          </p>

          <h2 className="mt-5 text-3xl lg:text-4xl sm:text-2xl lg:text-3xl lg:text-5xl font-bold text-white leading-tight">

            Modern Finance
            <br />
            Solutions For
            <span className="text-blue-500">
              {" "}Businesses
            </span>

          </h2>

          <p className="mt-8 text-base text-gray-400 leading-9 max-w-2xl">

            We help startups, founders and modern businesses
            simplify taxation, compliance and financial operations
            with expert consulting and automation.

          </p>

        </div>

        {/* GRID */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            services.map((service, i) => {

              const Icon = service.icon;

              return (

                <Link
                  href="/services"
                  key={i}
                  className="group relative overflow-hidden rounded-[32px] bg-[#0b1220] border border-white/5 p-5 hover:border-blue-500/30 transition-all duration-300"
                >

                  {/* HOVER GLOW */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">

                    <div className="absolute top-[-80px] right-[-80px] w-[180px] h-[180px] bg-blue-500/10 blur-[80px] rounded-full" />

                  </div>

                  {/* ICON */}
                  <div className="relative w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">

                    <Icon
                      size={30}
                      className="text-blue-400"
                    />

                  </div>

                  {/* CONTENT */}
                  <div className="relative">

                    <h3 className="mt-8 text-3xl font-bold text-white leading-tight">

                      {service.title}

                    </h3>

                    <p className="mt-5 text-gray-400 leading-8 text-base">

                      {service.description}

                    </p>

                    {/* CTA */}
                    <div className="mt-8 flex items-center gap-3 text-blue-400 font-semibold group-hover:text-blue-300 transition">

                      Learn More

                      <ArrowRight size={18} />

                    </div>

                  </div>

                </Link>

              );

            })
          }

        </div>

      </div>

    </section>

  );

}