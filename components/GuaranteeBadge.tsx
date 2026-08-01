"use client";

import { Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { StatsService } from "@/services/stats-service";

export default function GuaranteeBadge() {
  const { data } = useQuery({
    queryKey: ["public-response-stats"],
    queryFn: () => StatsService.responseTime(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const hasLiveData = (data?.sampleSize ?? 0) > 0 && data?.averageResponseSeconds != null;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-emerald-700">
      <Zap size={16} />
      {hasLiveData
        ? `Real average: ${data!.averageResponseSeconds}s response, ${data!.slaMetPercentage}% within 60s`
        : "Confirmed within 60 seconds, guaranteed"}
    </div>
  );
}