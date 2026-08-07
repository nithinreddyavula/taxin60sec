import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="section-space pt-0">
      <div className="container-main">
        <div className="card-dark flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 sm:flex">
              <Handshake className="text-emerald-400" size={22} />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary">Still Not Sure?</p>
              <h3 className="text-xl font-bold text-white">
                Start with a free <span className="text-emerald-400">Tax Health Check</span>.
              </h3>
              <p className="mt-1 text-sm text-secondary">
                No payment. No commitment. Just clear answers.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-start">
            <div className="flex flex-col items-center gap-1.5">
              <Link href="/health-check" className="btn-primary w-full">
                Check My Tax Health
                <ArrowRight size={16} />
              </Link>
              <p className="text-[11px] text-secondary">Takes under 2 minutes</p>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Link href="/services" className="btn-secondary w-full">
                Browse Services
              </Link>
              <p className="text-[11px] text-secondary">Explore all services</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}