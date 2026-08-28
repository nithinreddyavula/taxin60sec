"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden flex flex-col items-center text-center">
      {/* Background glow effects to match reference */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#E5D5C5]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
      
      <div className="container-main relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#E5D5C5]" />
            <span className="text-xs font-semibold tracking-wide text-slate-300">Built for Indian Taxpayers & Businesses</span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight text-[#F8F5F2] sm:text-6xl lg:text-[76px]">
            Stop guessing your taxes.<br />
            <span className="text-white/90">Start with a clear path.</span>
          </h1>

          {/* Subheading/Eyebrow below title like reference */}
          <p className="mt-8 text-xs font-bold tracking-[0.2em] text-[#E5D5C5] uppercase">
            Guided Tax & Compliance Platform
          </p>

          {/* Paragraph */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Answer a few simple questions to understand exactly what needs attention. 
            Tax60 gives you clear guidance, a private workspace for your documents, 
            and expert CA support only when you need it.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/health-check" 
              className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#E5D5C5] px-8 text-[15px] font-bold text-black transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
            >
              Check your tax health <ArrowRight size={18} />
            </Link>
            <Link 
              href="/services" 
              className="flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 text-[15px] font-bold text-white transition-all hover:bg-white/10 hover:border-white/20"
            >
              Explore services
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-4 text-[13px] font-medium text-slate-400">
            <span className="flex items-center gap-2">
              <Check size={14} className="text-[#E5D5C5]" /> Free rule-based check
            </span>
            <span className="flex items-center gap-2">
              <Check size={14} className="text-[#E5D5C5]" /> Private case workspace
            </span>
            <span className="flex items-center gap-2">
              <Check size={14} className="text-[#E5D5C5]" /> CA review when needed
            </span>
            <span className="flex items-center gap-2">
              <Check size={14} className="text-[#E5D5C5]" /> Secure document handling
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
