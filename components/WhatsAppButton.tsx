"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "917013734079";
const PREFILLED_MESSAGE = "Hi! I'd like to know more about my tax filing options.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;

  return (
    
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-[#22C55E] px-4 py-3 text-sm font-bold text-white shadow-xl shadow-green-950/30 transition hover:bg-[#16A34A] hover:-translate-y-0.5"
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
      </span>
      <MessageCircle size={18} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}