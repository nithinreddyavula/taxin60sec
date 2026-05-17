import {
  ShieldCheck,
  Clock3,
  BadgeCheck,
  Users,
} from "lucide-react";

export default function WhyChooseUs() {

  const features = [
    {
      icon: <ShieldCheck size={40} />,
      title: "Trusted Expertise",
      description:
        "Professional taxation and compliance guidance from experienced experts.",
    },
    {
      icon: <Clock3 size={40} />,
      title: "Fast Response",
      description:
        "Quick consultation booking and timely support for all business needs.",
    },
    {
      icon: <BadgeCheck size={40} />,
      title: "Reliable Compliance",
      description:
        "Accurate GST, audit, and tax filing with full compliance assurance.",
    },
    {
      icon: <Users size={40} />,
      title: "Client Focused",
      description:
        "Dedicated support tailored for startups, businesses, and individuals.",
    },
  ];

  return (
    <section className="py-32 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4">
          Why Choose Us
        </p>

        <h2 className="text-5xl font-bold mb-16">
          Trusted By Businesses Across India
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="bg-gray-100 p-10 rounded-[30px] hover:shadow-xl transition"
            >

              {feature.icon}

              <h3 className="text-2xl font-bold mt-6">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-relaxed">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}