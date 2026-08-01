"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Star } from "lucide-react";
import { StatsService } from "@/services/stats-service";

const points = [
  "AI-powered tax health monitoring",
  "Expert CA team with 15+ years experience",
  "Proactive alerts & deadline reminders",
  "End-to-end support & notice handling",
  "Transparent pricing. No hidden charges",
];

// Illustrative trend line only - not tied to a specific client's real history.
const CHART_POINTS = [58, 64, 61, 70, 75, 82, 79, 86, 90, 88, 94];

function Sparkline({ points }: { points: number[] }) {
  const width = 280;
  const height = 90;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / range) * height;
    return `${x},${y}`;
  });

  const linePath = `M${coords.join(" L")}`;
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparkFill)" />
      <path d={linePath} fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WhyChooseUs() {
  const dashboardQuery = useQuery({
    queryKey: ["public-dashboard-stats"],
    queryFn: () => StatsService.dashboard(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const complianceRate = dashboardQuery.data?.complianceRatePercentage;

  return (
    <section className="section-space">
      <div className="container-main">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="card-dark p-6">
            <p className="eyebrow">Why Choose Us</p>
            <h2 className="mt-3 text-xl font-bold text-white">
              Why Choose Tax60?
            </h2>

            <div className="mt-5 space-y-3">
              {points.map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="text-sm text-secondary">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-dark p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Tax Health Overview</p>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400">
                {complianceRate ?? 94}
              </span>
            </div>

            <div className="mt-4">
              <Sparkline points={CHART_POINTS} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/8 pt-4 text-sm">
              <div>
                <p className="font-bold text-white">98%</p>
                <p className="text-xs text-secondary">Compliance Rate</p>
              </div>
              <div>
                <p className="font-bold text-white">24/7</p>
                <p className="text-xs text-secondary">Monitoring</p>
              </div>
            </div>
          </div>

          <div className="card-dark p-6">
            <p className="text-sm font-semibold text-white">What Our Customers Say</p>

            <div className="mt-4 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>

            <p className="mt-3 text-sm leading-6 text-secondary">
              &quot;Tax60Sec simplified our entire GST and compliance process.
              Highly reliable and very responsive team!&quot;
            </p>

            <div className="mt-4 border-t border-white/8 pt-4">
              <p className="text-sm font-semibold text-white">Rahul Mehta</p>
              <p className="text-xs text-secondary">Founder, FinEdge</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}