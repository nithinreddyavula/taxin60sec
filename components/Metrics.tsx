"use client";

import {
  BadgeCheck,
  Clock3,
  ShieldCheck,
  Users,
} from "lucide-react";

const metrics = [
  {
    icon: Users,
    value: "500+",
    label: "Clients Served",
  },
  {
    icon: BadgeCheck,
    value: "10+",
    label: "Years Experience",
  },
  {
    icon: Clock3,
    value: "24hr",
    label: "Response Time",
  },
  {
    icon: ShieldCheck,
    value: "95%",
    label: "Compliance Rate",
  },
];

export default function Metrics() {

  return (

    <section className="pb-16">

      <div className="container-main">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {
            metrics.map((item, i) => {

              const Icon = item.icon;

              return (

                <div
                  key={i}
                  className="card-dark p-5 flex items-center gap-4"
                >

                  {/* ICON */}
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center flex-shrink-0">

                    <Icon
                      size={22}
                      className="text-blue-400"
                    />

                  </div>

                  {/* TEXT */}
                  <div>

                    <h3 className="text-2xl font-bold">

                      {item.value}

                    </h3>

                    <p className="text-sm text-secondary mt-1">

                      {item.label}

                    </p>

                  </div>

                </div>

              );

            })
          }

        </div>

      </div>

    </section>

  );

}