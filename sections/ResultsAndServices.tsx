import Link from "next/link";
import { ArrowRight, BellRing, FileLock2, FileText, UserCheck2 } from "lucide-react";

const capabilities = [
  { icon: FileText, title: "Guided intake", copy: "Answer the right questions and keep progress saved as you go." },
  { icon: FileLock2, title: "Document workspace", copy: "See what is needed and upload documents to your case." },
  { icon: UserCheck2, title: "CA review", copy: "Cases can move into a structured review workflow instead of a scattered chat." },
  { icon: BellRing, title: "Come back with context", copy: "Use case status, notices, compliance and deadline reminders to stay on top of things." },
];

export default function ResultsAndServices() {
  return <section className="section-space" aria-labelledby="why-tax60"><div className="container-main"><div className="max-w-2xl"><p className="eyebrow">Why TaxIn60Sec</p><h2 id="why-tax60" className="section-title mt-3">Tax help that stays organised after the first question.</h2><p className="section-copy mt-3">Most people do not need more tax jargon. They need to know what to do now, what to prepare, and where their case stands next.</p></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{capabilities.map(({ icon: Icon, title, copy }) => <div key={title} className="card-dark p-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10"><Icon size={19} className="text-emerald-400" /></div><h3 className="mt-4 text-base font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-secondary">{copy}</p></div>)}</div><div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[.025] p-5 sm:flex-row sm:items-center"><div><p className="font-semibold text-white">Already know what you need?</p><p className="mt-1 text-sm text-secondary">Browse the available tax, GST, NRI and business services directly.</p></div><Link href="/services" className="btn-secondary shrink-0">Browse services <ArrowRight size={16} /></Link></div></div></section>;
}
