"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Search } from "lucide-react";
import AppShell from "@/components/AppShell";
import { AdminService, AdminClientSummary } from "@/services/admin-service";

export default function AdminClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<AdminClientSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    setLoading(true);
    AdminService.clients(search, page, 20)
      .then((res) => {
        setClients(res.items);
        setTotalPages(res.totalPages);
        setTotalElements(res.totalElements);
      })
      .catch(() => setClients([]))
      .finally(() => setLoading(false));
  }, [search, page]);

  async function handleExport() {
    setExporting(true);
    try {
      await AdminService.exportClientsExcel();
    } finally {
      setExporting(false);
    }
  }

  return (
    <AppShell roles={["ROLE_ADMIN"]}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="mt-2 text-secondary">Manage all registered clients on the platform.</p>
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
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search by name, email, or PAN..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm"
          />
        </div>
      </div>

      <div className="card-dark mt-4 overflow-x-auto p-0">
        {loading ? (
          <div className="h-40 animate-pulse" />
        ) : clients.length === 0 ? (
          <p className="p-6 text-sm text-secondary">No clients found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-secondary">
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">PAN</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined On</th>
                <th className="px-4 py-3">Total Cases</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => router.push(`/admin/clients/${c.id}`)}
                  className="cursor-pointer border-b border-white/5 transition hover:bg-white/5"
                >
                  <td className="px-4 py-3 font-semibold">{c.fullName}</td>
                  <td className="px-4 py-3 text-secondary">{c.email}</td>
                  <td className="px-4 py-3 text-secondary">{c.panNumber ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-500/15 text-slate-400"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-secondary">{new Date(c.joinedOn).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{c.totalCases}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-secondary">
        <span>Showing page {page + 1} of {totalPages} · {totalElements} clients</span>
        <div className="flex gap-2">
          <button disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40">Prev</button>
          <button disabled={page + 1 >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40">Next</button>
        </div>
      </div>
    </AppShell>
  );
}