"use client";

import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { AiChatService, ChatMessage } from "@/services/ai-chat-service";

export default function AskTax60({ caseId }: { caseId: number }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setSending(true);
    try {
      const res = await AiChatService.send(caseId, text);
      setMessages((prev) => [...prev, { role: "assistant", content: res.message }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't respond right now." },
      ]);
    } finally {
      setSending(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-slate-900 shadow-lg hover:bg-blue-400"
        aria-label="Ask Tax60"
      >
        <MessageCircle size={22} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 z-40 flex h-[28rem] w-80 flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <p className="text-sm font-semibold">Ask Tax60</p>
        <button onClick={() => setOpen(false)} aria-label="Close chat">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="text-sm text-secondary">
            Ask anything about your tax filing or compliance.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
              m.role === "user"
                ? "ml-auto bg-blue-500 text-slate-900"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-slate-200 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask anything..."
          className="input-dark flex-1 !py-2 !text-sm"
        />
        <button
          onClick={send}
          disabled={sending}
          aria-label="Send"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-slate-900 disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}