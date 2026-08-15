"use client";

import { useQuery } from "@tanstack/react-query";
import { StatsService } from "@/services/stats-service";

export default function About() {
  const dashboardQuery = useQuery({
    queryKey: ["public-dashboard-stats"],
    queryFn: () => StatsService.dashboard(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const responseTimeQuery = useQuery({
    queryKey: ["public-response-time"],
    queryFn: () => StatsService.responseTime(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const clients = dashboardQuery.data?.totalClients;
  const casesCompleted = dashboardQuery.data?.totalCasesCompleted;
  const complianceRate = dashboardQuery.data?.complianceRatePercentage;
  const avgResponseSeconds = responseTimeQuery.data?.averageResponseSeconds;
  const avgResponseHours = avgResponseSeconds ? Math.max(1, Math.round(avgResponseSeconds / 3600)) : undefined;

  const metrics: [string, string][] = [
    [clients && clients > 0 ? `${clients}+` : "New", "Clients Served"],
    [casesCompleted && casesCompleted > 0 ? `${casesCompleted}+` : "0", "Cases Completed"],
    [avgResponseHours ? `${avgResponseHours}hr` : "Fast", "Avg. Response Time"],
    [complianceRate ? `${complianceRate}%` : "Focused", "Compliance Rate"],
  ];

  return (
    <section className="section-space overflow-hidden">
      <div className="container-main">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="eyebrow">About Us</p>
            <h2 className="section-title mt-3">
              Modern Finance Solutions For Growing Businesses
            </h2>
            <p className="section-copy mt-5">
              Tax60Sec helps startups, founders and businesses simplify
              taxation, compliance and financial operations.
            </p>
            <p className="section-copy mt-4">
              From GST filing and income tax to virtual CFO services, we deliver
              fast, reliable and technology-driven support.
            </p>
          </div>

          <div className="card-dark p-5 md:p-6">
            <div className="grid grid-cols-2 gap-3">
              {metrics.map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-3xl font-bold tracking-tight text-blue-400">{value}</h3>
                  <p className="mt-2 text-sm text-secondary">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}