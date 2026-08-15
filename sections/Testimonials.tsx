"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { MessageSquareQuote, Star } from "lucide-react";
import { TestimonialService } from "@/services/testimonial-service";

export default function Testimonials() {
  const testimonialsQuery = useQuery({
    queryKey: ["public-testimonials"],
    queryFn: () => TestimonialService.list(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const testimonials = testimonialsQuery.data ?? [];

  return (
    <section className="section-space">
      <div className="container-main">
        <div className="section-header">
          <h2 className="section-title">What Our Clients Say</h2>
        </div>

        {testimonials.length > 0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.id} className="card-dark p-5">
                {item.rating && (
                  <div className="mb-4 flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <Star key={index} size={14} fill="currentColor" />
                    ))}
                  </div>
                )}
                <p className="text-sm leading-6 text-secondary">&quot;{item.quote}&quot;</p>
                <div className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.name}</h4>
                    {item.role && <p className="text-sm text-secondary">{item.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-dark mx-auto mt-8 max-w-xl p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
              <MessageSquareQuote size={22} className="text-emerald-400" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">We&apos;re Just Getting Started</h3>
            <p className="mt-2 text-sm leading-6 text-secondary">
              We&apos;d rather show you real reviews from real clients than made-up
              ones. Be one of our first — try the free Tax Health Check and help
              us build a track record we can actually stand behind.
            </p>
            <Link href="/health-check" className="btn-primary mt-5 inline-flex">
              Check My Free Tax Health Score
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}