import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/sections/WhyChooseUs";

const metrics = [
  ["500+", "Clients Served"],
  ["10+", "Years Experience"],
  ["24/7", "Support & Guidance"],
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7faf9] text-slate-900">
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
              {metrics.map(([value, label]) => (
                <div key={label} className="card-dark p-4">
                  <h2 className="text-3xl font-bold tracking-tight text-blue-400">
                    {value}
                  </h2>
                  <p className="mt-1 text-sm text-secondary">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Footer />
    </main>
  );
}