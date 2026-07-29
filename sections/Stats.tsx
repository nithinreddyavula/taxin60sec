"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { StatsService } from "@/services/stats-service";

export default function Stats() {
  const dashboardQuery = useQuery({
    queryKey: ["public-dashboard-stats"],
    queryFn: () => StatsService.dashboard(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const clients = dashboardQuery.data?.totalClients;
  const casesCompleted = dashboardQuery.data?.totalCasesCompleted;

  const stats: [string, string][] = [
    [clients && clients > 0 ? `${clients}+` : "New", "Happy Clients"],
    [casesCompleted && casesCompleted > 0 ? `${casesCompleted}+` : "0", "Cases Completed"],
  ];

  return (
    <section className="section-space">
      <div className="container-main">
        <div className="section-header">
          <p className="eyebrow">What We Do</p>
          <h2 className="section-title mt-3">Complete Finance & Tax Solutions</h2>
          <p className="section-copy mt-3">
            Everything your business needs under one roof
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card-dark p-5">
            <h3 className="text-xl font-bold tracking-tight">
              Trusted by Businesses
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <h2 className="text-3xl font-bold tracking-tight text-blue-400">
                    {value}
                  </h2>
                  <p className="mt-2 text-sm text-secondary">{label}</p>
                </div>
              ))}
            </div>
            <Link href="/services" className="btn-primary mt-5 w-full">
              View All Services
            </Link>
          </div>

          <div className="card-dark relative overflow-hidden p-6">
            <div className="absolute right-[-90px] top-[-90px] h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-bold leading-tight tracking-tight">
                Ready to Simplify Your Finance?
              </h2>
              <p className="mt-4 text-sm leading-6 text-secondary">
                Take a free tax health check and see exactly what needs
                attention, in under a minute.
              </p>

              <div className="mt-6 grid gap-3">
                <Link href="/health-check" className="btn-primary w-full">
                  Take Free Tax Health Check
                </Link>
                <a
                  href="https://wa.me/917013734079"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary w-full"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <p className="mt-5 text-sm text-secondary">
                No commitment. 100% confidential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}