"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import AppShell from "@/components/AppShell";
import { ComplianceService, ComplianceItem } from "@/services/compliance-service";

const TYPE_LABELS: Record<string, string> = {
  GST_RETURN: "GST Return",
  TDS_RETURN: "TDS Return",
  ROC_FILING: "ROC Filing",
  ITR_FILING: "Income Tax Return",
  ADVANCE_TAX: "Advance Tax",
  OTHER: "Other",
};

function statusIcon(status: string) {
  if (status === "OVERDUE") return <AlertTriangle size={15} className="text-red-400" />;
  if (status === "COMPLETED") return <CheckCircle2 size={15} className="text-emerald-400" />;
  return <ShieldCheck size={15} className="text-blue-300" />;
}

function statusColor(status: string) {
  if (status === "OVERDUE") return "border-red-400/30 bg-red-400/5";
  if (status === "COMPLETED") return "border-emerald-400/20 bg-emerald-400/5";
  return "border-white/10";
}

function monthKey(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string) {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

type FilterKey = "ALL" | "PENDING" | "OVERDUE" | "COMPLETED";

export default function CalendarPage() {
  const [items, setItems] = useState<ComplianceItem[] | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterKey>("ALL");

  useEffect(() => {
    ComplianceService.myScore()
      .then((res) => setItems(res.items))
      .catch((e) => setError(e instanceof Error ? e.message : "Unable to load your tax calendar"));
  }, []);

  const filtered = useMemo(() => {
    if (!items) return [];
    if (filter === "ALL") return items;
    return items.filter((item) => item.status === filter);
  }, [items, filter]);

  const grouped = useMemo(() => {
    const map = new Map<string, ComplianceItem[]>();
    for (const item of filtered) {
      const key = monthKey(item.dueDate);
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const counts = useMemo(() => {
    const c = { PENDING: 0, OVERDUE: 0, COMPLETED: 0 };
    for (const item of items ?? []) {
      if (item.status in c) c[item.status as keyof typeof c] += 1;
    }
    return c;
  }, [items]);

  return (
    <AppShell roles={["ROLE_CLIENT", "ROLE_CA", "ROLE_ADMIN"]}>
      <div className="p-6">
        <p className="eyebrow">Tax Calendar</p>
        <h1 className="mt-2 text-3xl font-bold">Your filing deadlines</h1>
        <p className="mt-2 text-secondary">
          Every GST, TDS, ROC, and income tax deadline that applies to you, laid out by month.
        </p>

        {!error && items && items.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {(["ALL", "OVERDUE", "PENDING", "COMPLETED"] as FilterKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                  filter === key
                    ? "border-blue-400 bg-blue-400/10 text-blue-300"
                    : "border-white/10 text-secondary hover:border-white/20"
                }`}
              >
                {key === "ALL" ? "All" : key.charAt(0) + key.slice(1).toLowerCase()}
                {key !== "ALL" && ` (${counts[key]})`}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-8 card-dark p-6">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {!error && !items && (
          <div className="mt-8 space-y-3">
            <div className="card-dark h-20 animate-pulse rounded-2xl" />
            <div className="card-dark h-20 animate-pulse rounded-2xl" />
          </div>
        )}

        {!error && items && items.length === 0 && (
          <div className="mt-8 card-dark p-6 text-sm text-secondary">
            No deadlines on your calendar yet — they&apos;ll show up here once your tax profile is set up.
          </div>
        )}

        {!error && items && items.length > 0 && grouped.length === 0 && (
          <div className="mt-8 card-dark p-6 text-sm text-secondary">
            Nothing in this filter right now.
          </div>
        )}

        {!error && grouped.length > 0 && (
          <div className="mt-8 space-y-8">
            {grouped.map(([key, monthItems]) => (
              <div key={key}>
                <h2 className="mb-3 text-xl font-bold">{monthLabel(key)}</h2>
                <div className="space-y-2">
                  {monthItems.map((item) => (
                    <div
                      key={item.id}
                      className={`card-dark flex flex-col gap-2 border p-4 sm:flex-row sm:items-center sm:justify-between ${statusColor(
                        item.status
                      )}`}
                    >
                      <div className="flex items-center gap-2">
                        {statusIcon(item.status)}
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-xs text-secondary">{TYPE_LABELS[item.type] ?? item.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:justify-end">
                        <span className="text-xs text-secondary">
                          {item.status.replace("_", " ")} · due{" "}
                          {new Date(item.dueDate).toLocaleDateString(undefined, {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        {item.status !== "COMPLETED" && item.recommendedServiceId && (
                          <Link
                            href={`/intake?id=${item.recommendedServiceId}`}
                            className="shrink-0 text-xs font-semibold text-blue-400"
                          >
                            Fix
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
