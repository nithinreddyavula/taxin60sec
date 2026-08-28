import { ArrowRight, Calculator, FileCheck, CheckCircle2, UserCheck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { 
      title: "Take the Health Check", 
      copy: "Answer a few plain-language questions about your income, business, or residential status. We don't ask for a service upfront—we analyze your specific situation.",
      icon: Calculator,
      tags: ["Free check", "No commitment", "Simple questions"]
    },
    { 
      title: "Get clear next steps", 
      copy: "Based on your answers, Tax60 instantly tells you exactly what needs attention, which forms apply to you, and what your deadlines are. No more guessing.",
      icon: FileCheck,
      tags: ["Actionable path", "Exact requirements"]
    },
    { 
      title: "Start a guided case", 
      copy: "If you need a filing or service, start a case. Upload your documents into a private, secure workspace where everything stays organized in one place.",
      icon: UserCheck,
      tags: ["Secure upload", "CA assignment"]
    },
    { 
      title: "Track progress easily", 
      copy: "No more calling to ask 'what's the status?'. Log in to see exactly where your case is, review drafts, and get notified immediately when the job is done.",
      icon: CheckCircle2,
      tags: ["Real-time updates", "Final delivery"]
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6">
              <span className="text-xs font-semibold tracking-wide text-slate-300 uppercase">HOW IT WORKS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">4 steps to clarity</h2>
          </div>
          <p className="text-slate-400 max-w-md text-sm sm:text-base">
            A simple route from uncertainty to action. We guide you through the process step-by-step so you're always in control.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.title} className="relative flex flex-col">
                <div className="flex-1 card-dark p-8 flex flex-col h-full hover:border-emerald-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E5D5C5] text-black font-bold text-lg">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                      <Icon size={18} className="text-slate-300" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                    {step.copy}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {step.tags.map(tag => (
                      <span key={tag} className="text-[11px] font-medium text-slate-300 border border-white/10 bg-white/5 px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow connecting cards on large screens */}
                {!isLast && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 w-6 h-6 z-10 items-center justify-center rounded-full bg-[#E5D5C5] text-black -translate-y-1/2 shadow-lg">
                    <ArrowRight size={14} strokeWidth={3} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
