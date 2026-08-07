"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Send, ShieldCheck } from "lucide-react";
import { useAppSession } from "@/components/AppProviders";
import { MessageService, CaseMessage } from "@/services/message-service";

const roleLabel: Record<CaseMessage["senderRole"], string> = {
  CLIENT: "Client",
  CA: "CA",
  ADMIN: "Tax60 Team",
};

export default function CaseChat({ caseId }: { caseId: number }) {
  const { user } = useAppSession();
  const [messages, setMessages] = useState<CaseMessage[] | null>(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  function load() {
    MessageService.list(caseId)
      .then((data) => {
        setMessages(data);
        setError("");
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Unable to load messages"));
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 8000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setSending(true);
    try {
      const sent = await MessageService.send(caseId, draft.trim());
      setMessages((prev) => [...(prev ?? []), sent]);
      setDraft("");
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to send message");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="card-light flex h-[420px] flex-col overflow-hidden">
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
        <ShieldCheck size={16} className="text-emerald-600" />
        <p className="text-sm font-semibold text-slate-700">Secure Tax60 chat</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {!messages && !error && <div className="h-16 animate-pulse rounded-xl bg-slate-100" />}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {messages?.length === 0 && (
          <p className="text-center text-sm text-slate-400">
            No messages yet. Everything here stays inside Tax60 - your CA never sees your phone number.
          </p>
        )}

        {messages?.map((m) => {
          const isMine = m.senderId === user?.id;
          return (
            <div key={m.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${isMine ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-800"}`}>
                {!isMine && <p className="mb-0.5 text-xs font-semibold opacity-70">{roleLabel[m.senderRole]}</p>}
                <p>{m.body}</p>
                <p className={`mt-1 text-[10px] ${isMine ? "text-emerald-100" : "text-slate-400"}`}>
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-slate-100 p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={sending || !draft.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white disabled:opacity-50"
          aria-label="Send message"
        >
          <Send size={17} />
        </button>
      </form>
    </div>
  );
}