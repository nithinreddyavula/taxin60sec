const faqs = [
  {
    q: "What services does Tax60Sec provide?",
    a: "We provide GST filing, ITR filing, startup registration, audits, compliance and virtual CFO services.",
  },
  {
    q: "Do you offer online consultation?",
    a: "Yes. We provide online consultation services across India.",
  },
  {
    q: "How quickly do you respond?",
    a: "Our average response time is within 24 hours.",
  },
  {
    q: "Do you help startups?",
    a: "Yes. We help with company registration, ROC filing, taxation and compliance.",
  },
];

export default function FAQ() {
  return (
    <section className="section-space overflow-hidden">
      <div className="container-main max-w-4xl">

        <div className="text-center mb-14">

          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-4">
            FAQ
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card-dark p-6"
            >

              <h3 className="text-2xl font-semibold mb-4">
                {faq.q}
              </h3>

              <p className="text-secondary leading-8">
                {faq.a}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}