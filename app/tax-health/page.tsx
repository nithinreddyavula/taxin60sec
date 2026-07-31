"use client";

import AppShell from "@/components/AppShell";
import ComplianceScoreWidget from "@/components/ComplianceScoreWidget";

export default function TaxHealthPage() {
  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <p className="eyebrow">Your Tax Health</p>
      <h1 className="mt-2 text-3xl font-bold">Here&apos;s how we analyzed your profile</h1>
      <p className="mt-2 text-secondary">
        Your score updates automatically as obligations are tracked, completed, or fall overdue.
      </p>

      <div className="mt-6">
        <ComplianceScoreWidget />
      </div>
    </AppShell>
  );
}