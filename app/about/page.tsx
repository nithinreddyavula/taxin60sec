export const metadata = {
  title: "About",
};
export default function AboutPage() {

  return (
    <div className="min-h-screen bg-gray-100 py-24 px-6">

      <div className="max-w-5xl mx-auto">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4">
          About Us
        </p>

        <h1 className="text-5xl font-bold mb-10">
          Trusted Chartered Accountants
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          TaxIn60Sec provides professional taxation, GST,
          audit, compliance, and startup advisory services
          for businesses and individuals across India.
        </p>

      </div>

    </div>
  );
}