import Link from "next/link";
import {
  Calculator,
  FileText,
  Building2,
  Briefcase,
  ShieldCheck,
  Landmark,
} from "lucide-react";

export const services = [
  {
    id: 3,
    code: "GST_FILING",
    icon: Calculator,
    title: "GST Filing",
    desc: "GST Registration, Returns, Refunds, LUT & Compliance.",
  },
  {
    id: 4,
    code: "INCOME_TAX",
    icon: FileText,
    title: "Income Tax",
    desc: "ITR Filing, Tax Planning, TDS & Assessment Support.",
  },
  {
    id: 5,
    code: "STARTUP_SERVICES",
    icon: Building2,
    title: "Startup Services",
    desc: "Company Registration, ROC Compliance & Fundraising.",
  },
  {
    id: 6,
    code: "VIRTUAL_CFO",
    icon: Briefcase,
    title: "Virtual CFO",
    desc: "Financial Reporting, Cash Flow Management & Advisory.",
  },
  {
    id: 7,
    code: "AUDIT_ASSURANCE",
    icon: ShieldCheck,
    title: "Audit & Assurance",
    desc: "Statutory Audit, Internal Audit & Due Diligence.",
  },
  {
    id: 6,
    code: "FINANCE_AUTOMATION",
    icon: Landmark,
    title: "Finance Automation",
    desc: "Automate Workflows, Build Dashboards & Save Time.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-space">
      <div className="container-main">
        <p className="eyebrow">Tax60 Services</p>

        <h2 className="section-title mt-3">
          Choose a service to get started
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.id}
                className="card-dark p-6"
              >
                <Icon
                  className="text-blue-400"
                  size={28}
                />

                <h3 className="mt-5 text-xl font-bold">
                  {service.title}
                </h3>

                <p className="mt-2 text-secondary">
                  {service.desc}
                </p>

                <Link
                  href={`/intake?id=${service.id}`}
                  className="btn-primary mt-5 block w-full text-center"
                >
                  Get Started
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}