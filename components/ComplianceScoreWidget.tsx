"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { ComplianceService, ComplianceScore } from "@/services/compliance-service";

const ringColor = (score: number) =>
  score >= 85 ? "#34d399" : score >= 70 ? "#3b82f6" : score >= 50 ? "#fbbf24" : score >= 30 ? "#fb923c" : "#f87171";

const statusIcon = (status: string) => {
  if (status === "OVERDUE") return <AlertTriangle size={15} className="text-red-400" />;
  if (status === "COMPLETED") return <CheckCircle2 size={15} className="text-emerald-400" />;
  return <ShieldCheck size={15} className="text-blue-300" />;
};

export default function ComplianceScoreWidget() {
  const [data, setData] = useState<ComplianceScore | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    ComplianceService.myScore()
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : "Unable to load your compliance score"));
  }, []);

  if (error) {
    return (
      <section className="card-dark p-6">
        <p className="text-sm text-red-300">{error}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="card-dark p-6">
        <div className="h-32 animate-pulse rounded-xl bg-white/5" />
      </section>
    );
  }

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (data.score / 100) * circumference;

  return (
    <section className="card-dark p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative mx-auto h-28 w-28 shrink-0 sm:mx-0">
          <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke={ringColor(data.score)}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.8s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold">{data.score}</span>
            <span className="text-[10px] text-secondary">/ 100</span>
          </div>
        </div>

        <div className="flex-1">
          <p className="eyebrow">Tax Health Score</p>
          <h2 className="mt-1 text-xl font-bold">{data.statusLabel}</h2>

          {data.nextDue ? (
            <p className="mt-2 flex items-center gap-2 text-sm text-secondary">
              {statusIcon(data.nextDue.status)}
              Next due: <span className="font-semibold text-slate-200">{data.nextDue.title}</span> on{" "}
              {new Date(data.nextDue.dueDate).toLocaleDateString()}
            </p>
          ) : (
            <p className="mt-2 text-sm text-secondary">No pending deadlines right now.</p>
          )}
        </div>

        <Link href="/intake" className="btn-primary shrink-0 !w-auto px-5">
          Fix issues
        </Link>
      </div>

      {data.items.length > 0 && (
        <div className="mt-6 space-y-2 border-t border-white/10 pt-5">
          {data.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-white/10 p-3 text-sm">
              <div className="flex items-center gap-2">
                {statusIcon(item.status)}
                <span className="font-semibold">{item.title}</span>
              </div>
              <span className="text-xs text-secondary">
                {item.status.replace("_", " ")} · due {new Date(item.dueDate).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}