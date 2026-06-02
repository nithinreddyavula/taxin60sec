const faqs = [
  {
    q: "How fast can you complete GST filing?",
    a: "Most GST filings are completed within 24 hours after receiving documents.",
  },
  {
    q: "Do you support startups?",
    a: "Yes. We help with company registration, compliance, accounting and fundraising support.",
  },
  {
    q: "Can I contact directly on WhatsApp?",
    a: "Absolutely. Our team is available for quick support on WhatsApp.",
  },
  {
    q: "Do you provide Virtual CFO services?",
    a: "Yes. We help businesses manage reporting, budgeting and strategic financial planning.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20">

      <div className="container-main max-w-4xl">

        <div className="text-center mb-14">

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-secondary text-lg">
            Everything you need to know.
          </p>

        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card-dark p-7"
            >

              <h3 className="text-xl font-semibold mb-3">
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