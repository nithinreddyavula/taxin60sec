export default function Testimonials() {

  const testimonials = [
    {
      name: "Rahul Sharma",
      text: "Professional GST support and very responsive service.",
    },
    {
      name: "Ananya Reddy",
      text: "Helped us with startup registration smoothly.",
    },
    {
      name: "Vikram Patel",
      text: "Reliable tax consultation and excellent guidance.",
    },
  ];

  return (
    <section className="py-32 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4">
          Testimonials
        </p>

        <h2 className="text-5xl font-bold mb-16">
          What Our Clients Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((testimonial) => (

            <div
              key={testimonial.name}
              className="bg-white p-10 rounded-[30px] shadow"
            >

              <p className="text-gray-700 leading-relaxed">
                "{testimonial.text}"
              </p>

              <h3 className="text-xl font-semibold mt-8">
                {testimonial.name}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}