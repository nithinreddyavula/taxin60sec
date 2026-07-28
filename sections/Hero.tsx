"use client";

import Link from "next/link";
import GuaranteeBadge from "@/components/GuaranteeBadge";

const heroStats = [
  ["500+", "Happy Clients"],
  ["10+", "Years Experience"],
  ["60sec", "Confirmed Response"],
  ["95%", "Compliance Rate"],
];

export default function Hero() {
  return (
    <section className="overflow-hidden py-10 md:py-14">
      <div className="container-main">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mb-5">
              <GuaranteeBadge />
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              All-in-One Finance & Tax Solutions
            </h1>

            <p className="section-copy mt-5 max-w-2xl">
              We help startups, businesses and professionals stay compliant,
              optimize taxes and simplify financial operations with expert
              support.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Book Consultation
              </Link>
              <a
                href="https://wa.me/917013734079"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {heroStats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                >
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {value}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-secondary">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-dark p-4 md:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Total Revenue", "INR 24,50,000", "+18.6% vs last month"],
                ["Tax Savings", "INR 4,25,000", "+22.4% vs last month"],
              ].map(([label, value, trend]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                >
                  <p className="text-sm text-secondary">{label}</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight">
                    {value}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-emerald-400">
                    {trend}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_190px]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold">Business Growth</h3>
                  <span className="text-sm text-secondary">This Year</span>
                </div>

                <div className="flex h-40 items-end gap-2">
                  {[44, 68, 56, 92, 76, 112, 84].map((height, index) => (
                    <div
                      key={index}
                      className="w-full rounded-t-lg bg-gradient-to-t from-blue-700 to-blue-400"
                      style={{ height }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <h3 className="text-lg font-semibold">Compliance</h3>

                <div className="relative mx-auto my-5 h-28 w-28">
                  <div className="absolute inset-0 rounded-full border-[9px] border-blue-500/15" />
                  <div className="absolute inset-0 rotate-45 rounded-full border-[9px] border-transparent border-r-blue-400 border-t-blue-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h3 className="text-3xl font-bold">92%</h3>
                    <p className="text-xs text-secondary">Compliant</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {["GST Returns", "Income Tax", "TDS Compliance", "ROC Filing"].map(
                    (item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="text-slate-300">{item}</span>
                        <span className="font-semibold text-emerald-400">
                          On Time
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}