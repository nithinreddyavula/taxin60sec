import { Lock, ShieldCheck, FileCheck, CreditCard } from "lucide-react";

const badges = [
  { icon: Lock, label: "256-bit SSL Encrypted" },
  { icon: ShieldCheck, label: "ISO 27001 Certified Infra" },
  { icon: CreditCard, label: "Razorpay Verified Payments" },
  { icon: FileCheck, label: "CA-Reviewed Filings" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-slate-100 bg-white/70 py-6">
      <div className="container-main">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <Icon size={16} className="text-emerald-600" />
                {b.label}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}