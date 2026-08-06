"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { AdminReportsOverview, ReportsService } from "@/services/reports-service";

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

const FUNNEL_STAGES: { key: keyof AdminReportsOverview["caseFunnel"]; label: string }[] = [
  { key: "draft", label: "Draft" },
  { key: "intake", label: "Intake" },
  { key: "documentCollection", label: "Document Collection" },
  { key: "caReview", label: "CA Review" },
  { key: "inProgress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function AdminReportsPage() {
  const [data, setData] = useState<AdminReportsOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ReportsService.overview().then(setData).finally(() => setLoading(false));
  }, []);

  return (
    <AppShell roles={["ROLE_ADMIN"]}>
      <p className="eyebrow">Admin Portal</p>
      <h1 className="mt-2 text-3xl font-bold">Reports</h1>

      {loading && <div className="card-dark mt-6 h-40 animate-pulse rounded-2xl" />}

      {!loading && data && (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card-dark p-5">
              <p className="text-sm text-secondary">Total clients</p>
              <p className="mt-1 text-2xl font-bold">{data.totalClients}</p>
            </div>
            <div className="card-dark p-5">
              <p className="text-sm text-secondary">Verified CAs</p>
              <p className="mt-1 text-2xl font-bold">{data.totalVerifiedCAs}</p>
            </div>
            <div className="card-dark p-5">
              <p className="text-sm text-secondary">Total cases</p>
              <p className="mt-1 text-2xl font-bold">{data.caseFunnel.totalCases}</p>
            </div>
            <div className="card-dark p-5">
              <p className="text-sm text-secondary">Avg. turnaround</p>
              <p className="mt-1 text-2xl font-bold">
                {data.averageTurnaroundDays != null ? `${data.averageTurnaroundDays.toFixed(1)}d` : "-"}
              </p>
            </div>
          </div>

          <div className="card-dark mt-6 p-6">
            <h2 className="text-lg font-bold">Revenue</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-secondary">Collected</p>
                <p className="mt-1 text-lg font-bold">{formatCurrency(data.revenue.totalCollected)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-secondary">Released to CAs</p>
                <p className="mt-1 text-lg font-bold text-emerald-600">{formatCurrency(data.revenue.totalReleasedToCa)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-secondary">Platform commission</p>
                <p className="mt-1 text-lg font-bold">{formatCurrency(data.revenue.totalPlatformCommission)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-secondary">Held in escrow</p>
                <p className="mt-1 text-lg font-bold text-amber-600">{formatCurrency(data.revenue.totalHeldInEscrow)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-secondary">Refunded</p>
                <p className="mt-1 text-lg font-bold text-red-600">{formatCurrency(data.revenue.totalRefunded)}</p>
              </div>
            </div>
          </div>

          <div className="card-dark mt-6 p-6">
            <h2 className="text-lg font-bold">Case funnel</h2>
            <div className="mt-4 space-y-2">
              {FUNNEL_STAGES.map((stage) => {
                const count = data.caseFunnel[stage.key] as number;
                const pct = data.caseFunnel.totalCases > 0 ? (count / data.caseFunnel.totalCases) * 100 : 0;
                return (
                  <div key={stage.key}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-700">{stage.label}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-dark mt-6 p-6">
            <h2 className="text-lg font-bold">Volume by category</h2>
            <div className="mt-4 space-y-2">
              {data.volumeByCategory.length === 0 && (
                <p className="text-sm text-secondary">No case volume yet.</p>
              )}
              {data.volumeByCategory.map((v) => (
                <div key={v.category} className="flex items-center justify-between rounded-xl border border-slate-100 p-3 text-sm">
                  <span className="font-semibold">{v.category}</span>
                  <span className="text-secondary">{v.caseCount} cases</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}