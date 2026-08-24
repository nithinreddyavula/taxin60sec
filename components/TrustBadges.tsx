import { FileCheck2, Globe2, Headphones, ShieldCheck, UserCheck2, MessageCircle } from "lucide-react";

const trustPoints = [
  { icon: FileCheck2, value: "Guided", label: "Document collection" },
  { icon: UserCheck2, value: "CA", label: "Review before filing" },
  { icon: ShieldCheck, value: "Private", label: "Case workspace" },
  { icon: Globe2, value: "India", label: "Tax and compliance" },
  { icon: MessageCircle, value: "WhatsApp", label: "Status updates" },
  { icon: Headphones, value: "Human", label: "Support when needed" },
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
