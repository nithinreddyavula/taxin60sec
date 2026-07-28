"use client";

import { useEffect, useState } from "react";
import { ComplianceService, ComplianceScore } from "@/services/compliance-service";

function scoreColor(score: number) {
  if (score >= 85) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
}

function badgeStyle(score: number) {
  if (score >= 85) return "bg-green-500/10 text-green-400";
  if (score >= 60) return "bg-yellow-500/10 text-yellow-400";
  return "bg-red-500/10 text-red-400";
}

function statusStyle(status: string) {
  if (status === "COMPLETED") return "text-green-400";
  if (status === "OVERDUE") return "text-red-400";
  return "text-yellow-400";
}

function statusText(status: string, dueDate: string) {
  if (status === "COMPLETED") return "Filed";
  if (status === "OVERDUE") return "Overdue";
  const days = Math.ceil(
    (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  return days <= 0 ? "Due today" : `Due in ${days}d`;
}

export default function TaxHealthScore() {
  const [data, setData] = useState<ComplianceScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  ComplianceService.myScore()
    .then(setData)
    .catch(() => setData(null))
    .finally(() => setLoading(false));
}, []);

  if (loading) {
    return <div className="card-dark p-5 animate-pulse h-40" />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="card-dark p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-sm text-secondary mb-1">
            Your tax health score
          </p>
          <p className={`text-3xl font-medium ${scoreColor(data.score)}`}>
            {data.score}
            <span className="text-base text-secondary">/100</span>
          </p>
        </div>

        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${badgeStyle(
            data.score
          )}`}
        >
          {data.statusLabel}
        </span>
      </div>

      {data.items.length === 0 ? (
        <p className="text-sm text-secondary">
          No compliance items tracked yet — this fills in automatically as
          you file with us.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
          {data.items.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="bg-white/5 rounded-lg p-2.5"
            >
              <p className="text-xs text-secondary mb-1 truncate">
                {item.title}
              </p>
              <p
                className={`text-sm font-medium ${statusStyle(item.status)}`}
              >
                {statusText(item.status, item.dueDate)}
              </p>
            </div>
          ))}
        </div>
      )}

      {data.nextDue && (
        <div className="flex items-center gap-2.5 bg-yellow-500/10 rounded-lg px-3 py-2.5">
          <span className="text-sm text-yellow-400">
            {data.nextDue.title} — {statusText(data.nextDue.status, data.nextDue.dueDate)}
          </span>
        </div>
      )}
    </div>
  );
}