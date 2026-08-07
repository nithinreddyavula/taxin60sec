"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { CaseItem, CaseService } from "@/services/case-service";

const stageLabel: Record<string, string> = {
  CREATED: "Created",
  PAYMENT_PENDING: "Payment Pending",
  PAYMENT_COMPLETED: "Payment Completed",
  DOCUMENTS_PENDING: "Documents Pending",
  DOCUMENTS_UPLOADED: "Documents Uploaded",
  DOCUMENTS_VERIFIED: "Documents Verified",
  CA_ASSIGNED: "CA Assigned",
  UNDER_REVIEW: "Under Review",
  CLIENT_ACTION_REQUIRED: "Action Required",
  PROCESSING: "Processing",
  READY_TO_FILE: "Ready to File",
  FILED: "Filed",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
};

const TABS = ["All", "In Progress", "Completed", "Cancelled"] as const;

export default function MyServicesPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("All Years");
  const [confirmingId, setConfirmingId] = useState<number | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  useEffect(() => {
    CaseService.list().then((res) => setCases(res.items)).finally(() => setLoading(false));
  }, []);

  const years = useMemo(() => ["All Years"], []);

  // Duplicate near-identical cases (same title, both still open) are easy to
  // create by accident during intake - flag them so the client can tell at a
  // glance instead of guessing which one is real.
  const openTitleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    cases.filter((c) => c.status !== "COMPLETED" && c.status !== "CANCELLED").forEach((c) => {
      counts[c.title] = (counts[c.title] ?? 0) + 1;
    });
    return counts;
  }, [cases]);

  const filtered = cases.filter((c) => {
    const matchesTab =
      tab === "All" ? true :
      tab === "Completed" ? c.status === "COMPLETED" :
      tab === "Cancelled" ? c.status === "CANCELLED" :
      c.status !== "COMPLETED" && c.status !== "CANCELLED";

    const matchesSearch = search.trim() === "" ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  async function handleCancel(id: number) {
    setCancellingId(id);
    try {
      await CaseService.cancel(id);
      setCases((prev) => prev.map((c) => (c.id === id ? { ...c, status: "CANCELLED" } : c)));
      toast.success("Case cancelled.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to cancel this case");
    } finally {
      setCancellingId(null);
      setConfirmingId(null);
    }
  }

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <h1 className="text-3xl font-bold">My Services</h1>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === t ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm"
          />
        </div>
        <select value={year} onChange={(e) => setYear(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900">          {years.map((y) => <option key={y}>{y}</option>)}
        </select>
      </div>

      <div className="mt-4 space-y-3">
        {loading && <div className="card-dark h-20 animate-pulse rounded-2xl" />}

        {!loading && filtered.length === 0 && (
          <div className="card-dark p-6 text-sm text-secondary">No services here.</div>
        )}

        {filtered.map((c) => {
          const isDuplicate = c.status !== "COMPLETED" && c.status !== "CANCELLED" && (openTitleCounts[c.title] ?? 0) > 1;
          const canCancel = c.status !== "COMPLETED" && c.status !== "CANCELLED";
          return (
            <div key={c.id} className="card-dark p-4">
              <div className="flex items-center justify-between gap-4">
                <Link href={`/cases/${c.id}`} className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{c.title}</p>
                    {isDuplicate && (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                        Looks like a duplicate
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-secondary">
                    Case ID: {c.caseNumber} · {c.assignedCaName ?? "Unassigned"}
                  </p>
                </Link>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="pill-blue rounded-full px-2.5 py-1 text-xs font-semibold">
                    {stageLabel[c.workflowStage] ?? c.workflowStage}
                  </span>
                  <Link href={`/cases/${c.id}`} aria-label={`Open case ${c.caseNumber}`}>
                    <ChevronRight size={16} className="text-secondary" />
                  </Link>
                </div>
              </div>

              {canCancel && (
                <div className="mt-3 border-t border-slate-100 pt-3">
                  {confirmingId === c.id ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-red-700">Cancel {c.caseNumber}? This can&apos;t be undone.</span>
                      <button
                        onClick={() => handleCancel(c.id)}
                        disabled={cancellingId === c.id}
                        className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-50"
                      >
                        {cancellingId === c.id ? "Cancelling…" : "Yes, cancel"}
                      </button>
                      <button onClick={() => setConfirmingId(null)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        Keep it
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmingId(c.id)} className="text-xs font-semibold text-red-600 hover:text-red-700">
                      Cancel this case
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-secondary">Showing 1 to {filtered.length} of {filtered.length} services</p>
    </AppShell>
  );
}