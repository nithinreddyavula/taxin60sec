import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/sections/WhyChooseUs";
import BusinessIdentity from "@/components/BusinessIdentity";

export const metadata = {
  title: "About Us",
  description:
    "TaxIn60Sec helps people and businesses start tax and compliance work from their situation, then keep their case organised.",
};

const values = [
  ["Start with context", "A short rule-based check helps clarify what needs attention."],
  ["Structured case journey", "Intake, documents and case updates stay in one place."],
  ["Support when needed", "Use the available service and support paths rather than a scattered chat."],
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="page-hero">
        <div className="container-main">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="eyebrow">About Us</p>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Building Modern Finance Solutions For Businesses
              </h1>
              <p className="section-copy mt-5 max-w-3xl">
                Tax60Sec helps startups, creators, founders and businesses
                simplify taxation, compliance and finance operations with modern
                technology and expert consulting.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {values.map(([title, desc]) => (
                <div key={title} className="card-dark p-4">
                  <h2 className="text-lg font-bold tracking-tight text-emerald-400">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm text-secondary">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <section className="pb-14"><div className="container-main max-w-3xl"><BusinessIdentity /></div></section>
      <Footer />
    </main>
  );
}
