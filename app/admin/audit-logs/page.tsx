"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useAppSession } from "@/components/AppProviders";
import { AdminService, AuditLog } from "@/services/admin-service";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const { user, ready } = useAppSession();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [module, setModule] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    if (!ready || !user?.roles.includes("ROLE_ADMIN")) return;
    let active = true;
    AdminService.auditLogs(search, module, page, 20)
      .then((res) => {
        if (!active) return;
        setLogs(res.items);
        setTotalPages(res.totalPages);
        setTotalElements(res.totalElements);
      })
      .catch(() => { if (active) setLogs([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [ready, user, search, module, page]);

  return (
    <AppShell roles={["ROLE_ADMIN"]}>
      <h1 className="text-3xl font-bold">Audit Logs</h1>
      <p className="mt-2 text-secondary">Track all system activities and changes.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} placeholder="Search by user or action..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm" />
        </div>
        <input value={module} onChange={(e) => { setModule(e.target.value); setPage(0); }} placeholder="Filter by module..." className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
      </div>

      <div className="card-dark mt-4 overflow-x-auto p-0">
        {loading ? (
          <div className="h-40 animate-pulse" />
        ) : logs.length === 0 ? (
          <p className="p-6 text-sm text-secondary">No logs found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-secondary">
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Module</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="cursor-pointer border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-4 py-3 text-secondary">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3">{log.actorId}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/audit-logs/${log.id}`} className="font-semibold text-blue-400 hover:underline">{log.action}</Link>
                  </td>
                  <td className="px-4 py-3 text-secondary">{log.entityType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-secondary">
        <span>Showing page {page + 1} of {totalPages} · {totalElements} logs</span>
        <div className="flex gap-2">
          <button disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40">Prev</button>
          <button disabled={page + 1 >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40">Next</button>
        </div>
      </div>
    </AppShell>
  );
}
