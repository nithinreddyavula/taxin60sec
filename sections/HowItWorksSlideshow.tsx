"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileCheck2,
  FileText,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  UserCheck2,
} from "lucide-react";

const QUIZ_OPTIONS = [
  { label: "Salaried Employee", selected: true },
  { label: "Freelancer", selected: false },
  { label: "Business Owner", selected: false },
  { label: "NRI", selected: false },
];

const RECOMMENDATIONS = [
  { label: "ITR Filing (Salaried)", match: "98% match" },
  { label: "Tax Saving Advisory", match: "91% match" },
  { label: "Form 16 Review", match: "87% match" },
];

const CHECKLIST = [
  { label: "PAN & Aadhaar", done: true },
  { label: "Form 16", done: true },
  { label: "Bank Statements", done: false },
];

const FLOW_STEPS = [
  { icon: Sparkles, label: "Answer Questions" },
  { icon: ShieldCheck, label: "AI Analysis" },
  { icon: FileText, label: "Recommendations" },
  { icon: UserCheck2, label: "CA Assigned" },
  { icon: FileCheck2, label: "Track Progress" },
];

const STEP_DURATION_MS = 3200;

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: "easeOut" as const },
};

export default function HowItWorksSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % FLOW_STEPS.length);
    }, STEP_DURATION_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="card-dark p-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-white">See How It Works</p>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
          100% Free Assessment
        </span>
      </div>

      {/* Segmented progress bar - one strip per step, animates while active */}
      <div className="mt-4 flex gap-1.5">
        {FLOW_STEPS.map((step, index) => (
          <div
            key={step.label}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8"
          >
            <motion.div
              key={`${active}-${index}`}
              className="h-full rounded-full bg-emerald-400"
              initial={{ width: index === active ? "0%" : index < active ? "100%" : "0%" }}
              animate={{ width: index <= active ? "100%" : "0%" }}
              transition={{
                duration: index === active ? STEP_DURATION_MS / 1000 : 0.25,
                ease: index === active ? "linear" : "easeOut",
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 min-h-[220px]">
        <AnimatePresence mode="wait">
          {active === 0 && (
            <motion.div key="step-0" {...fade}>
              <p className="text-xs font-medium text-secondary">Question 1 of 12</p>
              <p className="mt-2 text-sm font-semibold text-white">
                What best describes you?
              </p>
              <div className="mt-3 space-y-2.5">
                {QUIZ_OPTIONS.map((option) => (
                  <div
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
                      {option.selected && (
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      )}
                    </span>
                    {option.label}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {active === 1 && (
            <motion.div
              key="step-1"
              {...fade}
              className="flex h-full flex-col items-center justify-center text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                >
                  <Sparkles size={26} className="text-emerald-400" />
                </motion.div>
              </div>
              <p className="mt-4 text-sm font-semibold text-white">
                AI is analyzing your answers…
              </p>
              <p className="mt-1 text-xs text-secondary">
                Matching your situation against 40+ tax rules
              </p>
              <div className="mt-4 flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">
                <TrendingUp size={12} /> AI Confidence: 98%
              </div>
            </motion.div>
          )}

          {active === 2 && (
            <motion.div key="step-2" {...fade}>
              <p className="text-sm font-semibold text-white">
                Your Personalized Recommendations
              </p>
              <div className="mt-3 space-y-2.5">
                {RECOMMENDATIONS.map((rec) => (
                  <div
                    key={rec.label}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[.03] px-3 py-2.5 text-sm text-slate-200"
                  >
                    <span className="flex items-center gap-2">
                      <FileText size={14} className="text-emerald-400" /> {rec.label}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400">
                      {rec.match}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {active === 3 && (
            <motion.div
              key="step-3"
              {...fade}
              className="flex h-full flex-col items-center justify-center text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                <UserCheck2 size={26} className="text-emerald-400" />
              </div>
              <p className="mt-4 text-sm font-semibold text-white">
                A Verified CA Is Assigned
              </p>
              <p className="mt-1 text-xs text-secondary">
                Matched to your specific case type
              </p>
              <div className="mt-4 flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">
                <ShieldCheck size={12} /> Verified &amp; CA Certified
              </div>
            </motion.div>
          )}

          {active === 4 && (
            <motion.div key="step-4" {...fade}>
              <p className="text-sm font-semibold text-white">Live Progress Tracking</p>
              <div className="mt-3 space-y-2.5">
                {CHECKLIST.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-slate-200"
                  >
                    {item.done ? (
                      <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
                    ) : (
                      <Clock size={16} className="shrink-0 text-slate-500" />
                    )}
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">
                <Clock size={12} /> SLA: 40 hrs remaining
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-1 border-t border-white/8 pt-5">
        {FLOW_STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === active;
          return (
            <button
              key={step.label}
              type="button"
              onClick={() => setActive(index)}
              className="flex items-center gap-1"
            >
              <div className="flex flex-col items-center gap-1.5 text-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                    isActive ? "bg-emerald-500/20" : "bg-white/5"
                  }`}
                >
                  <Icon
                    size={16}
                    className={isActive ? "text-emerald-400" : "text-slate-500"}
                  />
                </div>
                <p
                  className={`w-16 text-[10px] leading-tight ${
                    isActive ? "text-emerald-300" : "text-secondary"
                  }`}
                >
                  {step.label}
                </p>
              </div>
              {index < FLOW_STEPS.length - 1 && (
                <ArrowRight size={13} className="mb-4 shrink-0 text-slate-700" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}