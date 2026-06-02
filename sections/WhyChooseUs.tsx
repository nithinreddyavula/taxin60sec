import {
  CheckCircle,
} from "lucide-react";

const points = [
  "Expert CA & Ex-Big4 Team",
  "Technology-Driven Processes",
  "Fast Response & Support",
  "Transparent Pricing",
  "Reliable Compliance",
];

export default function WhyChooseUs() {
  return (
    <section className="section-space overflow-hidden">
      <div className="container-main">

        <div className="card-dark p-8 lg:p-12">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Why Choose Tax60Sec?
              </h2>

              <p className="text-secondary text-lg leading-8 mb-8">
                We combine finance expertise with technology
                to deliver faster, smarter and more reliable compliance.
              </p>

              <div className="space-y-5">

                {points.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >

                    <CheckCircle className="text-blue-400 w-6 h-6 flex-shrink-0" />

                    <p className="text-lg">
                      {point}
                    </p>

                  </div>
                ))}

              </div>

            </div>

            <div className="card-dark p-8">

              <div className="grid grid-cols-2 gap-6">

                <div>
                  <h3 className="text-4xl font-bold text-blue-500">
                    500+
                  </h3>

                  <p className="text-secondary mt-2">
                    Clients Served
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

      </div>
    </section>
  );
}