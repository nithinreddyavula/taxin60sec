import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "How TaxIn60Sec collects, uses, and protects your personal data.",
};

const sections = [
  {
    heading: "1. What We Collect",
    body: [
      "When you use TaxIn60Sec, we collect information you provide directly — such as your name, phone number, email, PAN, Aadhaar (where required for a filing), and financial documents you upload for a specific case.",
      "We also collect basic usage data (pages visited, device type) to keep the platform secure and working correctly.",
    ],
  },
  {
    heading: "2. How We Use It",
    body: [
      "Your information is used only to deliver the service you requested — filing your return, processing GST, assigning a verified CA to your case, and communicating with you about that case.",
      "We do not sell your personal data. We do not share your documents with anyone outside the CA assigned to your case without your explicit consent.",
    ],
  },
  {
    heading: "3. How We Protect It",
    body: [
      "Access to documents is restricted by authenticated case and vault authorization checks. File uploads are subject to configured size limits and are stored outside public web routes.",
      "Security controls and hosting arrangements can change. Contact us for the current retention and vendor information relevant to your case.",
    ],
  },
  {
    heading: "4. Your Rights",
    body: [
      "You can request a copy of the personal data we hold about you, ask us to correct it, or request deletion of your account and associated documents, subject to statutory retention requirements under Indian tax law.",
      "To exercise any of these rights, contact us at compliance@taxin60sec.com.",
    ],
  },
  {
    heading: "5. Third-Party Services",
    body: [
      "We use third-party tools for payments, analytics, and communication (for example, payment gateways and WhatsApp Business). These providers only receive the minimum data needed to perform their function.",
    ],
  },
  {
    heading: "6. Changes to This Policy",
    body: [
      "We may update this policy as our services evolve. Material changes will be communicated to registered users by email.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-hero">
          <div className="container-main">
            <div className="mx-auto max-w-3xl">
              <p className="eyebrow">Legal</p>
              <h1 className="section-title mt-3">Privacy Policy</h1>
              <p className="section-copy mt-3">
                This policy explains what data
                TaxIn60Sec collects and how it&apos;s used and protected.
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
                <p className="text-sm leading-6 text-secondary">For questions about this policy or your data, contact compliance@taxin60sec.com.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
