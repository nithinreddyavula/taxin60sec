import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="section-space">
      <div className="container-main">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-gradient-to-r from-emerald-700 to-emerald-500 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 sm:flex">
              <ShieldCheck className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Start Your Tax Health Check Now
              </h3>
              <p className="mt-1 text-sm text-emerald-50">
                Join thousands of smart taxpayers who stay stress-free all year round.
              </p>
            </div>
          </div>

          <Link
            href="/health-check"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
          >
            Check My Tax Health
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}