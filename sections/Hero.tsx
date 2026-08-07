"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Heart,
  Landmark,
  Scale,
  ShieldCheck,
  Sparkles,
  Stamp,
  TrendingUp,
  UserCheck2,
  Zap,
} from "lucide-react";

const BROWSE_ITEMS = [
  { icon: FileText, label: "Income Tax" },
  { icon: Landmark, label: "GST" },
  { icon: Building2, label: "Company Registration" },
  { icon: Scale, label: "ROC" },
  { icon: Stamp, label: "Trademark & More" },
];

const CHECK_HEALTH_POINTS = [
  "Answer 12 simple questions",
  "AI analyzes your tax situation",
  "Get your Tax Health Score",
  "Personalized recommendations",
  "Free",
];

const QUIZ_OPTIONS = [
  { label: "Salaried Employee", selected: true },
  { label: "Freelancer", selected: false },
  { label: "Business Owner", selected: false },
  { label: "Startup Founder", selected: false },
  { label: "NRI", selected: false },
];

const FLOW_STEPS = [
  { icon: Sparkles, label: "AI Analysis" },
  { icon: ShieldCheck, label: "Tax Health Score" },
  { icon: FileText, label: "Recommended Services" },
  { icon: UserCheck2, label: "CA Assigned" },
];

export default function Hero() {
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
        <div className="mb-5 flex flex-wrap gap-2">
          <span className="badge-pill"><Sparkles size={13} /> AI POWERED</span>
          <span className="badge-pill"><CheckCircle2 size={13} /> CA VERIFIED</span>
          <span className="badge-pill"><ShieldCheck size={13} /> 100% SECURE</span>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_1fr]">
          {/* Left: headline + choice cards */}
          <div>
            <h1 className="max-w-xl text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl">
              Your Taxes.
              <br />
              Understood in 2 Minutes.
              <br />
              <span className="text-emerald-400">Handled by Experts.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-secondary">
              Whether you need ITR filing, GST, company compliance, startup
              registration, or business advisory — we&apos;ll first understand
              your situation and guide you to exactly what you need.
            </p>

            <div className="relative mt-8 grid gap-5 sm:grid-cols-2">
              {/* Card 1: Check My Tax Health */}
              <div className="card-dark relative flex flex-col border-emerald-400/40 bg-emerald-500/[.04] p-5">
                <span className="absolute right-4 top-4 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-300">
                  RECOMMENDED
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15">
                  <Heart size={20} className="text-emerald-400" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-white">
                  Check My Tax Health
                </h3>

                <ul className="mt-3 space-y-2">
                  {CHECK_HEALTH_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                      {point}
                    </li>
                  ))}
                </ul>

                <Link href="/health-check" className="btn-primary mt-5 w-full">
                  Start Free Assessment
                  <ArrowRight size={16} />
                </Link>
                <p className="mt-2 text-center text-xs text-secondary">
                  Takes under 2 minutes
                </p>
              </div>

              {/* OR divider */}
              <span className="absolute left-1/2 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#0b1220] text-[11px] font-bold text-secondary sm:flex">
                OR
              </span>

              {/* Card 2: I Already Know What I Need */}
              <div className="card-dark flex flex-col p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/8">
                  <Zap size={20} className="text-slate-200" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-white">
                  I Already Know What I Need
                </h3>

                <p className="mt-1 text-sm text-secondary">
                  Browse all CA services directly
                </p>

                <ul className="mt-3 space-y-2">
                  {BROWSE_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label} className="flex items-center gap-2 text-sm text-slate-300">
                        <Icon size={15} className="shrink-0 text-secondary" />
                        {item.label}
                      </li>
                    );
                  })}
                </ul>

                <Link href="/services" className="btn-secondary mt-5 w-full">
                  Browse Services
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: interactive quiz preview */}
          <div className="card-dark p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-white">See How It Works</p>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
                100% Free Assessment
              </span>
            </div>

            <p className="mt-4 text-xs font-medium text-secondary">Question 1 of 12</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
              <div className="h-full w-[8%] rounded-full bg-emerald-400" />
            </div>

            <div className="mt-5 grid grid-cols-[1fr_auto] gap-4">
              <div>
                <p className="text-sm font-semibold text-white">What best describes you?</p>
                <div className="mt-3 space-y-2.5">
                  {QUIZ_OPTIONS.map((option) => (
                    <label
                      key={option.label}
                      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition ${
                        option.selected
                          ? "border-emerald-400/50 bg-emerald-500/[.06] text-white"
                          : "border-white/10 text-slate-300"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          option.selected ? "border-emerald-400" : "border-white/25"
                        }`}
                      >
                        {option.selected && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
                      </span>
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="hidden w-36 shrink-0 flex-col gap-3 rounded-2xl border border-white/8 bg-white/[.03] p-3 sm:flex">
                <div>
                  <p className="flex items-center gap-1.5 text-[10px] text-secondary">
                    <Clock size={12} /> Estimated Time
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">1 min 48 sec</p>
                </div>
                <div className="border-t border-white/8 pt-3">
                  <p className="flex items-center gap-1.5 text-[10px] text-secondary">
                    <TrendingUp size={12} /> AI Confidence
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">98%</p>
                </div>
                <div className="border-t border-white/8 pt-3">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
                    <CheckCircle2 size={12} /> Free Assessment
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-1 border-t border-white/8 pt-5">
              {FLOW_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="flex items-center gap-1">
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10">
                        <Icon size={16} className="text-emerald-400" />
                      </div>
                      <p className="w-16 text-[10px] leading-tight text-secondary">{step.label}</p>
                    </div>
                    {index < FLOW_STEPS.length - 1 && (
                      <ArrowRight size={13} className="mb-4 shrink-0 text-slate-700" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}