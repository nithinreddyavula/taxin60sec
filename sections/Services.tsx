import Link from "next/link";
import ServiceCards from "@/components/ServiceCards";

export default function Services() {
  return (
    <section id="services" className="section-space">
      <div className="container-main">
        <div className="section-header">
          <p className="eyebrow">Our Services</p>
          <h2 className="section-title mt-3">Everything Your Taxes Need</h2>
          <p className="section-copy mt-3">
            From ITR filing to business compliance — we&apos;ve got you covered.
          </p>
        </div>

        <ServiceCards />

        <div className="mt-8 text-center">
          <Link href="/services" className="btn-secondary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}