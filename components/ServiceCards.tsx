"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
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
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card-dark p-6 animate-pulse h-48" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const Icon = ICONS[service.icon] ?? FileText;
        const isNri = service.category === "NRI";

        return (
          <article key={service.code} className="card-dark p-6">
            <Icon className="text-blue-400" size={28} />

            <h3 className="mt-5 text-xl font-bold">{service.displayName}</h3>

            <p className="mt-2 text-secondary">{service.description}</p>

            <p className="mt-3 text-sm font-semibold text-blue-400">
              Starting {formatInr(service.basePrice)}
              {isNri
                ? ` (approx. ${formatUsdEstimate(service.basePrice)})`
                : ""}
            </p>

            <Link
              href={`/intake?id=${service.id}`}
              className="btn-primary mt-5 block w-full text-center"
            >
              Get Started
            </Link>
          </article>
        );
      })}
    </div>
  );
}