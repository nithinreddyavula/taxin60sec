"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle, Users } from "lucide-react";

export default function ReferralShareBlock({
  referralCode,
  referralShareUrl,
  referredCount,
  title = "Refer & Earn",
  description = "Share your link. When someone signs up through it, you both get rewarded.",
}: {
  referralCode: string;
  referralShareUrl: string;
  referredCount?: number;
  title?: string;
  description?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(referralShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may fail on unsupported browsers.
    }
  }

  const waText = encodeURIComponent(
    `I've been using Tax60Sec for my taxes - use my link and we both save → ${referralShareUrl}`
  );

  return (
    <section className="card-dark p-6">
      <div className="flex items-center gap-2">
        <Users size={18} className="text-emerald-600" />
        <h2 className="font-bold text-slate-900">{title}</h2>
      </div>

      <p className="mt-1 text-sm text-secondary">{description}</p>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
        <span className="truncate font-mono text-sm text-emerald-700">
          {referralCode}
        </span>

        {referredCount !== undefined && (
          <span className="shrink-0 text-xs text-secondary">
            {referredCount} referred so far
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a
          href={`https://wa.me/?text=${waText}`}
          target="_blank"
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
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </section>
  );
}