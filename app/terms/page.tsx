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
      "TaxIn60Sec provides a guided product journey for tax and compliance work: a rule-based health check, service intake, document collection, case tracking, deadlines and support paths. A health-check result is general guidance only; it is not professional tax advice.",
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
      "Service pricing and any estimate shown in the catalog are presented before you proceed. The business has not yet published an approved refund or cancellation policy. Do not rely on an assumed refund outcome; contact support before payment if you need clarification.",
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
      "A complete limitation-of-liability policy has not yet been published. This page is not a substitute for the final legal terms the business must approve with qualified legal counsel.",
    ],
  },
  {
    heading: "6. Governing Law",
    body: [
      "The governing-law and jurisdiction provisions will be published once the business has confirmed its legal entity and registered office details.",
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
                This is an interim customer-information page. Final terms require business and legal review before publication.
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
                  Owner action required: publish the approved legal entity, registered office, effective date, refund/cancellation policy, liability terms and dispute jurisdiction. Until then, customers should contact support for clarification before paying.
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
