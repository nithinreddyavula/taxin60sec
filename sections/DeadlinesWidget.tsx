"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DeadlinesService, Deadline } from "@/services/deadlines-service";

function urgencyColor(days: number) {
  if (days <= 5) return "text-red-400";
  if (days <= 15) return "text-yellow-400";
  return "text-secondary";
}

export default function DeadlinesWidget() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [phone, setPhone] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    DeadlinesService.upcoming()
      .then((res) => setDeadlines(res.deadlines))
      .catch(() => setDeadlines([]));
  }, []);

  async function subscribe() {
    if (!phone.trim()) return;
    setSubscribing(true);
    try {
      await DeadlinesService.subscribe(phone.trim());
      setSubscribed(true);
      toast.success("You'll get a WhatsApp reminder every month");
    } catch {
      toast.error("Unable to subscribe right now");
    } finally {
      setSubscribing(false);
    }
  }

  return (
    <section className="section-space">
      <div className="container-main">
        <div className="section-header">
          <p className="eyebrow">Free, no signup needed</p>
          <h2 className="section-title mt-3">This Month&apos;s Tax Deadlines</h2>
          <p className="section-copy mt-3">
            Every Indian business needs this — bookmark it, share it, or get it on WhatsApp free.
          </p>
        </div>

        <div className="card-dark mx-auto max-w-2xl p-6">
          <div className="space-y-3">
            {deadlines.map((d) => (
              <div
                key={d.type}
                className="flex items-center justify-between rounded-xl border border-white/10 p-4"
              >
                <span className="font-semibold">{d.title}</span>
                <span className={`text-sm font-medium ${urgencyColor(d.daysRemaining)}`}>
                  {new Date(d.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  {" · "}
                  {d.daysRemaining <= 0 ? "Due today" : `${d.daysRemaining}d left`}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            {subscribed ? (
              <p className="text-center text-sm text-green-400">
                You&apos;re subscribed — see you next month.
              </p>
            ) : (
              <>
                <p className="mb-3 text-sm font-semibold">
                  Get next month&apos;s deadlines on WhatsApp, free
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your WhatsApp number"
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm"
                  />
                  <button
                    onClick={subscribe}
                    disabled={!phone.trim() || subscribing}
                    className="btn-primary shrink-0 disabled:opacity-50"
                  >
                    {subscribing ? "Subscribing..." : "Notify me monthly"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}