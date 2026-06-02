import {
  Calculator,
  Briefcase,
  ShieldCheck,
  Landmark,
  Building2,
  FileText,
} from "lucide-react";

const services = [
  {
    icon: Calculator,
    title: "GST Filing",
    desc: "GST Registration, Returns, Refunds, LUT & Compliance.",
  },
  {
    icon: FileText,
    title: "Income Tax",
    desc: "ITR Filing, Tax Planning, TDS & Assessment Support.",
  },
  {
    icon: Building2,
    title: "Startup Services",
    desc: "Company Registration, ROC Compliance & Fundraising.",
  },
  {
    icon: Briefcase,
    title: "Virtual CFO",
    desc: "Financial Reporting, Cash Flow Management & Advisory.",
  },
  {
    icon: ShieldCheck,
    title: "Audit & Assurance",
    desc: "Statutory Audit, Internal Audit & Due Diligence.",
  },
  {
    icon: Landmark,
    title: "Finance Automation",
    desc: "Automate Workflows, Build Dashboards & Save Time.",
  },
];

export default function Services() {
  return (
    <section className="py-20">

      <div className="container-main">

        <div className="text-center mb-14">

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Services
          </h2>

          <p className="text-secondary text-lg">
            Complete finance and tax solutions under one roof.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="card-dark p-7 hover:-translate-y-1 transition"
              >

                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-5">

                  <Icon className="text-blue-500" size={28} />

                </div>

                <h3 className="text-2xl font-semibold mb-3">
                  {service.title}
                </h3>

                <p className="text-secondary leading-8">
                  {service.desc}
                </p>

                <button className="mt-5 text-blue-400 font-medium">
                  Learn More →
                </button>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}