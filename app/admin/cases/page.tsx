"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Search } from "lucide-react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { useAppSession } from "@/components/AppProviders";
import { AdminService, AdminCaseSummary, AssignableCa } from "@/services/admin-service";

const STATUS_OPTIONS = ["All Status", "IN_PROGRESS", "CA_REVIEW", "PENDING_INFO", "COMPLETED", "CANCELLED"];

export default function AdminCasesPage() {
  const router = useRouter();
  const { user, ready } = useAppSession();
  const [cases, setCases] = useState<AdminCaseSummary[]>([]);
  const [cas, setCas] = useState<AssignableCa[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [assigning, setAssigning] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!ready || !user?.roles.includes("ROLE_ADMIN")) return;
    AdminService.cases()
      .then(setCases)
      .catch((e) => { console.error("Failed to load cases:", e); setCases([]); })
      .finally(() => setLoading(false));

    AdminService.assignableCas()
      .then(setCas)
      .catch((e) => { console.error("Failed to load assignable CAs:", e); setCas([]); });
  }, [ready, user]);

  const filtered = useMemo(
    () =>
      cases
        .filter((c) => status === "All Status" || c.status === status)
        .filter((c) => c.clientName.toLowerCase().includes(search.toLowerCase()) || c.serviceName.toLowerCase().includes(search.toLowerCase())),
    [cases, search, status]
  );

  async function handleAssign(caseId: number, value: string) {
    setAssigning(caseId);
    const caId = value === "" ? null : Number(value);
    try {
      await AdminService.assignCase(caseId, caId);
      setCases((prev) => prev.map((c) => (c.caseId === caseId
        ? { ...c, assignedCaId: caId, assignedCaName: cas.find((ca) => ca.id === caId)?.fullName ?? null }
        : c)));
      toast.success(caId ? "CA assigned" : "CA unassigned");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to assign CA");
    } finally {
      setAssigning(null);
    }
  }

  async function handleExport() {
    setExporting(true);
    try {
      await AdminService.exportCasesExcel();
    } finally {
      setExporting(false);
    }
  }

  return (
    <AppShell roles={["ROLE_ADMIN"]}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Cases</h1>
          <p className="mt-2 text-secondary">Track and manage all client cases.</p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-60"
        >
          <Download size={16} />
          {exporting ? "Exporting..." : "Download Excel"}
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by client or service..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
          {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="card-dark mt-4 overflow-x-auto p-0">
        {loading ? (
          <div className="h-40 animate-pulse" />
        ) : filtered.length === 0 ? (
          <p className="p-6 text-sm text-secondary">No cases found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-secondary">
                <th className="px-4 py-3">Case ID</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">CA Assigned</th>
                <th className="px-4 py-3">Created On</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.caseId}
                  onClick={() => router.push(`/admin/cases/${c.caseId}`)}
                  className="cursor-pointer border-b border-white/5 hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-3 font-mono text-xs text-secondary">TX{c.caseId}</td>
                  <td className="px-4 py-3 font-semibold">{c.clientName}</td>
                  <td className="px-4 py-3 text-secondary">{c.serviceName}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-blue-500/15 px-2.5 py-0.5 text-xs font-semibold text-blue-400">{c.status}</span>
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    {cas.length === 0 ? (
                      <span className="text-xs text-secondary">{c.assignedCaName ?? "Unassigned"}</span>
                    ) : (
                      <select
                        value={c.assignedCaId ?? ""}
                        disabled={assigning === c.caseId}
                        onChange={(e) => handleAssign(c.caseId, e.target.value)}
                        className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs disabled:opacity-50"
                      >
                        <option value="">Unassigned</option>
                        {cas.map((ca) => (
                          <option key={ca.id} value={ca.id}>
                            {ca.fullName} ({ca.activeCaseload})
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="px-4 py-3 text-secondary">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="mt-4 text-xs text-secondary">Showing 1 to {filtered.length} of {cases.length} cases</p>
    </AppShell>
  );
}
