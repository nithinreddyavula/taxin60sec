"use client";

import { useQuery } from "@tanstack/react-query";
import AppShell from "@/components/AppShell";
import { CaseService } from "@/services/case-service";

export default function DashboardPage() {
  const query = useQuery({
    queryKey: ["cases"],
    queryFn: () => CaseService.list(),
  });

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <pre className="text-white">
        {JSON.stringify(
          {
            isLoading: query.isLoading,
            isError: query.isError,
            error: query.error?.message,
            data: query.data,
          },
          null,
          2
        )}
      </pre>
    </AppShell>
  );
}