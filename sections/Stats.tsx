export default function Stats() {

  const stats = [
    {
      number: "500+",
      label: "Clients Served",
    },
    {
      number: "1000+",
      label: "GST Filings",
    },
    {
      number: "99%",
      label: "Client Satisfaction",
    },
    {
      number: "24hrs",
      label: "Average Response Time",
    },
  ];

  return (
    <section className="py-24 bg-black text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10 text-center">

          {stats.map((stat) => (

            <div key={stat.label}>

              <h2 className="text-5xl font-bold">
                {stat.number}
              </h2>

              <p className="text-gray-400 mt-4 text-lg">
                {stat.label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}