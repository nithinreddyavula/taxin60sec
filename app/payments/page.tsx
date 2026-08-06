"use client";

import { useEffect, useMemo, useState } from "react";
import { CreditCard, Download, QrCode, Wallet2 } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Payment, PaymentHistoryService } from "@/services/payment-history-service";

const statusColor: Record<string, string> = {
  SUCCESS: "text-emerald-500",
  FAILED: "text-red-500",
  REFUNDED: "text-amber-500",
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
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  useEffect(() => {
    PaymentHistoryService.list().then((res) => setPayments(res.items)).finally(() => setLoading(false));
  }, []);

  const totalPaid = useMemo(
    () => payments.filter((p) => p.status === "SUCCESS").reduce((sum, p) => sum + (p.amount ?? 0), 0),
    [payments]
  );

  const filtered = payments
    .filter((p) => status === "All Status" || p.status === status)
    .filter((p) => (p.caseNumber ?? "").toLowerCase().includes(search.toLowerCase()) || (p.referenceId ?? "").toLowerCase().includes(search.toLowerCase()));

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <h1 className="text-3xl font-bold">Payments</h1>
      <p className="mt-2 text-secondary">View your payment history and invoices.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search payments..." className="w-full max-w-xs rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
              <option>All Status</option>
              <option value="SUCCESS">Paid</option>
              <option value="REFUNDED">Refunded</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>

          <div className="card-dark mt-4 overflow-x-auto p-0">
            {loading && <div className="h-40 animate-pulse" />}
            {!loading && filtered.length === 0 && <p className="p-6 text-sm text-secondary">No payments yet.</p>}
            {!loading && filtered.length > 0 && (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-secondary">
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Case ID</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-white/5">
                      <td className="px-4 py-3 text-secondary">{new Date(p.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{p.provider ?? "Payment"}</td>
                      <td className="px-4 py-3">{p.caseNumber ?? "-"}</td>
                      <td className="px-4 py-3">{formatAmount(p.amount, p.currency)}</td>
                      <td className={`px-4 py-3 font-semibold ${statusColor[p.status] ?? "text-slate-400"}`}>{p.status}</td>
                      <td className="px-4 py-3"><Download size={15} className="text-secondary" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <div className="space-y-4">
          <section className="card-dark p-5">
            <p className="text-xs text-secondary">Total Paid</p>
            <p className="mt-1 text-2xl font-bold">₹{totalPaid.toLocaleString("en-IN")}</p>
          </section>

          <section className="card-dark p-5">
            <p className="font-bold">Payment Methods</p>
            <ul className="mt-3 space-y-2 text-sm text-secondary">
              <li className="flex items-center gap-2"><QrCode size={15} /> UPI / QR Code</li>
              <li className="flex items-center gap-2"><CreditCard size={15} /> Card (Credit/Debit)</li>
              <li className="flex items-center gap-2"><Wallet2 size={15} /> Net Banking</li>
              <li className="flex items-center gap-2"><Wallet2 size={15} /> Wallets</li>
            </ul>
          </section>

          <section className="card-dark p-5">
            <p className="font-bold">Need Help with Payment?</p>
            <button className="btn-secondary mt-3 w-full">Chat Now</button>
          </section>

          <button className="btn-primary w-full"><Download size={15} className="mr-1 inline" /> Download All Invoices</button>
        </div>
      </div>
    </AppShell>
  );
}