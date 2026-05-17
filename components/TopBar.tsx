import Link from "next/link";

export default function TopBar() {

  return (
    <div className="bg-black text-white py-3 px-6 text-center text-sm flex flex-col md:flex-row items-center justify-center gap-4">

      <p>
        Book Your Free Tax Consultation Today
      </p>

      <Link
        href="/contact"
        className="bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition"
      >
        Book Appointment
      </Link>

    </div>
  );
}