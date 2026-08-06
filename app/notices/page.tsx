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

  const unreadNotices = notices.filter((n) => !n.read);
  const readNotices = notices.filter((n) => n.read);

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

      <p className="mt-2 text-secondary">Everything that needs your attention, newest first.</p>

      <div className="mt-6 space-y-6">
        {loading && (
          <div className="card-dark h-20 animate-pulse rounded-2xl" />
        )}

        {!loading && notices.length === 0 && (
          <div className="card-dark p-6 text-sm text-secondary">
            No notices yet.
          </div>
        )}

        {!loading && unreadNotices.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-300">
              New
            </p>
            <div className="space-y-3">
              {unreadNotices.map((n) => (
                <NoticeRow key={n.id} notice={n} onMarkRead={markRead} />
              ))}
            </div>
          </div>
        )}

        {!loading && readNotices.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-secondary">
              Earlier
            </p>
            <div className="space-y-3">
              {readNotices.map((n) => (
                <NoticeRow key={n.id} notice={n} onMarkRead={markRead} />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function NoticeRow({
  notice,
  onMarkRead,
}: {
  notice: Notice;
  onMarkRead: (id: number) => void;
}) {
  return (
    <div
      className={`card-dark flex items-start gap-3 p-4 ${
        notice.read ? "opacity-60" : ""
      }`}
    >
      <span
        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
          severityColor[notice.severity] ?? "bg-slate-400"
        }`}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">{notice.title}</p>
          <p className="shrink-0 text-xs text-secondary">
            {new Date(notice.createdAt).toLocaleDateString()}
          </p>
        </div>
        {notice.message && (
          <p className="mt-1 text-sm text-secondary">{notice.message}</p>
        )}
        {notice.caseNumber && (
          <p className="mt-1 text-xs text-secondary">
            Case: {notice.caseNumber}
          </p>
        )}
      </div>
      {!notice.read && (
        <button
          onClick={() => onMarkRead(notice.id)}
          className="shrink-0 text-xs font-semibold text-blue-400 hover:text-blue-300"
        >
          Mark read
        </button>
      )}
    </div>
  );
}