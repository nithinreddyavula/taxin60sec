"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { Notice, NoticeService } from "@/services/notice-service";

const severityColor: Record<string, string> = {
  ACTION_REQUIRED: "bg-red-400",
  WARNING: "bg-yellow-400",
  INFO: "bg-blue-400",
};

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    NoticeService.list()
      .then((res) => setNotices(res.items))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function markRead(id: number) {
    await NoticeService.markRead(id);
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  async function markAllRead() {
    await NoticeService.markAllRead();
    setNotices((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Notices</p>
          <h1 className="mt-2 text-3xl font-bold">Your notices</h1>
        </div>
        <button
          onClick={markAllRead}
          className="text-sm font-semibold text-blue-400 hover:text-blue-300"
        >
          Mark all read
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading && (
          <div className="card-dark h-20 animate-pulse rounded-2xl" />
        )}

        {!loading && notices.length === 0 && (
          <div className="card-dark p-6 text-sm text-secondary">
            No notices yet.
          </div>
        )}

        {notices.map((n) => (
          <div
            key={n.id}
            className={`card-dark flex items-start gap-3 p-4 ${
              n.read ? "opacity-60" : ""
            }`}
          >
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                severityColor[n.severity] ?? "bg-slate-400"
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{n.title}</p>
                <p className="shrink-0 text-xs text-secondary">
                  {new Date(n.createdAt).toLocaleDateString()}
                </p>
              </div>
              {n.message && (
                <p className="mt-1 text-sm text-secondary">{n.message}</p>
              )}
              {n.caseNumber && (
                <p className="mt-1 text-xs text-secondary">
                  Case: {n.caseNumber}
                </p>
              )}
            </div>
            {!n.read && (
              <button
                onClick={() => markRead(n.id)}
                className="shrink-0 text-xs font-semibold text-blue-400 hover:text-blue-300"
              >
                Mark read
              </button>
            )}
          </div>
        ))}
      </div>
    </AppShell>
  );
}