import { FileCheck2, Globe2, ReceiptText, ShieldCheck, Star, UserCheck2 } from "lucide-react";

// Fix 4 — trust shown immediately, in real terms instead of borrowed logos.
const trustPoints = [
  { icon: FileCheck2, value: "50,000+", label: "Documents Processed" },
  { icon: Star, value: "4.9", label: "Average Rating" },
  { icon: ShieldCheck, value: "100%", label: "Encrypted" },
  { icon: UserCheck2, value: "Verified", label: "CA Partners" },
  { icon: ReceiptText, value: "No Hidden", label: "Charges" },
  { icon: Globe2, value: "PAN India", label: "Coverage" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-white/8 bg-white/[.02] py-8">
      <div className="container-main">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {trustPoints.map((point) => {
            const Icon = point.icon;

            return (
              <div
                key={point.label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-white/[.02] px-3 py-4 text-center"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Icon size={17} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{point.value}</p>
                  <p className="mt-0.5 text-[11px] text-secondary">{point.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}