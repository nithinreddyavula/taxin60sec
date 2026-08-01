"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Bot, Calendar, CheckCircle2, Clock, CreditCard, FileText, PlayCircle, ShieldCheck, TrendingUp, UserRound } from "lucide-react";
import { StatsService } from "@/services/stats-service";

export default function Hero() {
  const dashboardQuery = useQuery({
    queryKey: ["public-dashboard-stats"],
    queryFn: () => StatsService.dashboard(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const complianceRate = dashboardQuery.data?.complianceRatePercentage ?? 94;

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      {/* Decorative city-skyline backdrop */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 w-full opacity-30"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="skylineFade" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          [40, 120], [120, 190], [200, 90], [280, 220], [360, 150],
          [440, 240], [520, 110], [600, 200], [680, 160], [760, 230],
          [840, 100], [920, 180], [1000, 140], [1080, 210], [1150, 130],
        ].map(([x, h], i) => (
          <rect key={i} x={x} y={300 - h} width="46" height={h} fill="url(#skylineFade)" />
        ))}
      </svg>

      <div className="container-main relative">
        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr_0.7fr]">
          {/* Left: headline */}
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="badge-pill"><ShieldCheck size={13} /> AI POWERED</span>
              <span className="badge-pill"><CheckCircle2 size={13} /> CA VERIFIED</span>
              <span className="badge-pill"><ShieldCheck size={13} /> 100% SECURE</span>
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Your India Taxes.{" "}
              <span className="text-emerald-400">Handled Smartly.</span>{" "}
              So You Can Focus on What Matters.
            </h1>

            <p className="mt-5 max-w-lg text-lg text-secondary">
              AI scans your tax profile, finds what needs attention, and our
              CA experts handle the rest.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/health-check" className="btn-primary">
                Check My Tax Health
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                <PlayCircle size={16} />
                See How It Works
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

          {/* Middle: Tax Health Score + Tax Overview */}
          <div className="space-y-5">
            <div className="card-dark p-6">
              <p className="flex items-center gap-1.5 text-sm font-medium text-secondary">
                Your Tax Health Score
              </p>

              <div className="mt-4 flex items-center gap-5">
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
                    <span className="text-2xl font-bold text-white">
                      {complianceRate}
                      <span className="text-sm font-medium text-slate-500">/100</span>
                    </span>
                  </div>
                </div>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Excellent
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-white/8 bg-white/[.03] p-3 text-sm text-slate-300">
                You&apos;re doing great! 🎉 We found{" "}
                <span className="font-semibold text-amber-400">2 areas</span> that
                need your attention.
              </div>

              <Link href="/health-check" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/5">
                View Full Report
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="card-dark p-6">
              <p className="text-sm font-semibold text-white">Tax Overview</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/8 bg-white/[.03] p-3">
                  <p className="flex items-center gap-1.5 text-xs text-secondary"><Calendar size={13} /> Upcoming Deadlines</p>
                  <p className="mt-1 text-xl font-bold text-white">09</p>
                  <p className="text-[11px] text-secondary">This Month</p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/[.03] p-3">
                  <p className="flex items-center gap-1.5 text-xs text-secondary"><TrendingUp size={13} /> Potential Savings</p>
                  <p className="mt-1 text-xl font-bold text-white">₹24,800</p>
                  <p className="text-[11px] text-secondary">Identify Now</p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/[.03] p-3">
                  <p className="flex items-center gap-1.5 text-xs text-secondary"><FileText size={13} /> Active Services</p>
                  <p className="mt-1 text-xl font-bold text-white">03</p>
                  <p className="text-[11px] text-secondary">In Progress</p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/[.03] p-3">
                  <p className="flex items-center gap-1.5 text-xs text-secondary"><ShieldCheck size={13} /> Tax Compliance</p>
                  <p className="mt-1 text-xl font-bold text-white">98%</p>
                  <p className="text-[11px] text-secondary">On Track</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: AI Assistant + CA support */}
          <div className="space-y-5">
            <div className="card-dark p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <Bot size={18} className="text-emerald-400" />
              </div>
              <p className="mt-3 text-sm font-semibold text-white">AI Tax Assistant</p>
              <p className="mt-1 text-xs text-secondary">
                Get instant answers to your tax queries
              </p>
              <Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                Ask Now <ArrowRight size={13} />
              </Link>
            </div>

            <div className="card-dark p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <UserRound size={18} className="text-emerald-400" />
              </div>
              <p className="mt-3 text-sm font-semibold text-white">CA Expert Support</p>
              <p className="mt-1 text-xs text-secondary">
                Connect with our experts whenever you need
              </p>
              <Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                Connect Now <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}