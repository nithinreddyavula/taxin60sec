"use client";

import { useEffect, useState } from "react";
import { Crown, Star, ShieldCheck } from "lucide-react";
import { TierService, ClientTierInfo } from "@/services/tier-service";

const tierIcon: Record<string, React.ReactNode> = {
  VIP: <Crown size={17} className="text-amber-300" />,
  PRIORITY: <Star size={17} className="text-blue-300" />,
  STANDARD: <ShieldCheck size={17} className="text-secondary" />,
};

const tierColor: Record<string, string> = {
  VIP: "border-amber-400/30 bg-amber-400/10",
  PRIORITY: "border-blue-400/30 bg-blue-400/10",
  STANDARD: "border-white/10 bg-white/[0.025]",
};

export default function TierBadge() {
  const [data, setData] = useState<ClientTierInfo | null>(null);

  useEffect(() => {
    TierService.myTier()
      .then(setData)
      .catch(() => {
        // Non-critical - the dashboard is still fully usable without this widget.
      });
  }, []);

  if (!data) return null;

  return (
    <section className={`card-dark rounded-2xl border p-5 ${tierColor[data.tier] ?? tierColor.STANDARD}`}>
      <div className="flex items-center gap-2">
        {tierIcon[data.tier] ?? tierIcon.STANDARD}
        <h2 className="font-bold">{data.label} Plan</h2>
      </div>
      <ul className="mt-3 space-y-1 text-sm text-secondary">
        {data.perks.map((perk) => (
          <li key={perk}>• {perk}</li>
        ))}
      </ul>
      {data.tier === "STANDARD" && (
        <p className="mt-3 text-xs text-secondary">
          Ask your CA about Priority or VIP for faster turnaround on every case.
        </p>
      )}
    </section>
  );
}