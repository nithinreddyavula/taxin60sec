"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  FileText,
  Building2,
  Briefcase,
  ShieldCheck,
  Landmark,
  Globe,
  Clock,
  Check,
  LucideIcon,
} from "lucide-react";

import { OnboardingService, ServiceOffering } from "@/services/intake-service";

const ICONS: Record<string, LucideIcon> = {
  calculator: Calculator,
  "file-text": FileText,
  building: Building2,
  briefcase: Briefcase,
  shield: ShieldCheck,
  landmark: Landmark,
  globe: Globe,
};

// Illustrative only - shown as "approx." so it's never mistaken for a live FX rate.
const APPROX_INR_PER_USD = 83;

function formatInr(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function formatUsdEstimate(value: number) {
  return `$${Math.round(value / APPROX_INR_PER_USD).toLocaleString("en-US")}`;
}

// Fix 4 — "Best for" tags. There's no dedicated backend field for personas yet,
// so this maps the existing `category` value to a short, honest set of tags
// rather than inventing per-service data that doesn't exist.
function bestForTags(category: string): string[] {
  const key = category.toUpperCase();
  if (key.includes("NRI")) return ["NRI", "Foreign Income"];
  if (key.includes("GST")) return ["Business", "Freelancer"];
  if (key.includes("TDS")) return ["Business", "Employer"];
  if (key.includes("BUSINESS") || key.includes("ROC") || key.includes("AUDIT")) return ["Business", "LLP", "Company"];
  if (key.includes("INCOME") || key.includes("ITR") || key.includes("TAX")) return ["Salary", "Freelancer", "Capital Gains"];
  return ["Individuals", "Businesses"];
}

function includedFeaturesList(service: ServiceOffering): string[] {
  if (service.includedFeatures) {
    return service.includedFeatures
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
  }
  // Fallback so the card never looks empty when the backend hasn't sent
  // per-service features yet.
  return ["Review", "Filing", "Expert Verification"];
}

export default function ServiceCards() {
  const [services, setServices] = useState<ServiceOffering[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OnboardingService.services()
      .then((response) => setServices(response.items))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card-dark h-56 animate-pulse p-6" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const Icon = ICONS[service.icon] ?? FileText;
        const isNri = service.category === "NRI";
        const tags = bestForTags(service.category);
        const features = includedFeaturesList(service);

        return (
          <Link
            key={service.code}
            href={`/intake/confirm?id=${service.id}`}
            className="card-dark group flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Icon className="text-emerald-400" size={20} />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-secondary">
                <Clock size={12} /> {service.estimatedCompletionDays}d
              </span>
            </div>

            <h3 className="mt-4 text-base font-bold text-white">
              {service.displayName}
            </h3>

            <p className="mt-1.5 line-clamp-2 text-sm text-secondary">
              {service.description}
            </p>

            {/* Best for */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-semibold text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* What's included */}
            <ul className="mt-3 space-y-1">
              {features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Check size={12} className="shrink-0 text-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3">
              <p className="text-sm font-semibold text-emerald-400">
                From {formatInr(service.basePrice)}
                {isNri ? ` (approx. ${formatUsdEstimate(service.basePrice)})` : ""}
              </p>
              <ArrowRight
                size={16}
                className="text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-emerald-400"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}