"use client";

import { useCallback, useEffect, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { SupportTicket, SupportTicketMessage, SupportTicketService } from "@/services/support-ticket-services";

export default function CaseSupportPanel({ caseId }: { caseId: number }) {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [openTicket, setOpenTicket] = useState<SupportTicket | null>(null);
  const [messages, setMessages] = useState<SupportTicketMessage[]>([]);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(() => {
    SupportTicketService.forCase(caseId)
      .then((res) => setTickets(res.items))
      .finally(() => setLoading(false));
  }, [caseId]);

  useEffect(() => {
    const timer = window.setTimeout(load, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  async function openThread(ticket: SupportTicket) {
    setOpenTicket(ticket);
    const msgs = await SupportTicketService.messages(ticket.id);
    setMessages(msgs);
  }

  async function createTicket() {
    if (!subject.trim() || !message.trim() || submitting) return;
    setSubmitting(true);
    try {
      const ticket = await SupportTicketService.create(subject.trim(), message.trim(), caseId);
      setSubject("");
      setMessage("");
      load();
      openThread(ticket);
    } finally {
      setSubmitting(false);
    }
  }

  async function sendReply() {
    if (!openTicket || !reply.trim() || submitting) return;
    setSubmitting(true);
    try {
      const sent = await SupportTicketService.reply(openTicket.id, reply.trim());
      setMessages((prev) => [...prev, sent]);
      setReply("");
    } finally {
      setSubmitting(false);
    }
  }

  if (openTicket) {
    return (
      <section className="card-dark p-5">
        <button onClick={() => setOpenTicket(null)} className="text-sm font-semibold text-emerald-400 hover:text-emerald-300">
          ← Back to tickets
        </button>

        <h2 className="mt-3 font-bold">{openTicket.subject}</h2>
        <p className="mt-1 text-xs text-secondary">
          Status: {openTicket.status.replace("_", " ")}
        </p>

        <div className="mt-4 max-h-72 space-y-3 overflow-y-auto">
          {messages.map((m) => (
            <div key={m.id} className="rounded-xl bg-white/5 p-3">
              <p className="text-xs font-semibold text-secondary">{m.senderName}</p>
              <p className="mt-1 text-sm">{m.body}</p>
            </div>
          ))}
        </div>

        {openTicket.status !== "RESOLVED" && (
          <div className="mt-4 flex items-center gap-2">
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendReply()}
              placeholder="Type a reply..."
              className="input-dark flex-1 p-2.5 text-sm"
            />
            <button
              onClick={sendReply}
              disabled={submitting}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white disabled:opacity-50"
              aria-label="Send reply"
            >
              <Send size={16} />
            </button>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="card-dark p-5">
      <div className="text-center">
        <MessageCircle className="mx-auto text-emerald-400" size={28} />
        <h2 className="mt-3 font-bold">Need help with this case?</h2>
        <p className="mt-2 text-sm text-secondary">
          Raise a ticket and our support team will get back to you here.
        </p>
      </div>

      <div className="mt-5 space-y-2">
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="input-dark w-full p-3 text-sm"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your issue..."
          rows={3}
          className="input-dark w-full p-3 text-sm"
        />
        <button onClick={createTicket} disabled={submitting} className="btn-primary w-full disabled:opacity-50">
          {submitting ? "Sending..." : "Raise a ticket"}
        </button>
      </div>

      {!loading && tickets.length > 0 && (
        <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Your tickets</p>
          {tickets.map((t) => (
            <button
              key={t.id}
              onClick={() => openThread(t)}
              className="flex w-full items-center justify-between rounded-xl bg-white/5 p-3 text-left text-sm hover:bg-white/10"
            >
              <span>{t.subject}</span>
              <span className="text-xs text-secondary">{t.status.replace("_", " ")}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
