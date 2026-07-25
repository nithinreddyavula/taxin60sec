"use client";

import AppShell from "@/components/AppShell";

export default function DashboardPage() {
  console.log("Dashboard rendered");

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <h1 style={{ color: "white", fontSize: "32px" }}>
        Dashboard Works
      </h1>
    </AppShell>
  );
}