import {
  Calculator,
  FileText,
  Building2,
  Briefcase,
  ShieldCheck,
  Landmark,
} from "lucide-react";

const whatsappNumber = "917013734079";

export const services = [
  {
    code: "GST_FILING",
    icon: Calculator,
    title: "GST Filing",
    desc: "GST Registration, Returns, Refunds, LUT & Compliance.",
  },
  {
    code: "INCOME_TAX",
    icon: FileText,
    title: "Income Tax",
    desc: "ITR Filing, Tax Planning, TDS & Assessment Support.",
  },
  {
    code: "STARTUP_SERVICES",
    icon: Building2,
    title: "Startup Services",
    desc: "Company Registration, ROC Compliance & Fundraising.",
  },
  {
    code: "VIRTUAL_CFO",
    icon: Briefcase,
    title: "Virtual CFO",
    desc: "Financial Reporting, Cash Flow Management & Advisory.",
  },
  {
    code: "AUDIT_ASSURANCE",
    icon: ShieldCheck,
    title: "Audit & Assurance",
    desc: "Statutory Audit, Internal Audit & Due Diligence.",
  },
  {
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
        <p className="eyebrow">Tax60 services</p>
        <h2 className="section-title mt-3">Choose a service. Continue on WhatsApp.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            const text = encodeURIComponent(`Hello Tax60, I would like help with ${service.title}. Service code: ${service.code}`);
            return <article key={service.code} className="card-dark p-6"><Icon className="text-blue-400" size={28} /><h3 className="mt-5 text-xl font-bold">{service.title}</h3><p className="mt-2 text-secondary">{service.desc}</p><a className="btn-primary mt-5 w-full" target="_blank" rel="noreferrer" href={`https://wa.me/${whatsappNumber}?text=${text}`}>Continue on WhatsApp</a></article>;
          })}
        </div>
      </div>
    </section>
  );
}
