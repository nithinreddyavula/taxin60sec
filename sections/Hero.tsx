"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileText,
  Heart,
  Landmark,
  Scale,
  ShieldCheck,
  Sparkles,
  Stamp,
  Zap,
} from "lucide-react";
import HowItWorksSlideshow from "./HowItWorksSlideshow";

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

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-8 md:py-10">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-teal-400/8 blur-[130px]"
        aria-hidden="true"
      />

      <div className="container-main relative">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="badge-pill"><Sparkles size={13} /> AI POWERED</span>
          <span className="badge-pill"><CheckCircle2 size={13} /> CA VERIFIED</span>
          <span className="badge-pill"><ShieldCheck size={13} /> 100% SECURE</span>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_1fr]">
          {/* Left: headline + choice cards */}
          <div>
            <h1 className="max-w-xl text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl">
              Your Taxes.
              <br />
              Understood in 2 Minutes.
              <br />
              <span className="text-emerald-400">Handled by Experts.</span>
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-secondary">
              Whether you need ITR filing, GST, company compliance, startup
              registration, or business advisory — we&apos;ll first understand
              your situation and guide you to exactly what you need.
            </p>

            <div className="relative mt-5 grid items-stretch gap-5 sm:grid-cols-2">
              {/* Card 1: Check My Tax Health */}
              <div className="card-dark relative flex h-full flex-col border-emerald-400/40 bg-emerald-500/[.04] p-5">
                <span className="absolute right-4 top-4 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-300">
                  RECOMMENDED
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15">
                  <Heart size={20} className="text-emerald-400" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-white">
                  Check My Tax Health
                </h3>

                <ul className="mt-3 flex-1 space-y-2">
                  {CHECK_HEALTH_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <Link href="/health-check" className="btn-primary w-full">
                    Check My Free Tax Health Score
                    <ArrowRight size={16} />
                  </Link>
                  <p className="mt-2 text-center text-xs text-secondary">
                    Takes under 2 minutes
                  </p>
                </div>
              </div>

              {/* OR divider */}
              <span className="absolute left-1/2 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#0b1220] text-[11px] font-bold text-secondary sm:flex">
                OR
              </span>

              {/* Card 2: I Already Know What I Need */}
              <div className="card-dark flex h-full flex-col p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/8">
                  <Zap size={20} className="text-slate-200" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-white">
                  I Already Know What I Need
                </h3>

                <p className="mt-1 text-sm text-secondary">
                  Browse all CA services directly
                </p>

                <ul className="mt-3 flex-1 space-y-2">
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

                <div className="mt-5">
                  <Link href="/services" className="btn-secondary w-full">
                    Browse Services
                    <ArrowRight size={16} />
                  </Link>
                  <p className="invisible mt-2 text-center text-xs" aria-hidden="true">
                    Takes under 2 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: animated "See How It Works" slideshow */}
          <HowItWorksSlideshow />
        </div>
      </div>
    </section>
  );
}