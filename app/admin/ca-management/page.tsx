"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Star } from "lucide-react";
import AppShell from "@/components/AppShell";
import { AdminService, CaSummary } from "@/services/admin-service";

export default function CaManagementPage() {
  const [cas, setCas] = useState<CaSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    AdminService.caList().then(setCas).catch(() => setCas([])).finally(() => setLoading(false));
  }, []);

  const filtered = cas.filter((c) => c.fullName.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppShell roles={["ROLE_ADMIN"]}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CA Management</h1>
          <p className="mt-2 text-secondary">Manage and monitor all CA partners.</p>
        </div>
        <Link href="/admin/ca-applications" className="btn-primary !w-auto px-4">Pending Applications</Link>
      </div>

      <div className="relative mt-6 max-w-xs">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm" />
      </div>

      <div className="card-dark mt-4 overflow-x-auto p-0">
        {loading ? (
          <div className="h-40 animate-pulse" />
        ) : filtered.length === 0 ? (
          <p className="p-6 text-sm text-secondary">No verified CAs yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-secondary">
                <th className="px-4 py-3">CA</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Specialization</th>
                <th className="px-4 py-3">Active Cases</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-white/5">
                  <td className="px-4 py-3 font-semibold">{c.fullName}{c.firmName ? ` · ${c.firmName}` : ""}</td>
                  <td className="px-4 py-3 text-secondary">{c.email}</td>
                  <td className="px-4 py-3 text-secondary">{c.specialization ?? "—"}</td>
                  <td className="px-4 py-3">{c.activeCaseload}</td>
                  <td className="px-4 py-3">
                    {c.averageRating ? (
                      <span className="flex items-center gap-1"><Star size={13} className="fill-amber-400 text-amber-400" /> {c.averageRating.toFixed(1)}</span>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.availability === "AVAILABLE" ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-500/15 text-slate-400"}`}>
                      {c.availability}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppShell>
  );
}