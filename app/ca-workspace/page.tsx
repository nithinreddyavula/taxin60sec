"use client";

import { useEffect, useState } from "react";
import { MessagesSquare, UserRound } from "lucide-react";
import AppShell from "@/components/AppShell";
import { CaseService, CaseItem } from "@/services/case-service";

const pretty = (value?: string) => value?.replaceAll("_", " ") ?? "Pending";

export default function CaWorkspacePage() {
  const [cases, setCases] = useState<CaseItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    CaseService.list()
      .then((page) => setCases(page.items))
      .catch((e) => setError(e instanceof Error ? e.message : "Unable to load your cases"));
  }, []);

  const active = cases?.filter((c) => c.status !== "COMPLETED") ?? [];

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <p className="eyebrow">CA Workspace</p>
      <h1 className="mt-2 text-3xl font-bold">Track your work with your CA</h1>
      <p className="mt-2 text-secondary">
        Every active case, and the Chartered Accountant handling it.
      </p>

      {error && <p className="mt-6 text-sm text-red-300">{error}</p>}

      {!cases && !error && (
        <div className="mt-6 space-y-3">
          <div className="h-24 animate-pulse rounded-2xl bg-white/5" />
          <div className="h-24 animate-pulse rounded-2xl bg-white/5" />
        </div>
      )}

      {cases && active.length === 0 && (
        <p className="mt-6 rounded-xl border border-dashed border-white/15 p-6 text-center text-sm text-secondary">
          No active cases right now.
        </p>
      )}

      <div className="mt-6 space-y-4">
        {active.map((c) => (
          <div key={c.id} className="card-dark flex items-center justify-between gap-4 p-5">
            <div className="min-w-0">
              <p className="eyebrow">{c.caseNumber}</p>
              <p className="mt-1 truncate font-semibold">{c.title}</p>
              <p className="mt-1 text-sm text-secondary">{pretty(c.workflowStage)}</p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
  <div className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2">
    <UserRound size={16} className="text-blue-300" />
    <div>
      <p className="text-xs text-secondary">Your CA</p>
      <p className="text-sm font-semibold">
        {c.assignedCaName ?? "Not yet assigned"}
      </p>
    </div>
  </div>

  {c.assignedCaName && (
    <a
      href="https://wa.me/917013734079"
      target="_blank"
      rel="noreferrer"
      className="btn-secondary !w-auto px-4"
    >
      <MessagesSquare size={16} />
      Chat with CA
    </a>
  )}
</div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}