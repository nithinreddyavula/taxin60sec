"use client";

import { ShieldCheck, Clock } from "lucide-react";

type Props = {
  responseSeconds?: number;
  slaMet?: boolean;
};

export default function SlaBadge({ responseSeconds, slaMet }: Props) {
  if (responseSeconds == null) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1.5 text-xs font-bold text-amber-200">
        <Clock size={13} />
        Awaiting first response — 60s guarantee in progress
      </span>
    );
  }

  if (slaMet) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-200">
        <ShieldCheck size={13} />
        Responded in {responseSeconds}s — 60-second guarantee met
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/15 px-3 py-1.5 text-xs font-bold text-slate-300">
      <Clock size={13} />
      First response in {responseSeconds}s
    </span>
  );
}