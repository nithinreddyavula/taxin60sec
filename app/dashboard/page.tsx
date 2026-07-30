"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import ComplianceScoreWidget from "@/components/ComplianceScoreWidget";
import ReferralCard from "@/components/ReferralCard";

export default function DashboardPage() {
  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <p className="eyebrow">Overview</p>
      <h1 className="mt-2 text-3xl font-bold">Your dashboard</h1>

      <div className="mt-6 space-y-6">
        <ComplianceScoreWidget />

        <Link href="/vault" className="card-dark flex items-center justify-between p-5">
          <div>
            <p className="font-semibold">Document Vault</p>
            <p className="text-sm text-secondary">All your submitted documents, organized by year</p>
          </div>
          <span className="btn-secondary shrink-0">Open Vault</span>
        </Link>

        <ReferralCard />
      </div>
    </AppShell>
  );
}