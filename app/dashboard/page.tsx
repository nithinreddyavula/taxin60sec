"use client";

import AppShell from "@/components/AppShell";
import ComplianceScoreWidget from "@/components/ComplianceScoreWidget";

export default function DashboardPage() {
  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <p className="eyebrow">Overview</p>
      <h1 className="mt-2 text-3xl font-bold">Your dashboard</h1>

      <div className="mt-6">
        <ComplianceScoreWidget />
      </div>
    </AppShell>
  );
}