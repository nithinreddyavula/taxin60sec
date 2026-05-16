"use client";

import { motion } from "framer-motion";

import {
  Briefcase,
  Landmark,
  FileText,
  ShieldCheck,
} from "lucide-react";
const services = [
  {
    title: "Taxation",
    description:
      "Comprehensive direct and indirect tax solutions for businesses and individuals.",
    icon: <Landmark size={32} />,
  },

  {
    title: "Audit & Assurance",
    description:
      "Reliable auditing services focused on compliance, transparency, and growth.",
    icon: <ShieldCheck size={32} />,
  },

  {
    title: "Business Advisory",
    description:
      "Strategic consulting services to help businesses scale efficiently.",
    icon: <Briefcase size={32} />,
  },

  {
    title: "Compliance Services",
    description:
      "End-to-end regulatory and statutory compliance management solutions.",
    icon: <FileText size={32} />,
  },
];

export default function Services() {
  return (
    <section className="py-32">

      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-6">
          Our Services
        </p>

        <h2 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight">
          Professional Financial & Compliance Services
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-20">

          {services.map((service, index) => (
            <motion.div
  key={index}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  viewport={{ once: true }}
  className="bg-white rounded-[30px] p-10 border border-gray-200 hover:-translate-y-2 transition duration-300"
>

              <div className="mb-8">
                {service.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-8">
                {service.description}
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}