import ServiceCards from "@/components/ServiceCards";

export default function Services() {
  return (
    <section id="services" className="section-space">
      <div className="container-main">
        <p className="eyebrow">Tax60 Services</p>

        <h2 className="section-title mt-3">
          Choose a service to get started
        </h2>

        <ServiceCards />
      </div>
    </section>
  );
}