"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck2,
  FileText,
  ShieldCheck,
  TrendingUp,
  UserCheck2,
} from "lucide-react";
import { StatsService } from "@/services/stats-service";

// Fix 2 — "the platform feels alive": a slim status strip that cycles
// through a realistic case lifecycle every few seconds.
const LIVE_STEPS = [
  { icon: FileCheck2, text: "GST Filed" },
  { icon: Clock, text: "Income Tax Due" },
  { icon: TrendingUp, text: "₹18,400 Potential Saving" },
  { icon: UserCheck2, text: "CA Assigned" },
  { icon: CheckCircle2, text: "Case Completed" },
] as const;

function LiveActivityTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % LIVE_STEPS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const step = LIVE_STEPS[index];
  const Icon = step.icon;

  return (
    <div className="flex items-center gap-2.5 overflow-hidden rounded-full border border-white/10 bg-white/[.03] px-3.5 py-2">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={step.text}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-200"
        >
          <Icon size={13} className="text-emerald-400" />
          {step.text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const dashboardQuery = useQuery({
    queryKey: ["public-dashboard-stats"],
    queryFn: () => StatsService.dashboard(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const complianceRate = dashboardQuery.data?.complianceRatePercentage ?? 94;

  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      {/* Ambient glow — soft and subtle, not a colored blob */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-teal-400/8 blur-[130px]"
        aria-hidden="true"
      />

      {/* Decorative city-skyline accent — small, faint, contained to the bottom edge */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full opacity-20 md:h-52"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="skylineFade" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          [20, 70], [90, 110], [160, 55], [230, 140], [300, 90],
          [370, 150], [440, 65], [510, 120], [580, 170], [650, 100],
          [720, 60], [790, 130], [860, 85], [930, 150], [1000, 75],
          [1070, 105], [1140, 60],
        ].map(([x, h], i) => (
          <rect key={i} x={x} y={200 - h} width="56" height={h} fill="url(#skylineFade)" />
        ))}
      </svg>

      <div className="container-main relative">
        <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_1.4fr]">
          {/* Left: headline */}
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="badge-pill"><ShieldCheck size={13} /> AI POWERED</span>
              <span className="badge-pill"><CheckCircle2 size={13} /> CA VERIFIED</span>
              <span className="badge-pill"><ShieldCheck size={13} /> 100% SECURE</span>
            </div>

            {/* Fix 2 — live status strip, sits right above the headline */}
            <div className="mb-5">
              <LiveActivityTicker />
            </div>

            {/* Fix 1 — hero solves one problem, in plain language */}
            <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Stop worrying about{" "}
              <span className="text-emerald-400">taxes.</span>
            </h1>

            <p className="mt-5 max-w-lg text-lg text-secondary">
              We&apos;ll tell you what&apos;s wrong, how much it&apos;ll cost, and
              connect you with a verified CA — all in under 2 minutes.
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

          {/* Right: Tax Health Score + Tax Overview, side by side */}
          <div id="sample-report" className="grid gap-4 scroll-mt-24 sm:grid-cols-[0.85fr_1.15fr]">
            <div className="card-dark p-5">
              <p className="flex items-center gap-1.5 text-xs font-medium text-secondary">
                Your Tax Health Score
              </p>

              <div className="mt-3 flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0">
                  <svg viewBox="0 0 100 100" className="h-20 w-20 -rotate-90">
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
                  </div>
                </div>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Excellent
                </p>
              </div>

              <div className="mt-3 rounded-xl border border-white/8 bg-white/[.03] p-2.5 text-xs text-slate-300">
                You&apos;re doing great! 🎉 We found{" "}
                <span className="font-semibold text-amber-400">2 areas</span> that
                need your attention.
              </div>

              <Link href="/health-check" className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/5">
                View Full Report
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="card-dark p-5">
              <p className="text-xs font-semibold text-white">Tax Overview</p>
              <div className="mt-3 grid grid-cols-2 auto-rows-fr gap-2.5">
                <div className="flex flex-col justify-between rounded-xl border border-white/8 bg-white/[.03] p-2.5">
                  <p className="flex items-center gap-1.5 text-[11px] text-secondary"><Calendar size={12} /> Upcoming Deadlines</p>
                  <p className="mt-0.5 text-lg font-bold text-white">09</p>
                  <p className="text-[10px] text-secondary">This Month</p>
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-white/8 bg-white/[.03] p-2.5">
                  <p className="flex items-center gap-1.5 text-[11px] text-secondary"><TrendingUp size={12} /> Potential Savings</p>
                  <p className="mt-0.5 text-lg font-bold text-white">₹24,800</p>
                  <p className="text-[10px] text-secondary">Identify Now</p>
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-white/8 bg-white/[.03] p-2.5">
                  <p className="flex items-center gap-1.5 text-[11px] text-secondary"><FileText size={12} /> Active Services</p>
                  <p className="mt-0.5 text-lg font-bold text-white">03</p>
                  <p className="text-[10px] text-secondary">In Progress</p>
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-white/8 bg-white/[.03] p-2.5">
                  <p className="flex items-center gap-1.5 text-[11px] text-secondary"><ShieldCheck size={12} /> Tax Compliance</p>
                  <p className="mt-0.5 text-lg font-bold text-white">98%</p>
                  <p className="text-[10px] text-secondary">On Track</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs font-semibold text-white">Recent Activity</p>
                <Link href="/notices" className="text-[11px] font-semibold text-emerald-400">
                  View All
                </Link>
              </div>

              <div className="mt-2.5 space-y-2">
                {[
                  { label: "ITR Filing FY 23-24", status: "Completed", tone: "text-emerald-400" },
                  { label: "GST Return Jul 2024", status: "Due in 8 days", tone: "text-amber-400" },
                  { label: "TDS Compliance Q1", status: "Completed", tone: "text-emerald-400" },
                  { label: "Document Uploaded", status: "2 days ago", tone: "text-secondary" },
                ].map((activity) => (
                  <div
                    key={activity.label}
                    className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[.03] px-2.5 py-2"
                  >
                    <span className="flex items-center gap-2 text-[11px] text-slate-300">
                      <FileText size={12} className="text-secondary" />
                      {activity.label}
                    </span>
                    <span className={`text-[10px] font-semibold ${activity.tone}`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}