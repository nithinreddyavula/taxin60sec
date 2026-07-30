"use client";

import AppShell from "@/components/AppShell";
import CommandCenter from "@/components/CommandCenter";

export default function CommandCenterPage() {
  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <p className="eyebrow">Multi-entity overview</p>
      <h1 className="mt-2 text-3xl font-bold">Command Center</h1>
      <p className="mt-2 text-secondary">
        If you run more than one business - a company, an LLP, a proprietorship on the side - manage all of them from one place.
      </p>

      <div className="mt-6">
        <CommandCenter />
      </div>
    </AppShell>
  );
}