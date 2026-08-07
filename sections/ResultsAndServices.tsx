import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Landmark,
  LineChart,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type Recommendation = { label: string; value?: string; state: "check" | "review" };

const RECOMMENDATIONS: Recommendation[] = [
  { label: "File Income Tax", state: "check" },
  { label: "Claim HRA", state: "check" },
  { label: "Potential Tax Savings", value: "₹28,000", state: "check" },
  { label: "GST not required", state: "check" },
  { label: "Capital Gains detected", value: "Review", state: "review" },
];

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  price: string;
};

const POPULAR_SERVICES: Service[] = [
  { icon: FileText, title: "Income Tax Filing", desc: "ITR, Tax Planning, TDS & More", price: "₹999" },
  { icon: Landmark, title: "GST Compliance", desc: "Registration, Returns, GST Advisory", price: "₹1,499" },
  { icon: Building2, title: "Startup Registration", desc: "Private Limited, LLP, OPC Registration", price: "₹2,499" },
  { icon: ScrollText, title: "ROC Compliance", desc: "Annual Filings, ROC, Director KYC", price: "₹1,499" },
  { icon: ShieldCheck, title: "Business Compliance", desc: "PF, ESI, Licenses, Labor Compliance", price: "₹1,999" },
  { icon: LineChart, title: "Virtual CFO", desc: "Financial Reporting, Cash Flow & More", price: "₹4,999" },
];

export default function ResultsAndServices() {
  return (
    <section className="section-space">
      <div className="container-main">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          {/* See What You'll Get */}
          <div className="card-dark p-6">
            <h3 className="text-lg font-bold text-white">See What You&apos;ll Get</h3>

            <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-5">
              <div className="relative h-24 w-24 shrink-0">
                <p className="absolute -top-5 left-0 text-[10px] font-medium text-secondary">Your Result</p>
                <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={2 * Math.PI * 42 * (1 - 89 / 100)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    89
                    <span className="text-xs font-medium text-slate-500">/100</span>
                  </span>
                </div>
                <p className="mt-2 text-center text-[11px] font-semibold text-emerald-400">Excellent</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-secondary">Recommendations</p>
                <div className="mt-2 space-y-2">
                  {RECOMMENDATIONS.map((rec) => (
                    <div key={rec.label} className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-slate-300">{rec.label}</span>
                      {rec.state === "check" ? (
                        rec.value ? (
                          <span className="font-semibold text-white">{rec.value}</span>
                        ) : (
                          <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
                        )
                      ) : (
                        <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                          {rec.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[.03] p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <FileText size={16} className="text-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-secondary">Recommended Service</p>
                <p className="truncate text-sm font-bold text-white">Income Tax Filing</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[10px] text-secondary">Estimated Cost</p>
                <p className="text-sm font-bold text-white">₹999</p>
              </div>
              <div className="hidden shrink-0 text-right sm:block">
                <p className="flex items-center justify-end gap-1 text-[10px] text-secondary">
                  <Clock size={10} /> Estimated Time
                </p>
                <p className="text-sm font-bold text-white">24 Hours</p>
              </div>
            </div>
          </div>

          {/* Popular Services */}
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Popular Services</h3>
                <p className="mt-1 text-sm text-secondary">Explore our most availed services</p>
              </div>
              <Link href="/services" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300 sm:flex">
                View All Services
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {POPULAR_SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.title}
                    href="/services"
                    className="card-dark group flex flex-col p-4 transition hover:-translate-y-0.5 hover:border-emerald-400/30"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                      <Icon size={18} className="text-emerald-400" />
                    </div>
                    <h4 className="mt-3 text-sm font-bold text-white">{service.title}</h4>
                    <p className="mt-1 text-xs leading-5 text-secondary">{service.desc}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-400">From {service.price}</span>
                      <ArrowRight size={14} className="text-secondary transition group-hover:translate-x-0.5 group-hover:text-emerald-400" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}