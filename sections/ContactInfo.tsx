import { Mail, Phone, MapPin } from "lucide-react";

const items = [
  {
    icon: Mail,
    title: "Email",
    value: "compliance@taxin60sec.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 7013734079",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Online Consultation Across India",
  },
];

export default function ContactInfo() {
  return (
    <section className="section-space">
      <div className="container-main">
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="card-dark p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/15 bg-blue-500/10">
                  <Icon className="h-5 w-5 text-blue-300" />
                </div>
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-secondary">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
