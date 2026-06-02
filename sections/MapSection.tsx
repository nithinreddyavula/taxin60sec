export default function MapSection() {
  return (
    <section className="section-space overflow-hidden">
      <div className="container-main">
        <div className="card-dark overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18"
            width="100%"
            height="320"
            loading="lazy"
            className="h-72 w-full border-0 md:h-80"
            title="Tax60Sec map"
          />
        </div>
      </div>
    </section>
  );
}
