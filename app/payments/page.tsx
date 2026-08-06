"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import TrustBadges from "@/components/TrustBadges";
import { Payment, PaymentHistoryService } from "@/services/payment-history-service";

const statusColor: Record<string, string> = {
  SUCCESS: "text-emerald-400",
  FAILED: "text-red-400",
  REFUNDED: "text-yellow-400",
  PENDING: "text-slate-400",
  CREATED: "text-slate-400",
};

function formatAmount(amount: number | null, currency: string | null) {
  if (amount == null) return "-";
  return `${currency ?? "INR"} ${amount.toLocaleString("en-IN")}`;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PaymentHistoryService.list()
      .then((res) => setPayments(res.items))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <p className="eyebrow">Payments</p>
      <h1 className="mt-2 text-3xl font-bold">Payment history</h1>
      <p className="mt-2 text-secondary">Every payment, invoiced automatically and encrypted end to end.</p>

      <div className="card-dark mt-6 overflow-x-auto p-0">
        {loading && <div className="h-40 animate-pulse" />}

        {!loading && payments.length === 0 && (
          <p className="p-6 text-sm text-secondary">No payments yet.</p>
        )}

        {!loading && payments.length > 0 && (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-secondary">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Case</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-white/5">
                  <td className="px-4 py-3 text-secondary">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{p.referenceId ?? "-"}</td>
                  <td className="px-4 py-3">{p.caseNumber ?? "-"}</td>
                  <td className="px-4 py-3">
                    {formatAmount(p.amount, p.currency)}
                  </td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      statusColor[p.status] ?? "text-slate-400"
                    }`}
                  >
                    {p.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-10">
        <TrustBadges />
      </div>
    </AppShell>
  );
}