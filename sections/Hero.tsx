"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, FileText, MessageCircle, ShieldCheck, UserCheck2 } from "lucide-react";

const steps = [
  { icon: CheckCircle2, title: "Tell us what applies", copy: "A short, rule-based tax check" },
  { icon: FileText, title: "See your next step", copy: "Clear guidance before you choose a service" },
  { icon: UserCheck2, title: "Keep it moving", copy: "Documents, case updates and CA review in one place" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-[130px]" aria-hidden="true" />
      <div className="container-main relative grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="eyebrow">A clearer way to handle Indian tax and compliance</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Start with your situation.<br /><span className="text-emerald-400">Not a confusing service menu.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Answer a few plain-language questions to understand what needs attention. Then move into a guided case workspace for documents, updates and CA review when you need it.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/health-check" className="btn-primary min-h-12 px-5">Check my tax situation <ArrowRight size={18} /></Link>
            <Link href="/services" className="btn-secondary min-h-12 px-5">Explore services</Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-secondary">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-400" /> Free to start</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-emerald-400" /> Private case workspace</span>
            <span className="flex items-center gap-1.5"><MessageCircle size={15} className="text-emerald-400" /> Help when you get stuck</span>
          </div>
        </motion.div>
        <motion.div className="rounded-3xl border border-emerald-400/20 bg-[#091427] p-5 shadow-2xl shadow-emerald-950/20 sm:p-7" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}>
          <div className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="text-sm font-bold text-white">Your guided tax path</p><p className="mt-0.5 text-xs text-secondary">A simple route from uncertainty to action</p></div><span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">Start free</span></div>
          <ol className="mt-5 space-y-3">{steps.map((step, index) => { const Icon = step.icon; return <li key={step.title} className="flex gap-3 rounded-2xl border border-white/8 bg-white/[.025] p-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-sm font-bold text-emerald-300">{index + 1}</span><div className="min-w-0"><div className="flex items-center gap-2"><Icon size={16} className="text-emerald-400" /><p className="font-semibold text-white">{step.title}</p></div><p className="mt-1 text-sm leading-5 text-secondary">{step.copy}</p></div></li>; })}</ol>
          <p className="mt-5 rounded-xl bg-white/[.035] px-4 py-3 text-xs leading-5 text-slate-300">You stay in control: the health check gives guidance; a service is selected only when it fits your next step.</p>
        </motion.div>
      </div>
    </section>
  );
}
