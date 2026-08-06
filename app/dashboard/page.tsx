"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell } from "lucide-react";
import AppShell from "@/components/AppShell";
import ComplianceScoreWidget from "@/components/ComplianceScoreWidget";
import ReferralCard from "@/components/ReferralCard";
import TierBadge from "@/components/TierBadge";
import { useAppSession } from "@/components/AppProviders";
import { CaseService, CaseItem } from "@/services/case-service";
import { NoticeService } from "@/services/notice-service";

// Phase 9 — dashboard should answer "what do I do now", not just list widgets.
const STAGE_ACTION: Record<string, string> = {
  CREATED: "We're reviewing what you've shared.",
  DOCUMENTS_PENDING: "Upload your documents to get things moving.",
  DOCUMENTS_UPLOADED: "Your documents are queued for verification.",
  DOCUMENTS_VERIFIED: "Documents verified — waiting for a CA to be assigned.",
  CA_ASSIGNED: "Your CA has been assigned and will begin review shortly.",
  UNDER_REVIEW: "Your CA is reviewing your documents.",
  CLIENT_ACTION_REQUIRED: "Your CA needs something from you — check messages.",
  READY_TO_FILE: "Your filing is ready — a payment request is coming.",
  PAYMENT_PENDING: "Payment is due to move your filing forward.",
  PAYMENT_COMPLETED: "Payment received — we're preparing your filing.",
  PROCESSING: "We're filing your return now.",
  FILED: "Filed! We're waiting on confirmation.",
  COMPLETED: "This case is complete.",
};

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

  useEffect(() => {
    CaseService.list()
      .then((page) => setCases(page.items))
      .catch(() => setCases([]));
    NoticeService.unreadCount()
      .then((res) => setUnread(res.unread))
      .catch(() => {
        // Non-critical - dashboard works without the notice count.
      });
  }, []);

  const activeCase = cases?.find((c) => c.status !== "COMPLETED") ?? cases?.[0] ?? null;
  const statusLine = activeCase
    ? STAGE_ACTION[activeCase.workflowStage] ?? "Your case is moving forward."
    : null;

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <p className="eyebrow">Overview</p>
      <h1 className="mt-2 text-3xl font-bold">
        {greeting()}, {firstName(user?.fullName)}
      </h1>
      <p className="mt-2 text-secondary">Everything is on track.</p>

      {cases === null ? (
        <div className="card-dark mt-6 h-28 animate-pulse" />
      ) : activeCase ? (
        <section className="card-dark mt-6 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-400">
                {activeCase.caseNumber} · {activeCase.title}
              </p>
              <p className="mt-2 text-lg font-semibold">{statusLine}</p>
            </div>
            <Link href={`/cases/${activeCase.id}`} className="btn-primary shrink-0 !w-auto px-5">
              Open case <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      ) : (
        <section className="card-dark mt-6 p-6">
          <p className="font-semibold">No active case right now.</p>
          <p className="mt-1 text-sm text-secondary">
            Start a filing whenever you&apos;re ready — it takes about 60 seconds.
          </p>
          <Link href="/intake" className="btn-primary mt-4 !w-auto px-5">
            Start a case
          </Link>
        </section>
      )}

      {unread > 0 && (
        <Link
          href="/notices"
          className="mt-4 flex items-center justify-between rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm font-semibold text-blue-200"
        >
          <span className="flex items-center gap-2">
            <Bell size={16} /> {unread} new notice{unread > 1 ? "s" : ""}
          </span>
          <ArrowRight size={16} />
        </Link>
      )}

      <div className="mt-6 space-y-6">
        <ComplianceScoreWidget />
        <TierBadge />
        <ReferralCard />
      </div>
    </AppShell>
  );
}