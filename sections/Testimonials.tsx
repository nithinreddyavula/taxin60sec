const testimonials = [
  {
    name: "Rahul Mehta",
    role: "Founder, FinEdge",
    text: "Tax60Sec simplified our entire GST and compliance process. Highly reliable and very responsive team!",
  },
  {
    name: "Priya Sharma",
    role: "CEO, BizCraft",
    text: "Their Virtual CFO services helped us improve financial clarity and save significant taxes.",
  },
  {
    name: "Amit Verma",
    role: "Director, Verma Traders",
    text: "Professional, knowledgeable and always available on WhatsApp. Great experience working with them.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20">

      <div className="container-main">

        <div className="text-center mb-14">

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Clients Say
          </h2>

          <p className="text-secondary text-lg">
            Trusted by businesses across India.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="card-dark p-8"
            >

              <div className="text-5xl text-blue-500/40 mb-5">
                “
              </div>

              <p className="text-secondary leading-8 mb-8">
                {item.text}
              </p>

              <div>

                <h4 className="font-semibold text-xl">
                  {item.name}
                </h4>

                <p className="text-secondary mt-1">
                  {item.role}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}