import Link from "next/link";
import {
  Calculator,
  FileText,
  Building2,
  Briefcase,
  ShieldCheck,
  Landmark,
  Globe,
} from "lucide-react";

export const services = [
  {
    id: 3,
    code: "GST_FILING",
    icon: Calculator,
    title: "GST Filing",
    desc: "GST Registration, Returns, Refunds, LUT & Compliance.",
    priceFrom: "₹999",
  },
  {
    id: 4,
    code: "INCOME_TAX",
    icon: FileText,
    title: "Income Tax",
    desc: "ITR Filing, Tax Planning, TDS & Assessment Support.",
    priceFrom: "₹499",
  },
  {
    id: 5,
    code: "STARTUP_SERVICES",
    icon: Building2,
    title: "Startup Services",
    desc: "Company Registration, ROC Compliance & Fundraising.",
    priceFrom: "₹4,999",
  },
  {
    id: 6,
    code: "VIRTUAL_CFO",
    icon: Briefcase,
    title: "Virtual CFO",
    desc: "Financial Reporting, Cash Flow Management & Advisory.",
    priceFrom: "₹15,000",
  },
  {
    id: 7,
    code: "AUDIT_ASSURANCE",
    icon: ShieldCheck,
    title: "Audit & Assurance",
    desc: "Statutory Audit, Internal Audit & Due Diligence.",
    priceFrom: "₹10,000",
  },
  {
    id: 8,
    code: "FINANCE_AUTOMATION",
    icon: Landmark,
    title: "Finance Automation",
    desc: "Automate Workflows, Build Dashboards & Save Time.",
    priceFrom: "₹20,000",
  },
  {
    id: null,
    code: "NRI_TAXATION",
    icon: Globe,
    title: "NRI Taxation & Advisory",
    desc: "Indian tax filing, DTAA benefits, NRE/NRO guidance & fund repatriation for NRIs.",
    priceFrom: "₹4,999",
    priceFromUsd: "$60",
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
                key={service.code}
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

                <p className="mt-3 text-sm font-semibold text-blue-400">
                  Starting {service.priceFrom}
                  {service.priceFromUsd
                    ? ` (approx. ${service.priceFromUsd})`
                    : ""}
                </p>

                <Link
                  href={service.id ? `/intake?id=${service.id}` : "/intake"}
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