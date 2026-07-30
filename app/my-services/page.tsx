"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { CaseItem, CaseService } from "@/services/case-service";

const stageLabel: Record<string, string> = {
  CREATED: "Created",
  PAYMENT_PENDING: "Payment Pending",
  PAYMENT_COMPLETED: "Payment Completed",
  DOCUMENTS_PENDING: "Documents Pending",
  DOCUMENTS_UPLOADED: "Documents Uploaded",
  DOCUMENTS_VERIFIED: "Documents Verified",
  CA_ASSIGNED: "CA Assigned",
  UNDER_REVIEW: "Under Review",
  CLIENT_ACTION_REQUIRED: "Action Required",
  PROCESSING: "Processing",
  READY_TO_FILE: "Ready to File",
  FILED: "Filed",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
};

const statusFilters = ["ALL", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

export default function MyServicesPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<(typeof statusFilters)[number]>("ALL");

  useEffect(() => {
    CaseService.list()
      .then((res) => setCases(res.items))
      .finally(() => setLoading(false));
  }, []);

  const filtered = cases.filter((c) => {
    if (filter === "ALL") return true;
    if (filter === "COMPLETED") return c.status === "COMPLETED";
    if (filter === "CANCELLED") return c.status === "CANCELLED";
    return c.status !== "COMPLETED" && c.status !== "CANCELLED";
  });

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <p className="eyebrow">My Services</p>
      <h1 className="mt-2 text-3xl font-bold">Track all your services</h1>

      <div className="mt-6 flex gap-2">
        {statusFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              filter === f
                ? "bg-blue-500 text-white"
                : "bg-white/5 text-secondary hover:bg-white/10"
            }`}
          >
            {f.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {loading && <div className="card-dark h-20 animate-pulse rounded-2xl" />}

        {!loading && filtered.length === 0 && (
          <div className="card-dark p-6 text-sm text-secondary">
            No services here.
          </div>
        )}

        {filtered.map((c) => (
          <Link
            key={c.id}
            href={`/cases/${c.id}`}
            className="card-dark flex items-center justify-between gap-4 p-4 hover:bg-white/[0.04]"
          >
            <div>
              <p className="text-sm font-semibold">{c.title}</p>
              <p className="mt-1 text-xs text-secondary">
                {c.caseNumber} · {stageLabel[c.workflowStage] ?? c.workflowStage}
              </p>
            </div>
            <span className="shrink-0 text-xs font-semibold text-blue-400">
              {c.status}
            </span>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}