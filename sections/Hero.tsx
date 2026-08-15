"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-6 md:py-8">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-teal-400/8 blur-[130px]"
        aria-hidden="true"
      />

      <div className="container-main relative">
        <motion.div
          className="mb-3 flex flex-wrap gap-2"
          initial="initial"
          animate="animate"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="badge-pill"><Sparkles size={13} /> AI POWERED</span>
          <span className="badge-pill"><CheckCircle2 size={13} /> CA VERIFIED</span>
          <span className="badge-pill"><ShieldCheck size={13} /> 100% SECURE</span>
        </motion.div>

        {/* items-stretch: both columns take the same height */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_1fr]">
          {/* Left: headline + choice cards — flex column so the cards row can grow */}
          <div className="flex h-full flex-col">
            <motion.h1
              className="max-w-xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-3xl lg:text-[2.15rem]"
              initial="initial"
              animate="animate"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            >
              Know Exactly What Your Taxes Need.
              <br />
              <span className="text-emerald-400">In 60 Seconds.</span>
            </motion.h1>

            <motion.p
              className="mt-2 max-w-lg text-[13px] leading-5 text-secondary"
              initial="initial"
              animate="animate"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
            >
              No jargon, no guesswork. Our AI reads your situation instantly and
              a real, verified Chartered Accountant takes it from there — ITR,
              GST, company compliance, or startup registration, handled start
              to finish.
            </motion.p>

            {/* flex-1: this row stretches to fill remaining height, so the cards grow */}
            <motion.div
              className="relative mt-4 grid flex-1 items-stretch gap-4 sm:grid-cols-2"
              initial="initial"
              animate="animate"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              {/* Card 1: Check My Tax Health */}
              <div className="card-dark relative flex h-full flex-col border-emerald-400/40 bg-emerald-500/[.04] p-4 transition-transform duration-300 hover:-translate-y-1">
                <span className="absolute right-3.5 top-3.5 rounded-full bg-emerald-500/15 px-2 py-1 text-[9px] font-bold tracking-wide text-emerald-300">
                  RECOMMENDED
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15">
                  <Heart size={16} className="text-emerald-400" />
                </div>

                <h3 className="mt-3 text-base font-bold text-white">
                  Not Sure Where to Start?
                </h3>

                <ul className="mt-2.5 flex-1 space-y-1.5">
                  {CHECK_HEALTH_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-3">
                  <Link href="/health-check" className="btn-primary w-full !text-[13px]">
                    Get My Free Tax Health Score
                    <ArrowRight size={14} />
                  </Link>
                  <p className="mt-1.5 text-center text-[11px] text-secondary">
                    2 minutes &middot; No card &middot; No spam
                  </p>
                </div>
              </div>

              {/* OR divider */}
              <span className="absolute left-1/2 top-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#0b1220] text-[10px] font-bold text-secondary sm:flex">
                OR
              </span>

              {/* Card 2: I Already Know What I Need */}
              <div className="card-dark flex h-full flex-col p-4 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8">
                  <Zap size={16} className="text-slate-200" />
                </div>

                <h3 className="mt-3 text-base font-bold text-white">
                  Already Know What You Need?
                </h3>

                <p className="mt-1 text-xs text-secondary">
                  Skip ahead — browse all CA services directly
                </p>

                <ul className="mt-2.5 flex-1 space-y-1.5">
                  {BROWSE_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label} className="flex items-center gap-2 text-xs text-slate-300">
                        <Icon size={13} className="shrink-0 text-secondary" />
                        {item.label}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-3">
                  <Link href="/services" className="btn-secondary w-full !text-[13px]">
                    Browse Services
                    <ArrowRight size={14} />
                  </Link>
                  <p className="invisible mt-1.5 text-center text-[11px]" aria-hidden="true">
                    Takes under 2 minutes
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: animated "See How It Works" slideshow */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
          >
            <HowItWorksSlideshow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}