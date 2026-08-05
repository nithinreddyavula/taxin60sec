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
          <div key={i} className="card-dark h-40 animate-pulse p-6" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const Icon = ICONS[service.icon] ?? FileText;
        const isNri = service.category === "NRI";

        return (
          <Link
            key={service.code}
            href={`/intake/confirm?id=${service.id}`}
            className="card-dark group flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <Icon className="text-emerald-400" size={20} />
            </div>

            <h3 className="mt-4 text-base font-bold text-white">
              {service.displayName}
            </h3>

            <p className="mt-1.5 line-clamp-2 text-sm text-secondary">
              {service.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
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