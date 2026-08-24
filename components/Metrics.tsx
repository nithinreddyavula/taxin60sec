"use client";

import { BadgeCheck, Clock3, ShieldCheck, UserCheck2, Users } from "lucide-react";

export default function Metrics() {
  const metrics = [
    {
      icon: Users,
      value: "Built for",
      label: "Individuals and businesses",
    },
    {
      icon: ShieldCheck,
      value: "Secure",
      label: "Case access controls",
    },
    { icon: UserCheck2, value: "CA-led", label: "Review when required" },
    { icon: BadgeCheck, value: "Clear", label: "Case status and next steps" },
    { icon: Clock3, value: "Ongoing", label: "Deadline reminders" },
  ];

  return (
    <section className="section-space">
      <div className="container-main">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="card-dark flex gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Icon size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {item.value}
                  </h3>
                  <p className="mt-1 text-xs text-secondary">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
