"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { useParams } from "next/navigation";
import { AdminService, AuditLog } from "@/services/admin-service";

export default function AuditLogDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [log, setLog] = useState<AuditLog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminService.auditLogDetail(id).then(setLog).catch(() => setLog(null)).finally(() => setLoading(false));
  }, [id]);

  return (
    <AppShell roles={["ROLE_ADMIN"]}>
      <Link href="/admin/audit-logs" className="text-sm font-semibold text-blue-400">← Back to Audit Logs</Link>
      <h1 className="mt-3 text-3xl font-bold">Audit Log Details</h1>

      {loading && <div className="card-dark mt-6 h-40 animate-pulse" />}

      {!loading && log && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="card-dark p-5">
            <p className="font-bold">Log Information</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-secondary">Date & Time</dt><dd>{new Date(log.createdAt).toLocaleString()}</dd></div>
              <div className="flex justify-between"><dt className="text-secondary">User</dt><dd>{log.actorId}</dd></div>
              <div className="flex justify-between"><dt className="text-secondary">Action</dt><dd>{log.action}</dd></div>
              <div className="flex justify-between"><dt className="text-secondary">Module</dt><dd>{log.entityType}</dd></div>
              <div className="flex justify-between"><dt className="text-secondary">Entity ID</dt><dd>{log.entityId}</dd></div>
            </dl>
          </section>

          <section className="card-dark p-5">
            <p className="font-bold">Additional Information</p>
            <pre className="mt-4 whitespace-pre-wrap break-words rounded-lg bg-black/20 p-3 text-xs text-secondary">
              {log.attributes ?? "No additional attributes recorded."}
            </pre>
          </section>
        </div>
      )}

      {!loading && !log && <p className="mt-6 text-sm text-secondary">Log not found.</p>}
    </AppShell>
  );
}