import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern your use of TaxIn60Sec's services.",
};

const sections = [
  {
    heading: "1. Our Services",
    body: [
      "TaxIn60Sec connects you with a verified Chartered Accountant for income tax filing, GST compliance, company registration, ROC compliance, and related advisory services. The AI Tax Health Check provides a preliminary assessment only — it is not a substitute for professional advice from your assigned CA.",
    ],
  },
  {
    heading: "2. Your Responsibilities",
    body: [
      "You agree to provide accurate information and genuine documents. Any filing is only as correct as the information you provide — TaxIn60Sec and its CAs are not liable for penalties arising from inaccurate or incomplete information you submitted.",
      "You are responsible for reviewing and approving any return or filing before it is submitted on your behalf.",
    ],
  },
  {
    heading: "3. Fees & Payments",
    body: [
      "Pricing for each service is shown before you confirm an order. [Describe refund/cancellation policy here — e.g. full refund if work has not started, partial refund once a CA has been assigned, no refund after filing is submitted.]",
    ],
  },
  {
    heading: "4. Turnaround Times",
    body: [
      "Estimated turnaround times (e.g. SLA windows shown in your dashboard) are targets based on typical case complexity, not guarantees. Delays caused by missing documents, government portal downtime, or incomplete information from you are outside our control.",
    ],
  },
  {
    heading: "5. Limitation of Liability",
    body: [
      "[This section needs a lawyer. At minimum it should state the maximum liability cap, what is and isn't covered — e.g. government-imposed penalties vs. errors caused by TaxIn60Sec — and how disputes are resolved.]",
    ],
  },
  {
    heading: "6. Governing Law",
    body: [
      "These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts in [Your City], [Your State].",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-hero">
          <div className="container-main">
            <div className="mx-auto max-w-3xl">
              <p className="eyebrow">Legal</p>
              <h1 className="section-title mt-3">Terms &amp; Conditions</h1>
              <p className="section-copy mt-3">
                Last updated: [DD Month YYYY]. By using TaxIn60Sec, you agree to
                the terms below.
              </p>

              <div className="mt-10 space-y-8">
                {sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="text-lg font-bold text-white">{section.heading}</h2>
                    <div className="mt-3 space-y-3">
                      {section.body.map((paragraph, index) => (
                        <p key={index} className="section-copy">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-dark mt-10 p-5">
                <p className="text-sm leading-6 text-secondary">
                  This is a starting template, not legal advice. Sections 3 and
                  5 in particular need a lawyer&apos;s input before this is safe
                  to rely on — refund terms and liability limits are exactly
                  where generic templates fail founders.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}