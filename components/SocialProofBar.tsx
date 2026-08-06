import { Star } from "lucide-react";

const AVATARS = [
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=32",
  "https://i.pravatar.cc/64?img=47",
];

export default function SocialProofBar() {
  return (
    <section className="py-6">
      <div className="container-main">
        <div className="card-dark flex flex-col items-center justify-between gap-4 p-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {AVATARS.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-9 w-9 rounded-full border-2 border-[#020817] object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-secondary">
              Trusted by <span className="font-semibold text-white">20,000+</span> individuals
              and businesses across India
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">4.9/5</span>
            <span className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </span>
            <span className="text-xs text-secondary">Google Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}