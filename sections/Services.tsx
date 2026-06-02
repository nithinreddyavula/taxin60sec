import {
  Briefcase,
  Calculator,
  ShieldCheck,
  Landmark,
  BarChart3,
  FileText,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "GST Filing",
    desc: "GST Registration, Returns, Refunds & Compliance.",
  },
  {
    icon: Calculator,
    title: "Income Tax",
    desc: "ITR Filing, Tax Planning & TDS Support.",
  },
  {
    icon: Landmark,
    title: "Startup Services",
    desc: "Company Registration & ROC Compliance.",
  },
  {
    icon: Briefcase,
    title: "Virtual CFO",
    desc: "Financial Reporting & Cash Flow Management.",
  },
  {
    icon: ShieldCheck,
    title: "Audit & Assurance",
    desc: "Internal Audit & Due Diligence.",
  },
  {
    icon: BarChart3,
    title: "Finance Automation",
    desc: "Build Dashboards & Automate Workflows.",
  },
];

export default function Services() {
  return (
    <section className="section-space overflow-hidden">
      <div className="container-main">

        <div className="text-center mb-14">

          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-4">
            Our Services
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Complete Finance & Tax Solutions
          </h2>

          <p className="text-secondary text-lg">
            Everything your business needs under one roof.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="card-dark p-6"
              >

                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-5">
                  <Icon className="text-blue-400 w-7 h-7" />
                </div>

                <h3 className="text-2xl font-semibold mb-3">
                  {service.title}
                </h3>

                <p className="text-secondary leading-7">
                  {service.desc}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}