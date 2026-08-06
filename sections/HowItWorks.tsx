import { ClipboardList, BarChart3, UserCheck2, UploadCloud, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "1. Check Tax Health",
    copy: "Answer a few simple questions in 2 minutes",
  },
  {
    icon: BarChart3,
    title: "2. Get Your Report",
    copy: "See your tax health score and recommendations",
  },
  {
    icon: UserCheck2,
    title: "3. Expert CA Assigned",
    copy: "We assign the best CA for your case",
  },
  {
    icon: UploadCloud,
    title: "4. Upload & Relax",
    copy: "Upload documents securely. We handle the rest.",
  },
  {
    icon: CheckCircle2,
    title: "5. File & Done",
    copy: "Track progress and get notified at every step",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-space">
      <div className="container-main">
        <div className="section-header">
          <p className="eyebrow">How It Works</p>
          <h2 className="section-title mt-3">Simple. Fast. Stress-Free.</h2>
        </div>

        <div className="mt-10 flex flex-col items-stretch gap-6 lg:flex-row lg:items-start">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.title} className="flex flex-1 items-start gap-3 lg:flex-col lg:items-center lg:text-center">
                <div className="flex flex-col items-center gap-3 lg:flex-1">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <Icon size={26} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="mt-1 text-sm text-secondary">{step.copy}</p>
                  </div>
                </div>

                {!isLast && (
                  <ArrowRight
                    size={18}
                    className="mt-5 hidden shrink-0 text-slate-600 lg:block"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}