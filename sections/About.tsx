export default function About() {
  return (
    <section className="section-space overflow-hidden">
      <div className="container-main">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-4">
              About Us
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Modern Finance Solutions For
              Growing Businesses
            </h2>

            <p className="text-secondary text-lg leading-8 mb-6">
              Tax60Sec helps startups, founders and businesses
              simplify taxation, compliance and financial operations.
            </p>

            <p className="text-secondary text-lg leading-8">
              From GST filing and income tax to virtual CFO services,
              we deliver fast, reliable and technology-driven support.
            </p>
          </div>

          <div className="card-dark p-8">

            <div className="grid grid-cols-2 gap-6">

              <div>
                <h3 className="text-4xl font-bold text-blue-500">
                  500+
                </h3>

                <p className="text-secondary mt-2">
                  Happy Clients
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-blue-500">
                  10+
                </h3>

                <p className="text-secondary mt-2">
                  Years Experience
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-blue-500">
                  24hr
                </h3>

                <p className="text-secondary mt-2">
                  Response Time
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-blue-500">
                  95%
                </h3>

                <p className="text-secondary mt-2">
                  Compliance Rate
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}