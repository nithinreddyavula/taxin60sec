"use client";

import Image from "next/image";
import Link from "next/link";

const stats = [
  ["500+", "Happy Clients"],
  ["1000+", "GST Returns Filed"],
  ["10+", "Years Experience"],
  ["50+", "Industries Served"],
];

const videos = [
  {
    title: "5 GST Mistakes Every Business Should Avoid",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "TDS Explained in 60 Seconds",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Stats() {
  return (
    <section className="section-space">
      <div className="container-main">
        <div className="section-header">
          <p className="eyebrow">What We Do</p>
          <h2 className="section-title mt-3">Complete Finance & Tax Solutions</h2>
          <p className="section-copy mt-3">
            Everything your business needs under one roof
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="card-dark p-5">
            <h3 className="text-xl font-bold tracking-tight">
              Trusted by Businesses
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <h2 className="text-3xl font-bold tracking-tight text-blue-400">
                    {value}
                  </h2>
                  <p className="mt-2 text-sm text-secondary">{label}</p>
                </div>
              ))}
            </div>
            <Link href="/services" className="btn-primary mt-5 w-full">
              View All Services
            </Link>
          </div>

          <div className="card-dark p-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold tracking-tight">
                Tax in 60 Sec
              </h3>
              <button className="text-sm font-bold text-blue-300">
                View All Videos
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              {videos.map((video) => (
                <div key={video.title}>
                  <Image
                    src={video.image}
                    alt={video.title}
                    width={500}
                    height={220}
                    className="h-32 w-full rounded-2xl object-cover"
                  />
                  <h4 className="mt-3 text-base font-bold leading-6">
                    {video.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          <div className="card-dark relative overflow-hidden p-6">
            <div className="absolute right-[-90px] top-[-90px] h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-bold leading-tight tracking-tight">
                Ready to Simplify Your Finance?
              </h2>
              <p className="mt-4 text-sm leading-6 text-secondary">
                Book a free consultation with our experts and grow your business
                with confidence.
              </p>

              <div className="mt-6 grid gap-3">
                <Link href="/contact" className="btn-primary w-full">
                  Book Free Consultation
                </Link>
                <a
                  href="https://wa.me/917013734079"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary w-full"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <p className="mt-5 text-sm text-secondary">
                No commitment. 100% confidential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
