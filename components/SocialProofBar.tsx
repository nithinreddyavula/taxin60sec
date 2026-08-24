import { ShieldCheck } from "lucide-react";

export default function SocialProofBar() {
  return (
    <section className="py-6">
      <div className="container-main">
        <div className="card-dark flex flex-col items-center justify-between gap-4 p-5 sm:flex-row">
          <div className="flex items-center gap-3"><ShieldCheck className="text-emerald-400" size={20} /><p className="text-sm text-secondary">Start with a free Tax Health Check, then work with a CA on the filing steps that apply to you.</p></div>
        </div>
      </div>
    </section>
  );
}
