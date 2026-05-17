import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {

  return (
    <section className="py-24 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-10 rounded-[30px] shadow">

            <Mail size={40} />

            <h3 className="text-2xl font-bold mt-6">
              Email
            </h3>

            <p className="text-gray-600 mt-4">
              taxin60sec@gmail.com
            </p>

          </div>

          <div className="bg-white p-10 rounded-[30px] shadow">

            <Phone size={40} />

            <h3 className="text-2xl font-bold mt-6">
              Phone
            </h3>

            <p className="text-gray-600 mt-4">
              +91 9876543210
            </p>

          </div>

          <div className="bg-white p-10 rounded-[30px] shadow">

            <MapPin size={40} />

            <h3 className="text-2xl font-bold mt-6">
              Office
            </h3>

            <p className="text-gray-600 mt-4">
              Bangalore, India
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}