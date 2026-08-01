import { ShieldCheck } from "lucide-react";

const steps = [
  {
    title: "Check Tax Health",
    copy: "Answer a few quick questions and get your score instantly.",
  },
  {
    title: "Share & Upload",
    copy: "Share details and upload required documents securely.",
  },
  {
    title: "CA Reviews",
    copy: "Our expert CA reviews your case and handles everything.",
  },
  {
    title: "Relax",
    copy: "We file, track, and notify you. You stay stress-free.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-space">
      <div className="container-main">
        <div className="card-dark grid gap-10 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Simple. Secure. Seamless.
            </h2>

            <div className="mt-7 space-y-6">
              {steps.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="mt-1 text-sm text-secondary">{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden items-center justify-center lg:flex">
            <div className="absolute h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/5">
              <ShieldCheck size={72} className="text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}