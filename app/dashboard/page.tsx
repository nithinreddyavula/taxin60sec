"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell, Briefcase, CheckCircle2, Circle, Files, HeartPulse, Home } from "lucide-react";
import AppShell from "@/components/AppShell";
import ReferralCard from "@/components/ReferralCard";
import TierBadge from "@/components/TierBadge";
import { useAppSession } from "@/components/AppProviders";
import { CaseService, CaseItem } from "@/services/case-service";
import { NoticeService } from "@/services/notice-service";
import { ComplianceService, ComplianceScore } from "@/services/compliance-service";
import { VaultService, VaultDocument } from "@/services/vault-service";
import { DeadlinesService, Deadline } from "@/services/deadlines-service";
import { MessageService, CaseMessage } from "@/services/message-service";
import { CASE_STAGES, caseStageIndex, NEXT_ACTION_COPY } from "@/lib/case-stage";

function firstName(fullName?: string) {
  if (!fullName) return "there";
  return fullName.trim().split(" ")[0];
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const { user } = useAppSession();
  const [cases, setCases] = useState<CaseItem[] | null>(null);
  const [unread, setUnread] = useState(0);
  const [score, setScore] = useState<ComplianceScore | null>(null);
  const [documents, setDocuments] = useState<VaultDocument[]>([]);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [latestMessage, setLatestMessage] = useState<CaseMessage | null>(null);

  useEffect(() => {
    CaseService.list().then((page) => setCases(page.items)).catch(() => setCases([]));
    NoticeService.unreadCount().then((res) => setUnread(res.unread)).catch(() => {});
    ComplianceService.myScore().then(setScore).catch(() => {});
    VaultService.list().then(setDocuments).catch(() => {});
    DeadlinesService.upcoming().then((res) => setDeadlines(res.deadlines)).catch(() => {});
  }, []);

  const activeCase = cases?.find((c) => c.status !== "COMPLETED" && c.status !== "CANCELLED") ?? cases?.[0] ?? null;

  useEffect(() => {
    if (activeCase?.id) {
      MessageService.list(activeCase.id)
        .then((messages) => setLatestMessage(messages[messages.length - 1] ?? null))
        .catch(() => {});
    }
  }, [activeCase?.id]);

  const currentStep = caseStageIndex(activeCase?.workflowStage);
  const pendingActions = cases?.filter((c) => c.workflowStage === "CLIENT_ACTION_REQUIRED").length ?? 0;

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {greeting()}, {firstName(user?.fullName)}!
          </h1>
          <p className="mt-2 text-secondary">Here&apos;s what&apos;s happening with your tax journey.</p>
        </div>
        <Link href="/" className="btn-secondary !w-auto shrink-0 px-4">
          <Home size={16} /> Home
        </Link>
      </div>

      {/* Stat tiles */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="card-dark p-4">
          <Briefcase size={18} className="text-emerald-400" />
          <p className="mt-2 text-2xl font-bold">
            {cases?.filter((c) => c.status !== "COMPLETED" && c.status !== "CANCELLED").length ?? "—"}
          </p>
          <p className="text-xs text-secondary">Active Cases</p>
          <Link href="/my-services" className="mt-1 block text-xs font-semibold text-emerald-700">View all</Link>
        </div>
        <div className="card-dark p-4">
          <Bell size={18} className="text-amber-400" />
          <p className="mt-2 text-2xl font-bold">{pendingActions}</p>
          <p className="text-xs text-secondary">Pending Actions</p>
          <Link href="/notices" className="mt-1 block text-xs font-semibold text-emerald-700">View now</Link>
        </div>
        <div className="card-dark p-4">
          <Files size={18} className="text-blue-400" />
          <p className="mt-2 text-2xl font-bold">{documents.length}</p>
          <p className="text-xs text-secondary">Documents</p>
          <Link href="/vault" className="mt-1 block text-xs font-semibold text-emerald-700">In Vault</Link>
        </div>
        <div className="card-dark p-4">
          <HeartPulse size={18} className="text-emerald-400" />
          <p className="mt-2 text-2xl font-bold">{score?.score ?? "—"}<span className="text-sm text-secondary">/100</span></p>
          <p className="text-xs text-secondary">Tax Health Score</p>
          <Link href="/tax-health" className="mt-1 block text-xs font-semibold text-emerald-700">{score?.statusLabel ?? "View"}</Link>
        </div>
      </div>

      {/* Current case */}
      {cases === null ? (
        <div className="card-dark mt-6 h-40 animate-pulse" />
      ) : activeCase ? (
        <section className="card-dark mt-6 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold">{activeCase.title}</p>
                <span className="pill-blue rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  {activeCase.status.replaceAll("_", " ")}
                </span>
              </div>
              <p className="mt-1 text-xs text-secondary">Case ID: {activeCase.caseNumber}</p>
            </div>
            <Link href={`/cases/${activeCase.id}`} className="btn-primary shrink-0 !w-auto px-5">
              Open case <ArrowRight size={16} />
            </Link>
          </div>

          <ol className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {CASE_STAGES.map((stage, index) => (
              <li key={stage} className={`rounded-xl border p-3 text-xs font-semibold ${index <= currentStep ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-400"}`}>
                {index <= currentStep ? <CheckCircle2 className="mb-2" size={16} /> : <Circle className="mb-2" size={16} />}
                {stage}
              </li>
            ))}
          </ol>

          <p className="mt-4 text-sm text-secondary">
            {NEXT_ACTION_COPY[activeCase.workflowStage] ?? "Your case is moving forward."}
          </p>
        </section>
      ) : (
        <section className="card-dark mt-6 p-6">
          <p className="font-semibold">No active case right now.</p>
          <p className="mt-1 text-sm text-secondary">Start a filing whenever you&apos;re ready — it takes about 60 seconds.</p>
          <Link href="/intake" className="btn-primary mt-4 !w-auto px-5">Start a case</Link>
        </section>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Next action required */}
        {activeCase && (
          <section className="card-dark p-5">
            <p className="font-bold">Next Action Required</p>
            <p className="mt-2 text-sm text-secondary">{NEXT_ACTION_COPY[activeCase.workflowStage] ?? "No action needed right now."}</p>
            <Link href={`/cases/${activeCase.id}`} className="btn-primary mt-4 !w-auto px-5">
              Open case
            </Link>
          </section>
        )}

        {/* Message preview */}
        {latestMessage && (
          <section className="card-dark p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{latestMessage.senderName}</p>
                <p className="text-xs text-secondary">{latestMessage.senderRole}</p>
              </div>
              <p className="text-xs text-secondary">{new Date(latestMessage.createdAt).toLocaleString()}</p>
            </div>
            <p className="mt-3 text-sm text-secondary">{latestMessage.body}</p>
            {activeCase && (
              <Link href={`/cases/${activeCase.id}`} className="mt-3 inline-block text-xs font-semibold text-emerald-700">
                View Message
              </Link>
            )}
          </section>
        )}
      </div>

      {/* Upcoming deadlines */}
      {deadlines.length > 0 && (
        <section className="card-dark mt-6 p-5">
          <p className="font-bold">Upcoming Deadlines</p>
          <div className="mt-4 space-y-3">
            {deadlines.map((d) => (
              <div key={`${d.type}-${d.title}`} className="flex items-center justify-between text-sm">
                <span>{d.title}</span>
                <span className="text-xs text-secondary">
                  {new Date(d.dueDate).toLocaleDateString()} · ({d.daysRemaining} days left)
                </span>
              </div>
            ))}
          </div>
          <Link href="/calendar" className="mt-4 inline-block text-xs font-semibold text-emerald-700">
            View All Deadlines
          </Link>
        </section>
      )}

      {unread > 0 && (
        <Link href="/notices" className="mt-4 flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
          <span className="flex items-center gap-2">
            <Bell size={16} /> {unread} new notice{unread > 1 ? "s" : ""}
          </span>
          <ArrowRight size={16} />
        </Link>
      )}

      <div className="mt-6 space-y-6">
        <TierBadge />
        <ReferralCard />
      </div>
    </AppShell>
  );
}