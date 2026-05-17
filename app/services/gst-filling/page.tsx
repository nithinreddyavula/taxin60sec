import Link from "next/link";

export const metadata = {
  title: "GST Filing",
};

export default function GSTFilingPage() {

  return (
    <div className="min-h-screen bg-gray-100 py-24 px-6">

      <div className="max-w-5xl mx-auto">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4">
          GST Services
        </p>

        <h1 className="text-5xl font-bold mb-10">
          GST Filing & Compliance
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          We provide complete GST registration, filing,
          compliance, return filing, and advisory services
          for businesses and startups across India.
        </p>

        <div className="mt-12 space-y-6">

          <div className="bg-white p-8 rounded-[30px] shadow">

            <h2 className="text-2xl font-bold">
              Our GST Services Include
            </h2>

            <ul className="mt-6 space-y-4 text-gray-700">

              <li>• GST Registration</li>
              <li>• Monthly & Quarterly Filing</li>
              <li>• GST Notice Handling</li>
              <li>• Input Tax Credit Assistance</li>
              <li>• GST Compliance Support</li>

            </ul>

          </div>

        </div>

        <Link
          href="/contact"
          className="inline-flex mt-12 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition"
        >
          Book Consultation
        </Link>

      </div>

    </div>
  );
}