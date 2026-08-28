"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { OnboardingService, ServiceOffering } from "@/services/intake-service";

export default function Pricing() {
  const [services, setServices] = useState<ServiceOffering[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OnboardingService.services()
      .then((response) => {
        // Just take the first 3 featured or top services for the homepage
        const topServices = response.items.filter(s => s.featured).slice(0, 3);
        setServices(topServices.length > 0 ? topServices : response.items.slice(0, 3));
      })
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading || services.length === 0) {
    return null; // Hide section if loading or no services (or add skeleton)
  }

  return (
    <section className="py-24 sm:py-32 bg-[#020817] relative border-t border-white/5">
      <div className="container-main">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold tracking-wide text-slate-300 uppercase">PRICING</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Transparent, flat-fee pricing.
          </h2>
          <p className="text-lg text-slate-400">
            No hidden costs. Know exactly what you'll pay before you start. All services include dedicated CA support and your private case workspace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const isRecommended = index === 1; // Highlight the middle one

            return (
              <div 
                key={service.id} 
                className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${
                  isRecommended 
                    ? "bg-[#1A2333] border-2 border-emerald-500/50 shadow-2xl shadow-emerald-500/10 scale-105 z-10" 
                    : "bg-white/5 border border-white/10 hover:border-white/20"
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full">
                    Recommended
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-white mb-2">{service.displayName}</h3>
                <p className="text-sm text-slate-400 mb-6 min-h-[40px]">{service.description}</p>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">₹{Math.round(service.basePrice).toLocaleString("en-IN")}</span>
                    <span className="text-sm text-slate-400">/ filing</span>
                  </div>
                  <p className="text-xs text-emerald-400 font-medium mt-2">Delivered in ~{service.estimatedCompletionDays} days</p>
                </div>
                
                <Link 
                  href={`/intake/confirm?id=${service.id}`}
                  className={`flex h-12 w-full items-center justify-center rounded-xl text-sm font-bold transition-all mb-8 ${
                    isRecommended 
                      ? "bg-emerald-500 text-black hover:bg-emerald-400" 
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Get Started
                </Link>
                
                <div className="flex flex-col gap-3 flex-1">
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">What's included</p>
                  {(service.includedFeatures?.length ? service.includedFeatures : ["Expert review", "Filing & submission", "Dedicated workspace"]).map(feature => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check size={16} className={`shrink-0 ${isRecommended ? "text-emerald-400" : "text-slate-400"}`} />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
