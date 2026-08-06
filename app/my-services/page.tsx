"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
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

  useEffect(() => {
    CaseService.list().then((res) => setCases(res.items)).finally(() => setLoading(false));
  }, []);

  const years = useMemo(() => ["All Years"], []);

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
        <select value={year} onChange={(e) => setYear(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
          {years.map((y) => <option key={y}>{y}</option>)}
        </select>
      </div>

      <div className="mt-4 space-y-3">
        {loading && <div className="card-dark h-20 animate-pulse rounded-2xl" />}

        {!loading && filtered.length === 0 && (
          <div className="card-dark p-6 text-sm text-secondary">No services here.</div>
        )}

        {filtered.map((c) => (
          <Link key={c.id} href={`/cases/${c.id}`} className="card-dark flex items-center justify-between gap-4 p-4 hover:bg-white/[0.04]">
            <div>
              <p className="text-sm font-semibold">{c.title}</p>
              <p className="mt-1 text-xs text-secondary">
                Case ID: {c.caseNumber} · {c.assignedCaName ?? "Unassigned"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="shrink-0 rounded-full bg-blue-500/15 px-2.5 py-1 text-xs font-semibold text-blue-300">
                {stageLabel[c.workflowStage] ?? c.workflowStage}
              </span>
              <ChevronRight size={16} className="text-secondary" />
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-4 text-xs text-secondary">Showing 1 to {filtered.length} of {filtered.length} services</p>
    </AppShell>
  );
}