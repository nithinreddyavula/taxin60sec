"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { Notice, NoticeService } from "@/services/notice-service";

const severityColor: Record<string, string> = {
  ACTION_REQUIRED: "bg-red-400",
  WARNING: "bg-amber-400",
  INFO: "bg-blue-400",
};

const severityLabel: Record<string, string> = {
  ACTION_REQUIRED: "Action Required",
  WARNING: "Update",
  INFO: "Information",
};

const TABS = ["All", "Unread", "Action Required", "Updates", "Information"] as const;

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  useEffect(() => {
    let active = true;
    NoticeService.list()
      .then((res) => { if (active) setNotices(res.items); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  async function markRead(id: number) {
    await NoticeService.markRead(id);
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  async function markAllRead() {
    await NoticeService.markAllRead();
    setNotices((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const filtered = notices.filter((n) => {
    if (tab === "All") return true;
    if (tab === "Unread") return !n.read;
    if (tab === "Action Required") return n.severity === "ACTION_REQUIRED";
    if (tab === "Updates") return n.severity === "WARNING";
    return n.severity === "INFO";
  });

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notices & Alerts</h1>
          <p className="mt-2 text-secondary">Important notices and updates from tax authorities.</p>
        </div>
        <button onClick={markAllRead} className="text-sm font-semibold text-blue-400 hover:text-blue-300">
          Mark all as read
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === t ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {loading && <div className="card-dark h-20 animate-pulse rounded-2xl" />}
            {!loading && filtered.length === 0 && <div className="card-dark p-6 text-sm text-secondary">No notices here.</div>}

            {filtered.map((n) => (
              <div key={n.id} className={`card-dark flex items-start gap-3 p-4 ${n.read ? "opacity-70" : ""}`}>
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${severityColor[n.severity] ?? "bg-slate-400"}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{n.title}</p>
                    <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-secondary">
                      {severityLabel[n.severity] ?? n.severity}
                    </span>
                  </div>
                  {n.message && <p className="mt-1 text-sm text-secondary">{n.message}</p>}
                  <p className="mt-1 text-xs text-secondary">Received on {new Date(n.createdAt).toLocaleDateString()}</p>
                </div>
                {!n.read && (
                  <button onClick={() => markRead(n.id)} className="shrink-0 text-xs font-semibold text-blue-400 hover:text-blue-300">
                    Mark read
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <section className="card-dark p-5">
            <p className="font-bold">Quick Info</p>
            <ul className="mt-3 space-y-2 text-sm text-secondary">
              <li>Stay updated with real-time alerts</li>
              <li>We&apos;ll notify you for important deadlines</li>
              <li>Take action on time to avoid penalties</li>
            </ul>
          </section>

          <section className="card-dark p-5">
            <p className="font-bold">Need Help?</p>
            <p className="mt-1 text-sm text-secondary">Our support team is here for you.</p>
            <button className="btn-primary mt-3 w-full">Chat on WhatsApp</button>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
