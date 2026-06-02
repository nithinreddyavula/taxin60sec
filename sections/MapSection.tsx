export default function MapSection() {
  return (
    <section className="section-space overflow-hidden">
      <div className="container-main">

        <div className="card-dark overflow-hidden">

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18"
            width="100%"
            height="450"
            loading="lazy"
            className="border-0 w-full"
          />

        </div>

      </div>
    </section>
  );
}