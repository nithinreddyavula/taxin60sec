export default function MapSection() {

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4">
          Visit Us
        </p>

        <h2 className="text-5xl font-bold mb-12">
          Our Office Location
        </h2>

        <div className="rounded-[30px] overflow-hidden shadow-lg">

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d289.0476787380129!2d77.57696482946456!3d12.911159472607718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1500604f5e69%3a0xa1d4fcab8c3f715a!2stech%20bite%E2%80%99s%20cafe!5e0!3m2!1sen!2sin!4v1778999692340!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-[30px]"
          ></iframe>

        </div>

      </div>

    </section>
  );
}