"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Clock, AlertTriangle } from "lucide-react";

type Props = {
  responseSeconds?: number;
  slaMet?: boolean;
  /** When the case (or CA assignment) started the clock. Needed to show a
   * live countdown instead of a static "in progress" label. */
  startedAt?: string;
};

const SLA_TARGET_SECONDS = 60;

export default function SlaBadge({ responseSeconds, slaMet, startedAt }: Props) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (responseSeconds != null || !startedAt) return; // already responded, or nothing to count down from
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [responseSeconds, startedAt]);

  if (responseSeconds == null) {
    if (!startedAt) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
          <Clock size={13} />
          Awaiting first response — target under 60s
        </span>
      );
    }

    const elapsed = Math.max(0, Math.floor((now - new Date(startedAt).getTime()) / 1000));
    const remaining = SLA_TARGET_SECONDS - elapsed;

    if (remaining > 0) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold tabular-nums text-amber-700">
          <Clock size={13} />
          First response in {remaining}s — target under 60s
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold tabular-nums text-red-700">
        <AlertTriangle size={13} />
        {elapsed}s elapsed — past the 60s target, we&apos;re working on it
      </span>
    );
  }

  if (slaMet) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
        <ShieldCheck size={13} />
        Responded in {responseSeconds}s — 60-second target met
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
      <Clock size={13} />
      First response in {responseSeconds}s
    </span>
  );
}