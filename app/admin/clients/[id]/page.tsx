"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import { AdminService, AdminClientDetail } from "@/services/admin-service";

export default function AdminClientDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [client, setClient] = useState<AdminClientDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminService.clientDetail(id).then(setClient).catch(() => setClient(null)).finally(() => setLoading(false));
  }, [id]);

  return (
    <AppShell roles={["ROLE_ADMIN"]}>
      <Link href="/admin/clients" className="text-sm font-semibold text-blue-400">← Back to Clients</Link>

      {loading && <div className="card-dark mt-6 h-40 animate-pulse" />}

      {!loading && client && (
        <>
          <div className="mt-3 flex items-center justify-between">
            <h1 className="text-3xl font-bold">{client.fullName}</h1>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${client.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-500/15 text-slate-400"}`}>
              {client.status}
            </span>
          </div>
          <p className="mt-1 text-secondary">{client.email}</p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="card-dark p-5">
              <p className="font-bold">Profile</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-secondary">Phone</dt><dd>{client.phoneNumber ?? "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-secondary">Joined On</dt><dd>{new Date(client.joinedOn).toLocaleDateString()}</dd></div>
                <div className="flex justify-between"><dt className="text-secondary">Tier</dt><dd>{client.tier ?? "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-secondary">Address</dt><dd className="max-w-[60%] text-right">{client.address ?? "—"}</dd></div>
              </dl>
            </section>

            <section className="card-dark p-5">
              <p className="font-bold">Business & Tax Info</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-secondary">Business Name</dt><dd>{client.businessName ?? "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-secondary">PAN</dt><dd>{client.panNumber ?? "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-secondary">GSTIN</dt><dd>{client.gstin ?? "—"}</dd></div>
              </dl>
            </section>

            <section className="card-dark p-5">
              <p className="font-bold">Referrals</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-secondary">Referral Code</dt><dd>{client.referralCode ?? "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-secondary">Referred By</dt><dd>{client.referredByCode ?? "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-secondary">Referral Credits</dt><dd>{client.referralCredits}</dd></div>
              </dl>
            </section>

            <section className="card-dark p-5 lg:col-span-2">
              <p className="font-bold">Cases ({client.totalCases})</p>
              {client.cases.length === 0 ? (
                <p className="mt-4 text-sm text-secondary">No cases yet.</p>
              ) : (
                <table className="mt-4 w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-secondary">
                      <th className="py-2 pr-4">Case No.</th>
                      <th className="py-2 pr-4">Service</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4">Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client.cases.map((c) => (
                      <tr key={c.caseId} className="border-b border-white/5">
                        <td className="py-2 pr-4 font-semibold">{c.caseNumber}</td>
                        <td className="py-2 pr-4 text-secondary">{c.serviceName}</td>
                        <td className="py-2 pr-4">
                          <span className="rounded-full bg-blue-500/15 px-2.5 py-0.5 text-xs font-semibold text-blue-400">{c.status}</span>
                        </td>
                        <td className="py-2 pr-4 text-secondary">{new Date(c.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </div>
        </>
      )}

      {!loading && !client && <p className="mt-6 text-sm text-secondary">Client not found.</p>}
    </AppShell>
  );
}