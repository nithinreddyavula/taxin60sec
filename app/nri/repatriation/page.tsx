"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { RepatriationService, RepatriationSummary } from "@/services/repatriation-service";

export default function RepatriationTrackerPage() {
  const [summary, setSummary] = useState<RepatriationSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [form15ca, setForm15ca] = useState(false);
  const [saving, setSaving] = useState(false);

  function load() {
    RepatriationService.summary()
      .then(setSummary)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function addRecord() {
    if (!amount || !date || !purpose) {
      toast.error("Fill in amount, date, and purpose");
      return;
    }
    setSaving(true);
    try {
      const updated = await RepatriationService.addRecord(
        Number(amount),
        date,
        purpose,
        form15ca
      );
      setSummary(updated);
      setAmount("");
      setDate("");
      setPurpose("");
      setForm15ca(false);
      toast.success("Record added");
    } catch {
      toast.error("Unable to add record");
    } finally {
      setSaving(false);
    }
  }

  const usedPercent =
    summary?.limitUsd && summary.limitUsd > 0
      ? Math.min(100, (summary.usedUsd / summary.limitUsd) * 100)
      : null;

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <div className="p-6">
        <p className="eyebrow">NRI Repatriation Tracker</p>
        <h1 className="mt-2 text-3xl font-bold">
          Financial Year {summary?.financialYear ?? "—"}
        </h1>

        {loading ? (
          <p className="mt-8 text-secondary">Loading...</p>
        ) : summary ? (
          <div className="mt-6 space-y-6">

            <div className="card-dark p-6">
              {summary.limitUsd != null ? (
                <>
                  <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-bold">
                      ${summary.usedUsd.toLocaleString("en-US")}
                      <span className="text-lg text-secondary"> used</span>
                    </p>
                    <p className="text-secondary">
                      of ${summary.limitUsd.toLocaleString("en-US")}
                    </p>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${usedPercent}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-secondary">
                    ${summary.remainingUsd?.toLocaleString("en-US")} remaining this financial year
                  </p>
                </>
              ) : (
                <p className="text-secondary">
                  No limit set yet for your account. Your CA can configure a tracking
                  limit specific to your case — ask them on WhatsApp to set it up.
                </p>
              )}
              <p className="mt-4 text-xs text-secondary border-t border-white/10 pt-4">
                {summary.disclaimer}
              </p>
            </div>

            <div className="card-dark p-6">
              <p className="font-semibold mb-4">Log a repatriation transaction</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount in USD"
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm"
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm"
                />
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Purpose (e.g. Property sale proceeds)"
                  className="sm:col-span-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm"
                />
                <label className="flex items-center gap-2 text-sm sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={form15ca}
                    onChange={(e) => setForm15ca(e.target.checked)}
                  />
                  Form 15CA/15CB filed for this transaction
                </label>
              </div>
              <button
                onClick={addRecord}
                disabled={saving}
                className="btn-primary mt-4 w-full disabled:opacity-50"
              >
                {saving ? "Saving..." : "Add Record"}
              </button>
            </div>

            <div>
              <p className="mb-3 font-semibold">This year&apos;s transactions</p>
              {summary.records.length === 0 ? (
                <p className="text-secondary text-sm">No transactions logged yet.</p>
              ) : (
                <div className="space-y-2">
                  {summary.records.map((r) => (
                    <div key={r.id} className="card-dark flex items-center justify-between p-4">
                      <div>
                        <p className="font-semibold">${r.amountUsd.toLocaleString("en-US")}</p>
                        <p className="text-sm text-secondary">
                          {r.purpose} · {new Date(r.transactionDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`text-xs font-medium ${r.form15caFiled ? "text-green-400" : "text-yellow-400"}`}>
                        {r.form15caFiled ? "15CA filed" : "15CA pending"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ) : null}
      </div>
    </AppShell>
  );
}