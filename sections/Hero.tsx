"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Check, Clock } from "lucide-react";
import { StatsService } from "@/services/stats-service";

const SCORE_ITEMS: { label: string; status: string; state: "done" | "due" | "monitored" }[] = [
  { label: "ITR Filing FY 23-24", status: "Completed", state: "done" },
  { label: "GST Returns", status: "Due in 8 days", state: "due" },
  { label: "TDS Compliance", status: "Completed", state: "done" },
  { label: "ROC Compliance", status: "Completed", state: "done" },
  { label: "Property in India", status: "Monitored", state: "monitored" },
];

const stateStyles: Record<string, string> = {
  done: "text-emerald-600 bg-emerald-50",
  due: "text-amber-600 bg-amber-50",
  monitored: "text-slate-500 bg-slate-100",
};

export default function Hero() {
  const dashboardQuery = useQuery({
    queryKey: ["public-dashboard-stats"],
    queryFn: () => StatsService.dashboard(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const complianceRate = dashboardQuery.data?.complianceRatePercentage;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-emerald-50/40 to-white py-14 md:py-20">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="worldDots" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#059669" fillOpacity="0.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#worldDots)" />
      </svg>

      <div className="container-main relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              AI POWERED &nbsp;·&nbsp; CA VERIFIED &nbsp;·&nbsp; 100% SECURE
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
              Your India Taxes.{" "}
              <span className="text-emerald-600">Handled Smartly.</span>{" "}
              So You Can Focus on What Matters.
            </h1>

            <p className="mt-5 max-w-lg text-lg text-slate-600">
              AI scans your tax profile, finds what needs attention, and our
              CA experts handle the rest.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/health-check" className="btn-primary">
                Check My Tax Health
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Book a Free Consultation
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock size={15} /> Takes less than 2 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={15} /> No card required
              </span>
            </div>
          </div>

          <div className="card-light p-6">
            <p className="text-sm font-medium text-slate-500">
              Your Tax Health Score
            </p>

            <div className="mt-4 flex items-center gap-5">
              <div className="relative h-24 w-24 shrink-0">
                <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={2 * Math.PI * 42 * (1 - (complianceRate ?? 94) / 100)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900">
                    {complianceRate ?? 94}
                    <span className="text-sm font-medium text-slate-400">/100</span>
                  </span>
                </div>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Excellent
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-1 border-t border-slate-100 pt-4">
              {SCORE_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg px-2 py-2 text-sm"
                >
                  <span className="text-slate-700">{item.label}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${stateStyles[item.state]}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/health-check"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View Full Report
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}