"use client";

import { useEffect, useState } from "react";
import { ReferralService, ReferralInfo } from "@/services/referral-service";
import ReferralShareBlock from "@/components/ReferralShareBlock";

export default function ReferralCard() {
  const [info, setInfo] = useState<ReferralInfo | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    ReferralService.me()
      .then(setInfo)
      .catch((e) =>
        setError(
          e instanceof Error
            ? e.message
            : "Unable to load your referral link"
        )
      );
  }, []);

  if (error) {
    return (
      <section className="card-dark p-6">
        <p className="text-sm text-red-300">{error}</p>
      </section>
    );
  }

  if (!info) {
    return (
      <section className="card-dark p-6">
        <div className="h-20 animate-pulse rounded-xl bg-white/5" />
      </section>
    );
  }

  return (
    <ReferralShareBlock
      referralCode={info.code}
      referralShareUrl={info.shareLink}
      referredCount={info.totalReferred}
    />
  );
}