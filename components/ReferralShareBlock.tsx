"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle, Users } from "lucide-react";
import { track } from "@/lib/analytics";

interface ReferralShareBlockProps {
  referralCode: string;
  referralShareUrl: string;
  referredCount?: number;
  title?: string;
  description?: string;
}

export default function ReferralShareBlock({
  referralCode,
  referralShareUrl,
  referredCount,
  title = "Know someone stressed about taxes?",
  description = "Send them your link so their case can be connected to your referral.",
}: ReferralShareBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(referralShareUrl);
      setCopied(true);
      track("referral_shared", { channel: "copy" });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy referral link:", error);
    }
  }

  const waText = encodeURIComponent(
    `I've been using Tax60Sec for my taxes. Use my referral link and we both save! 🎉\n\n${referralShareUrl}`
  );

  return (
    <section className="card-dark p-6 rounded-2xl">
      <div className="flex items-center gap-2">
        <Users size={18} className="text-emerald-400" />
        <h2 className="font-bold text-white">{title}</h2>
      </div>

      <p className="mt-1 text-sm text-secondary">{description}</p>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <span className="truncate font-mono text-sm text-emerald-300">
          {referralCode}
        </span>

        {referredCount !== undefined && (
          <span className="ml-3 shrink-0 text-xs text-secondary">
            {referredCount} referred so far
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a
          href={`https://wa.me/?text=${waText}`}
          target="_blank"
          onClick={() => track("referral_shared", { channel: "whatsapp" })}
          rel="noopener noreferrer"
          className="btn-secondary flex flex-1 items-center justify-center gap-2"
        >
          <MessageCircle size={16} />
          Share on WhatsApp
        </a>

        <button
          type="button"
          onClick={copyLink}
          className="btn-secondary flex flex-1 items-center justify-center gap-2"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </section>
  );
}
