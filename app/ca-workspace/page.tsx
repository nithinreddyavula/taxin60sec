"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, MessagesSquare, UserRound } from "lucide-react";
import AppShell from "@/components/AppShell";
import CaseChat from "@/components/CaseChat";
import { CaseService, CaseItem } from "@/services/case-service";

const pretty = (value?: string) => value?.replaceAll("_", " ") ?? "Pending";

export default function CaWorkspacePage() {
  const [cases, setCases] = useState<CaseItem[] | null>(null);
  const [error, setError] = useState("");
  const [openChatId, setOpenChatId] = useState<number | null>(null);

  useEffect(() => {
    CaseService.list()
      .then((page) => setCases(page.items))
      .catch((e) => setError(e instanceof Error ? e.message : "Unable to load your cases"));
  }, []);

  const active = cases?.filter((c) => c.status !== "COMPLETED") ?? [];

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">CA Workspace</p>
      <h1 className="mt-2 text-3xl font-bold">Track your work with your CA</h1>
      <p className="mt-2 text-secondary">
        Every active case, and the Chartered Accountant handling it. All messages stay inside Tax60.
      </p>

      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

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
        {active.map((c) => {
          const chatOpen = openChatId === c.id;
          return (
            <div key={c.id} className="card-light overflow-hidden">
              <div className="flex items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">{c.caseNumber}</p>
                  <p className="mt-1 truncate font-semibold text-slate-900">{c.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{pretty(c.workflowStage)}</p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <UserRound size={16} className="text-emerald-600" />
                    <div>
                      <p className="text-xs text-slate-500">Your CA</p>
                      <p className="text-sm font-semibold text-slate-800">{c.assignedCaName ?? "Not yet assigned"}</p>
                    </div>
                  </div>
                  {c.assignedCaName && (
                    <button
                      onClick={() => setOpenChatId(chatOpen ? null : c.id)}
                      className="btn-secondary !w-auto border-slate-200 !bg-slate-50 px-4 !text-slate-700"
                    >
                      <MessagesSquare size={16} /> Chat
                      {chatOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                  )}
                </div>
              </div>

              {chatOpen && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-4">
                  <CaseChat caseId={c.id} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}