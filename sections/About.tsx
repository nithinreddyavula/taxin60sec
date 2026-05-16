export default function About() {
  return (
    <section className="py-32">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE */}
        <div>

          <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-6">
            About Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Trusted Financial Advisors For Modern Businesses
          </h2>

          <p className="mt-8 text-gray-600 leading-8 text-lg">
            We help startups, enterprises, and individuals navigate complex
            financial regulations with confidence. Our team delivers tailored
            taxation, audit, and compliance solutions focused on long-term growth.
          </p>

          <button className="mt-10 border border-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition">
            Learn More
          </button>

        </div>

        {/* RIGHT SIDE */}
        <div className="grid grid-cols-2 gap-6">

          <div className="bg-black text-white rounded-[30px] p-10">
            <h3 className="text-5xl font-bold">10+</h3>
            <p className="mt-4 text-gray-300">
              Years Experience
            </p>
          </div>

          <div className="bg-white rounded-[30px] p-10 border border-gray-200">
            <h3 className="text-5xl font-bold">500+</h3>
            <p className="mt-4 text-gray-600">
              Clients Served
            </p>
          </div>

          <div className="bg-white rounded-[30px] p-10 border border-gray-200">
            <h3 className="text-5xl font-bold">98%</h3>
            <p className="mt-4 text-gray-600">
              Client Satisfaction
            </p>
          </div>

          <div className="bg-black text-white rounded-[30px] p-10">
            <h3 className="text-5xl font-bold">24/7</h3>
            <p className="mt-4 text-gray-300">
              Expert Support
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}