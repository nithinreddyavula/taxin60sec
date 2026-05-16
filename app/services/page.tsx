export default function ServicesPage() {

  const services = [
    "GST Filing",
    "Income Tax Filing",
    "Business Registration",
    "ROC Compliance",
    "Audit & Assurance",
    "Startup Consulting",
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-24 px-6">

      <div className="max-w-6xl mx-auto">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4">
          Our Services
        </p>

        <h1 className="text-5xl font-bold mb-16">
          Professional Tax & Compliance Services
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => (

            <div
              key={service}
              className="bg-white p-10 rounded-[30px] shadow hover:shadow-xl transition"
            >

              <h2 className="text-2xl font-semibold">
                {service}
              </h2>

              <p className="text-gray-600 mt-4 leading-relaxed">
                Expert support and end-to-end assistance for {service.toLowerCase()}.
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}