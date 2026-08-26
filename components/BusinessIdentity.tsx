import { Building2, Mail, Phone } from "lucide-react";
import { businessInfo } from "@/lib/business-info";

export default function BusinessIdentity() {
  const details = [
    businessInfo.legalName && { label: "Legal business name", value: businessInfo.legalName },
    businessInfo.registeredOffice && { label: "Registered office", value: businessInfo.registeredOffice },
    businessInfo.registrationLabel && businessInfo.registrationNumber && { label: businessInfo.registrationLabel, value: businessInfo.registrationNumber },
  ].filter(Boolean) as { label: string; value: string }[];

  return <section className="card-dark p-5" aria-label="Business information">
    <div className="flex items-center gap-2"><Building2 size={18} className="text-emerald-400" /><h2 className="font-bold text-white">Business information</h2></div>
    {details.length > 0 ? <dl className="mt-4 space-y-3 text-sm">{details.map((item) => <div key={item.label}><dt className="text-secondary">{item.label}</dt><dd className="mt-0.5 text-slate-200">{item.value}</dd></div>)}</dl> : <p className="mt-3 text-sm leading-6 text-secondary">Verified legal business details will be published here once the owner has approved them for public display.</p>}
    <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 text-sm text-secondary sm:flex-row sm:gap-5">
      <a className="flex items-center gap-2 hover:text-white" href={`mailto:${businessInfo.supportEmail}`}><Mail size={14} />{businessInfo.supportEmail}</a>
      <a className="flex items-center gap-2 hover:text-white" href={`tel:${businessInfo.supportPhone.replace(/\s/g, "")}`}><Phone size={14} />{businessInfo.supportPhone}</a>
    </div>
  </section>;
}

