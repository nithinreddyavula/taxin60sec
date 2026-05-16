"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-32">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">

        {/* LEFT CONTENT */}
        <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>

          <p className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-8">
            Chartered Accountants & Business Advisors
          </p>

          <h1 className="text-5xl sm:text-5xl md:text-6xl font-bold leading-tight">
  Tax & Compliance Solutions For Modern Businesses
</h1>

          <p className="mt-8 text-lg text-gray-600 leading-8">
  Fast, reliable, and expert-driven taxation, GST, audit, and compliance
  services for startups, businesses, and individuals.
</p>

          <div className="mt-10 flex flex-col sm:flex-row gap-5">

            <button className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition">
              Book Consultation
            </button>

            <button className="border border-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition">
              Learn More
            </button>

          </div>

        </motion.div>

        {/* RIGHT IMAGE */}
                <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[350px] md:h-[520px] rounded-[30px] overflow-hidden"
        >

          <Image
            src="/hero.jpg"
            alt="Business"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

        </motion.div>

      </div>

    </section>
  );
}