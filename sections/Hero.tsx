"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import { StatsService } from "@/services/stats-service";

const SAMPLE_ISSUES: { title: string; severity: "HIGH" | "MEDIUM" }[] = [
  { title: "GST return overdue by 4 days", severity: "HIGH" },
  { title: "Advance tax not paid for Q2", severity: "HIGH" },
  { title: "ROC annual filing pending", severity: "MEDIUM" },
];

export default function Hero() {
  const dashboardQuery = useQuery({
    queryKey: ["public-dashboard-stats"],
    queryFn: () => StatsService.dashboard(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const responseQuery = useQuery({
    queryKey: ["public-response-stats"],
    queryFn: () => StatsService.responseTime(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const clients = dashboardQuery.data?.totalClients;
  const complianceRate = dashboardQuery.data?.complianceRatePercentage;
  const avgResponse = responseQuery.data?.averageResponseSeconds;

  const heroStats: [string, string][] = [
    [clients && clients > 0 ? `${clients}+` : "New", "Happy Clients"],
    [avgResponse != null ? `${avgResponse}s` : "60sec", "Confirmed Response"],
    [complianceRate != null ? `${complianceRate}%` : "—", "Client Compliance Rate"],
  ].filter(([value]) => value !== "—") as [string, string][];

  return (
    <section className="overflow-hidden py-10 md:py-14">
      <div className="container-main">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mb-5">
              <GuaranteeBadge />
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Know your tax health.
              <br />
              Fix it in one place.
            </h1>

            <p className="section-copy mt-5 max-w-2xl">
              Take a free 60-second check to see exactly what&apos;s pending —
              GST, income tax, TDS, ROC — then let our CAs handle it while
              you track every step.
            </p>

            <div className="mt-7">
              <Link href="/health-check" className="btn-primary">
                Take Free Tax Health Check
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {heroStats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                >
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {value}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-secondary">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-dark p-5 md:p-6">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Sample result</p>
              <span className="rounded-full bg-white/5 px-3 py-1 text-[0.7rem] font-semibold text-secondary">
                Ready in 60 sec
              </span>
            </div>

            <h3 className="mt-2 text-lg font-semibold">
              Your Tax Health Score
            </h3>

            <div className="mt-5 flex items-center gap-5">
              <div className="relative h-28 w-28 shrink-0">
                <div className="absolute inset-0 rounded-full border-[9px] border-amber-500/15" />
                <div className="absolute inset-0 -rotate-45 rounded-full border-[9px] border-transparent border-t-amber-400 border-r-amber-400" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">58</span>
                  <span className="text-[0.65rem] text-secondary">/100</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-amber-400">
                  Needs attention
                </p>
                <p className="mt-1 text-sm text-secondary">
                  3 actions are keeping this score down.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
              {SAMPLE_ISSUES.map((issue) => (
                <div
                  key={issue.title}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      issue.severity === "HIGH" ? "bg-red-400" : "bg-yellow-400"
                    }`}
                  />
                  <span className="text-slate-300">{issue.title}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div>
                <p className="text-sm font-semibold">GST Filing</p>
                <p className="text-xs text-secondary">
                  From ₹2,999 · 2 day turnaround
                </p>
              </div>
              <Link
                href="/health-check"
                className="btn-primary shrink-0 !px-4 !py-2 !text-xs"
              >
                Fix with Tax60
              </Link>
            </div>

            <p className="mt-4 text-center text-xs text-secondary">
              This is a sample — take the free check to see your own score.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}