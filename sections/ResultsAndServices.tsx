import Link from "next/link";
import { ArrowRight, BellRing, FileLock2, FileText, UserCheck2 } from "lucide-react";

const capabilities = [
  { 
    icon: FileText, 
    title: "Guided intake", 
    copy: "Answer the right questions and keep progress saved as you go.",
    tag: "Smart Forms"
  },
  { 
    icon: FileLock2, 
    title: "Document workspace", 
    copy: "See exactly what is needed and upload documents to your private case vault.",
    tag: "Secure Vault"
  },
  { 
    icon: UserCheck2, 
    title: "CA review", 
    copy: "Cases move into a structured CA review workflow instead of a scattered WhatsApp chat.",
    tag: "Expert Led"
  },
  { 
    icon: BellRing, 
    title: "Come back with context", 
    copy: "Use case status, notices, and deadline reminders to stay on top of your compliance.",
    tag: "Always On"
  },
];

export default function ResultsAndServices() {
  return (
    <section className="py-24 sm:py-32 relative" aria-labelledby="why-tax60">
      <div className="container-main">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">CORE CAPABILITIES</span>
          </div>
          <h2 id="why-tax60" className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Tax help that stays organised<br />after the first question.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Most people do not need more tax jargon. They need to know what to do now, what to prepare, and where their case stands next.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ icon: Icon, title, copy, tag }) => (
            <div 
              key={title} 
              className="group card-dark p-6 sm:p-8 flex flex-col items-start transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div className="flex w-full justify-between items-start mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                  <Icon size={22} className="text-slate-300 group-hover:text-emerald-400 transition-colors" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                  {tag}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-bold text-white">Already know what you need?</p>
            <p className="mt-2 text-sm text-slate-400 max-w-md">Browse the available tax, GST, NRI and business services directly without taking the health check.</p>
          </div>
          <Link href="/services" className="flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 text-sm font-bold text-white transition-all">
            Browse services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
