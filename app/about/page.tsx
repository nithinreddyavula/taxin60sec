import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {

  return (

    <main className="bg-[#020817] text-white min-h-screen">

      <Navbar />

      <section className="pt-40 pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <p className="text-blue-400 uppercase tracking-[0.3em] font-semibold">

            About Us

          </p>

          <h1 className="mt-6 text-6xl font-bold leading-tight">

            Building Modern Finance
            <br />
            Solutions For Businesses

          </h1>

          <p className="mt-8 max-w-3xl text-xl text-gray-300 leading-10">

            Tax60Sec helps startups, creators,
            founders and businesses simplify taxation,
            compliance and finance operations with modern technology
            and expert consulting.

          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-20">

            {
              [
                ["500+", "Clients Served"],
                ["10+", "Years Experience"],
                ["24/7", "Support & Guidance"],
              ].map((item, i) => (

                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-3xl p-10"
                >

                  <h2 className="text-5xl font-bold text-blue-500">

                    {item[0]}

                  </h2>

                  <p className="mt-4 text-gray-300 text-lg">

                    {item[1]}

                  </p>

                </div>

              ))
            }

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}