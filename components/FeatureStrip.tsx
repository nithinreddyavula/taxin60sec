import { Bot, Bell, UserRound, ShieldCheck, LifeBuoy } from "lucide-react";

const features = [
  { icon: Bot, title: "AI Scan", copy: "Detect issues early" },
  { icon: Bell, title: "Smart Reminders", copy: "Never miss a deadline" },
  { icon: UserRound, title: "Expert CA Support", copy: "Always by your side" },
  { icon: ShieldCheck, title: "100% Secure", copy: "Your data is safe" },
  { icon: LifeBuoy, title: "End-to-End Support", copy: "From filing to notice handling" },
];

export default function FeatureStrip() {
  return (
    <section className="border-y border-slate-100 bg-white/70 py-6">
      <div className="container-main">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                  <Icon size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{f.title}</p>
                  <p className="text-xs text-slate-500">{f.copy}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}