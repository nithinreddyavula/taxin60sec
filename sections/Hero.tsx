"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { StatsService } from "@/services/stats-service";

type HealthRow = { label: string; status: "Healthy" | "Needs Attention" | "Complete" };

const HEALTH_ROWS: HealthRow[] = [
  { label: "Income Tax", status: "Healthy" },
  { label: "GST Compliance", status: "Needs Attention" },
  { label: "TDS Compliance", status: "Healthy" },
  { label: "Company Compliance", status: "Healthy" },
  { label: "Document Status", status: "Complete" },
];

const STATUS_TONE: Record<HealthRow["status"], string> = {
  Healthy: "text-emerald-400",
  "Needs Attention": "text-amber-400",
  Complete: "text-emerald-400",
};

export default function Hero() {
  const dashboardQuery = useQuery({
    queryKey: ["public-dashboard-stats"],
    queryFn: () => StatsService.dashboard(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const complianceRate = dashboardQuery.data?.complianceRatePercentage ?? 87.5;
  const issuesFound = HEALTH_ROWS.filter((r) => r.status === "Needs Attention").length;

  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-teal-400/8 blur-[130px]"
        aria-hidden="true"
      />

      <div className="container-main relative">
        <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_1fr]">
          {/* Left: headline */}
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="badge-pill"><ShieldCheck size={13} /> AI POWERED</span>
              <span className="badge-pill"><CheckCircle2 size={13} /> CA VERIFIED</span>
              <span className="badge-pill"><ShieldCheck size={13} /> 100% SECURE</span>
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Stop worrying about taxes.
              <br />
              <span className="text-emerald-400">We&apos;ll handle it.</span>
            </h1>

            <p className="mt-5 max-w-lg text-lg text-secondary">
              Check your tax health, get expert help, and file with confidence. All in one place.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/health-check" className="btn-primary">
                Check My Tax Health
                <ArrowRight size={16} />
              </Link>
              <Link href="#sample-report" className="btn-secondary">
                <FileText size={16} />
                See Sample Report
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-secondary">
              <span className="flex items-center gap-1.5">
                <Clock size={15} /> Takes less than 2 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} /> No card required
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} /> 100% Secure &amp; Confidential
              </span>
            </div>
          </div>

          {/* Right: single Tax Health Score card */}
          <div id="sample-report" className="card-dark scroll-mt-24 p-6">
            <p className="text-xs font-medium text-secondary">Your Tax Health Score</p>

            <div className="mt-3 grid grid-cols-[auto_1fr] items-center gap-5">
              <div className="relative h-24 w-24 shrink-0">
                <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={2 * Math.PI * 42 * (1 - complianceRate / 100)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {complianceRate}
                    <span className="text-xs font-medium text-slate-500">/100</span>
                  </span>
                  <span className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Excellent
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {HEALTH_ROWS.map((row) => (
                  <div key={row.label} className="flex items-center justify-between border-b border-white/8 pb-2 last:border-0 last:pb-0">
                    <span className="flex items-center gap-2 text-xs text-slate-300">
                      <FileText size={13} className="text-secondary" />
                      {row.label}
                    </span>
                    <span className={`text-[11px] font-semibold ${STATUS_TONE[row.status]}`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/8 bg-white/[.03] p-3 text-xs text-slate-300">
              You&apos;re doing great! 🎉 We found{" "}
              <span className="font-semibold text-amber-400">{issuesFound} areas</span> that need
              your attention.
            </div>

            <Link
              href="/health-check"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/5"
            >
              View Full Report
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}