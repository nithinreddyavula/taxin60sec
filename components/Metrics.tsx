"use client";

import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, Clock3, ShieldCheck, Star, Users } from "lucide-react";
import { StatsService } from "@/services/stats-service";

export default function Metrics() {
  const dashboardQuery = useQuery({
    queryKey: ["public-dashboard-stats"],
    queryFn: () => StatsService.dashboard(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const clients = dashboardQuery.data?.totalClients;
  const complianceRate = dashboardQuery.data?.complianceRatePercentage;

  const metrics = [
    {
      icon: Users,
      value: clients && clients > 0 ? `${clients}+` : "New",
      label: "Happy Customers",
    },
    {
      icon: ShieldCheck,
      value: complianceRate != null ? `${complianceRate}%` : "98%",
      label: "On-time Compliance",
    },
    { icon: Star, value: "4.8/5", label: "Customer Rating" },
    { icon: BadgeCheck, value: "15+", label: "Years of Experience" },
    { icon: Clock3, value: "CA", label: "Expert Support" },
  ];

  return (
    <section className="section-space">
      <div className="container-main">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="card-dark flex gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                  <Icon size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">
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