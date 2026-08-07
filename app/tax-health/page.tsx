"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, MinusCircle, ShieldCheck } from "lucide-react";
import AppShell from "@/components/AppShell";
import { ComplianceService, ComplianceScore } from "@/services/compliance-service";

const ringColor = (score: number) =>
  score >= 85 ? "#10b981" : score >= 70 ? "#3b82f6" : score >= 50 ? "#f59e0b" : "#ef4444";

function statusIcon(status: string) {
  if (status === "OVERDUE") return <AlertTriangle size={15} className="text-red-500" />;
  if (status === "COMPLETED") return <CheckCircle2 size={15} className="text-emerald-500" />;
  return <ShieldCheck size={15} className="text-blue-500" />;
}

function statusPill(status: string) {
  if (status === "OVERDUE") return "bg-red-50 text-red-700";
  if (status === "COMPLETED") return "bg-emerald-50 text-emerald-700";
  return "bg-blue-50 text-blue-700";
}

const CATEGORY_LABEL: Record<string, string> = {
  INCOME_TAX: "Income Tax",
  GST: "GST",
  ROC: "ROC",
  PAYROLL: "Payroll (TDS)",
};

function categoryCardClasses(status: string) {
  if (status === "OVERDUE") return "border-red-200 bg-red-50";
  if (status === "PENDING") return "border-blue-200 bg-blue-50";
  if (status === "COMPLETED") return "border-emerald-200 bg-emerald-50";
  return "border-slate-200 bg-slate-50"; // NOT_APPLICABLE
}

function categoryIcon(status: string) {
  if (status === "OVERDUE") return <AlertTriangle size={18} className="text-red-600" />;
  if (status === "PENDING") return <ShieldCheck size={18} className="text-blue-600" />;
  if (status === "COMPLETED") return <CheckCircle2 size={18} className="text-emerald-600" />;
  return <MinusCircle size={18} className="text-slate-400" />; // NOT_APPLICABLE
}

function categoryStatusLabel(status: string) {
  if (status === "NOT_APPLICABLE") return "Not applicable to you";
  return status.replace("_", " ");
}

export default function TaxHealthPage() {
  const [data, setData] = useState<ComplianceScore | null>(null);

  useEffect(() => {
    ComplianceService.myScore().then(setData).catch(() => {});
  }, []);

  const circumference = 2 * Math.PI * 40;
  const offset = data ? circumference - (data.score / 100) * circumference : circumference;

  const completed = data?.items.filter((i) => i.status === "COMPLETED").length ?? 0;
  const overdue = data?.items.filter((i) => i.status === "OVERDUE") ?? [];
  const total = data?.items.length ?? 0;

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <h1 className="text-3xl font-bold">Your Tax Health</h1>
      <p className="mt-2 text-secondary">Last updated on {new Date().toLocaleDateString()}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <section className="card-dark p-5">
          <p className="font-bold">Tax Health Score</p>
          {data ? (
            <>
              <div className="relative mx-auto mt-4 h-28 w-28">
                <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="9" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke={ringColor(data.score)} strokeWidth="9" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">{data.score}</span>
                  <span className="text-[10px] text-secondary">/100</span>
                </div>
              </div>
              <p className="mt-3 text-center text-sm font-semibold text-emerald-600">{data.statusLabel}</p>
              <p className="mt-1 text-center text-xs text-secondary">
                {total > 0 ? `${completed} of ${total} compliance items on track` : "No compliance items tracked yet"}
              </p>
            </>
          ) : (
            <div className="mt-4 h-28 animate-pulse rounded-xl bg-black/5" />
          )}
        </section>

        {/* One clear, real next step - not a vanity number. Uses the same
            nextDue item the backend already computes for the score. */}
        <section className="card-dark p-5">
          <p className="font-bold">Why it&apos;s {data?.score ?? "—"}, not 100</p>
          {overdue.length > 0 ? (
            <div className="mt-3 space-y-2">
              {overdue.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl bg-red-50 px-3 py-2 text-sm">
                  <span className="flex items-center gap-2 text-red-800">
                    <AlertTriangle size={14} /> {item.title}
                  </span>
                  <span className="text-xs text-red-600">Due {new Date(item.dueDate).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-secondary">Nothing overdue right now.</p>
          )}

          {data?.nextDue && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">One action to move your score</p>
              <p className="mt-1 text-sm font-semibold text-emerald-900">{data.nextDue.title}</p>
              <p className="mt-1 text-xs text-emerald-700">Due {new Date(data.nextDue.dueDate).toLocaleDateString()}</p>
              {data.nextDue.recommendedServiceId ? (
                <Link href={`/intake?id=${data.nextDue.recommendedServiceId}`} className="btn-primary mt-3 !w-auto px-4 text-sm">
                  Take care of it <ArrowRight size={15} />
                </Link>
              ) : null}
            </div>
          )}
        </section>
      </div>

      {/* Category rollup - Income Tax / GST / ROC / Payroll, always all four.
          Backend already computes this (ComplianceScoreService.categoryStatus,
          worst-status-wins per category); it just wasn't captured on the
          frontend type or shown anywhere before. */}
      <section className="card-dark mt-6 p-5">
        <p className="font-bold">By Category</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(data?.categories ?? []).map((c) => (
            <div key={c.category} className={`rounded-xl border p-3 ${categoryCardClasses(c.status)}`}>
              {categoryIcon(c.status)}
              <p className="mt-2 text-sm font-semibold">{CATEGORY_LABEL[c.category] ?? c.category}</p>
              <p className="mt-0.5 text-xs text-secondary">{categoryStatusLabel(c.status)}</p>
            </div>
          ))}
          {!data && (
            <>
              <div className="h-20 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-20 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-20 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-20 animate-pulse rounded-xl bg-slate-100" />
            </>
          )}
        </div>
      </section>

      <section className="card-dark mt-6 p-5">
        <p className="font-bold">Your Compliance Checklist</p>
        <div className="mt-4 space-y-2">
          {(data?.items ?? []).map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5 text-sm">
              <span className="flex items-center gap-2">{statusIcon(item.status)} {item.title}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-secondary">Due {new Date(item.dueDate).toLocaleDateString()}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusPill(item.status)}`}>
                  {item.status.replace("_", " ")}
                </span>
              </div>
            </div>
          ))}
          {(!data || data.items.length === 0) && (
            <p className="text-sm text-secondary">No compliance items tracked yet.</p>
          )}
        </div>
      </section>
    </AppShell>
  );
}