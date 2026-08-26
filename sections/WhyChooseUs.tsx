"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { StatsService } from "@/services/stats-service";

const points = [
  "A rule-based health check gives you a clearer first step",
  "Structured intake keeps service details together",
  "Deadline and case-status views provide useful return paths",
  "Pricing and estimated time are shown from the service catalog when available",
];

const security = [
  "Document access is controlled through authenticated case and vault permissions",
  "Uploads stay outside public web routes",
  "Your case workspace shows what is needed next",
];

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
            <h2 className="mt-3 text-xl font-bold text-white">Why Choose Tax60?</h2>

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
              {complianceRate !== undefined && (
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400">
                  {complianceRate}%
                </span>
              )}
            </div>

            <div className="mt-6 flex h-24 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02]">
              <p className="text-center text-xs leading-5 text-secondary">
                Your compliance trend appears here
                <br />
                once you have an active case with us
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/8 pt-4 text-sm">
              <div>
                <p className="font-bold text-white">{complianceRate !== undefined ? `${complianceRate}%` : "—"}</p>
                <p className="text-xs text-secondary">Compliance Rate</p>
              </div>
              <div>
                <p className="font-bold text-white">Case-based</p>
                <p className="text-xs text-secondary">Guidance</p>
              </div>
            </div>
          </div>

          <div className="card-dark p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15">
              <Lock size={20} className="text-emerald-400" />
            </div>
            <p className="mt-4 text-sm font-semibold text-white">Your Documents, Your Control</p>
            <div className="mt-4 space-y-3">
              {security.map((line) => (
                <div key={line} className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="text-sm text-secondary">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
