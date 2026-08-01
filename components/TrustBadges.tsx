const companies = ["Google", "Microsoft", "Razorpay", "Groww", "CRED", "PhonePe", "Zoho", "Amazon"];

export default function TrustBadges() {
  return (
    <section className="border-y border-white/8 bg-white/[.02] py-8">
      <div className="container-main">
        <p className="text-center text-sm text-secondary">
          Trusted by 20,000+ individuals and businesses across India and abroad
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {companies.map((name) => (
            <span key={name} className="text-base font-bold tracking-tight text-slate-500">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}