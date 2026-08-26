"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DeadlinesService, Deadline } from "@/services/deadlines-service";
import { track } from "@/lib/analytics";

function urgencyColor(days: number) {
  if (days <= 5) return "text-red-500";
  if (days <= 15) return "text-amber-500";
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
    if (!/^\+?[1-9]\d{7,14}$/.test(phone.replace(/[\s-]/g, ""))) { toast.error("Enter a valid WhatsApp number with country code"); return; }
    track("deadline_subscription_started");
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
    <section id="deadlines" className="section-space scroll-mt-20">
      <div className="container-main">
        <div className="section-header">
          <p className="eyebrow">Free, no signup needed</p>
          <h2 className="section-title mt-3">This Month&apos;s Tax Deadlines</h2>
          <p className="section-copy mt-3">
            Check upcoming dates, bookmark this page, or opt in to a monthly WhatsApp reminder.
          </p>
        </div>

        <div className="card-dark mx-auto max-w-2xl p-6">
          <div className="space-y-3">
            {deadlines.map((d) => (
              <div
                key={d.type}
                className="flex items-center justify-between rounded-xl border border-white/8 p-4"
              >
                <span className="font-semibold text-white">{d.title}</span>
                <span className={`text-sm font-medium ${urgencyColor(d.daysRemaining)}`}>
                  {new Date(d.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  {" · "}
                  {d.daysRemaining <= 0 ? "Due today" : `${d.daysRemaining}d left`}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-white/8 pt-5">
            {subscribed ? (
              <p className="text-center text-sm text-emerald-400">
                You&apos;re subscribed — see you next month.
              </p>
            ) : (
              <>
                <p className="mb-3 text-sm font-semibold text-white">
                  Get next month&apos;s deadlines on WhatsApp, free
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your WhatsApp number"
                    className="input-dark flex-1 px-4 py-2 text-sm"
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
