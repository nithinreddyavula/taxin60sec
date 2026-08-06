"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { CaPayoutSummary, PayoutService } from "@/services/payout-service";

export default function AdminPayoutsPage() {
  const [rows, setRows] = useState<CaPayoutSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PayoutService.platformSummary().then(setRows).finally(() => setLoading(false));
  }, []);

  const totals = rows.reduce(
    (acc, r) => ({
      released: acc.released + r.totalReleased,
      held: acc.held + r.totalHeld,
      commission: acc.commission + r.totalCommission,
    }),
    { released: 0, held: 0, commission: 0 }
  );

  return (
    <AppShell roles={["ROLE_ADMIN"]}>
      <p className="eyebrow">Payments</p>
      <h1 className="mt-2 text-3xl font-bold">Payouts by CA</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="card-dark p-5">
          <p className="text-sm text-secondary">Total released</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">₹{totals.released.toLocaleString("en-IN")}</p>
        </div>
        <div className="card-dark p-5">
          <p className="text-sm text-secondary">Still held</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">₹{totals.held.toLocaleString("en-IN")}</p>
        </div>
        <div className="card-dark p-5">
          <p className="text-sm text-secondary">Platform commission</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">₹{totals.commission.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="card-dark mt-6 overflow-x-auto p-0">
        {loading && <div className="h-40 animate-pulse" />}
        {!loading && rows.length === 0 && <p className="p-6 text-sm text-secondary">No payout activity yet.</p>}
        {!loading && rows.length > 0 && (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-secondary">
                <th className="px-4 py-3">CA</th>
                <th className="px-4 py-3">Released</th>
                <th className="px-4 py-3">Held</th>
                <th className="px-4 py-3">Commission</th>
                <th className="px-4 py-3">Cases</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.caId} className="border-b border-slate-50">
                  <td className="px-4 py-3 font-semibold">{r.caName}</td>
                  <td className="px-4 py-3 text-emerald-600">₹{r.totalReleased.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-amber-600">₹{r.totalHeld.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">₹{r.totalCommission.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-secondary">{r.totalPayments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppShell>
  );
}