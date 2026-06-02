"use client";

import { BadgeCheck, Clock3, ShieldCheck, Users } from "lucide-react";

const metrics = [
  {
    icon: Users,
    value: "500+",
    label: "Clients Served",
  },
  {
    icon: BadgeCheck,
    value: "10+",
    label: "Years Experience",
  },
  {
    icon: Clock3,
    value: "24hr",
    label: "Response Time",
  },
  {
    icon: ShieldCheck,
    value: "95%",
    label: "Compliance Rate",
  },
];

export default function Metrics() {
  return (
    <section className="section-space">
      <div className="container-main">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {metrics.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="card-dark flex gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/15 bg-blue-500/10">
                  <Icon size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">
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
