import { FileCheck2, Globe2, Headphones, ShieldCheck, Star, Trophy } from "lucide-react";

const trustPoints = [
  { icon: FileCheck2, value: "50,000+", label: "Documents Processed" },
  { icon: Star, value: "4.9/5", label: "Google Rating", stars: true },
  { icon: Trophy, value: "98%", label: "Cases Completed On Time" },
  { icon: ShieldCheck, value: "100%", label: "Secure & Encrypted" },
  { icon: Globe2, value: "15+", label: "Years Experience" },
  { icon: Headphones, value: "PAN India", label: "Support" },
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
                  {point.stars && (
                    <div className="mt-0.5 flex items-center justify-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={9} fill="currentColor" />
                      ))}
                    </div>
                  )}
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