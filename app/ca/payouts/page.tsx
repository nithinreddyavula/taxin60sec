"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { PayoutLineItem, PayoutService } from "@/services/payout-service";

export default function CaPayoutsPage() {
  const [items, setItems] = useState<PayoutLineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PayoutService.myPayouts().then(setItems).finally(() => setLoading(false));
  }, []);

  const totalReleased = items.reduce((sum, i) => sum + (i.caPayoutAmount ?? 0), 0);
  const totalHeld = items
    .filter((i) => i.escrowStatus === "HELD" || i.escrowStatus === "PARTIALLY_RELEASED")
    .reduce((sum, i) => sum + (i.amount ?? 0) - (i.caPayoutAmount ?? 0), 0);

  return (
    <AppShell roles={["ROLE_CA"]}>
      <p className="eyebrow">Earnings</p>
      <h1 className="mt-2 text-3xl font-bold">My payouts</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="card-dark p-5">
          <p className="text-sm text-secondary">Total released to you</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">₹{totalReleased.toLocaleString("en-IN")}</p>
        </div>
        <div className="card-dark p-5">
          <p className="text-sm text-secondary">Still held / pending</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">₹{totalHeld.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="card-dark mt-6 overflow-x-auto p-0">
        {loading && <div className="h-40 animate-pulse" />}
        {!loading && items.length === 0 && <p className="p-6 text-sm text-secondary">No payouts yet.</p>}
        {!loading && items.length > 0 && (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-secondary">
                <th className="px-4 py-3">Case</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Your share</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Released</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="border-b border-slate-50">
                  <td className="px-4 py-3">{i.caseNumber}</td>
                  <td className="px-4 py-3">₹{i.amount.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">₹{i.caPayoutAmount.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">{i.escrowStatus}</td>
                  <td className="px-4 py-3 text-secondary">
                    {i.escrowReleasedAt ? new Date(i.escrowReleasedAt).toLocaleDateString() : "-"}
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