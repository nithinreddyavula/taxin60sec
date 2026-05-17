import Image from "next/image";

export default function Team() {

  return (
    <section className="py-32 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4">
          Our Team
        </p>

        <h2 className="text-5xl font-bold mb-16">
          Meet Our Experts
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="relative h-[500px] rounded-[30px] overflow-hidden">

            <Image
              src="/team.jpg"
              alt="Founder"
              fill
              className="object-cover"
            />

          </div>

          <div>

            <h3 className="text-4xl font-bold">
              CA Nanda Kumar
            </h3>

            <p className="text-xl text-gray-500 mt-3">
              Founder & Chartered Accountant
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mt-8">
              With years of expertise in taxation,
              GST compliance, audit, and business advisory,
              we help startups, businesses, and individuals
              navigate financial and compliance challenges
              with confidence.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <div className="bg-white px-6 py-4 rounded-full shadow">
                GST Expert
              </div>

              <div className="bg-white px-6 py-4 rounded-full shadow">
                Audit Specialist
              </div>

              <div className="bg-white px-6 py-4 rounded-full shadow">
                Startup Advisor
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}