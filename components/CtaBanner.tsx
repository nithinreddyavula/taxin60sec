import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-24 sm:py-32 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#E5D5C5]/5 blur-[120px] pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center card-dark p-12 sm:p-20 rounded-3xl border border-white/10 relative overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 relative z-10">
            Stop guessing.<br className="hidden sm:block" /> Start with clarity today.
          </h2>
          
          <p className="text-lg text-slate-400 mb-10 max-w-xl relative z-10">
            Take our free tax health check to find out exactly what you need to file, when to file it, and how we can help.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <Link 
              href="/health-check" 
              className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#E5D5C5] px-8 text-[15px] font-bold text-black transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Free Health Check <ArrowRight size={18} />
            </Link>
            <Link 
              href="/contact" 
              className="flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 text-[15px] font-bold text-white transition-all hover:bg-white/10 hover:border-white/20"
            >
              Talk to Sales
            </Link>
          </div>
          
          <p className="mt-8 text-xs font-semibold tracking-wide text-slate-500 uppercase relative z-10">
            Takes less than 2 minutes · No commitment
          </p>
        </div>
      </div>
    </section>
  );
}