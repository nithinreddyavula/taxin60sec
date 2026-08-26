type Step = { title: string; copy: string };

const steps: Step[] = [
  { title: "Check your situation", copy: "A few plain-language questions" },
  { title: "See what applies", copy: "A clear next step before you commit" },
  { title: "Start a guided case", copy: "Documents and details stay together" },
  { title: "Follow the progress", copy: "Return for case updates and deadlines" },
];

export default function HowItWorks() {
  return (
    <section className="section-space">
      <div className="container-main">
        <div className="section-header">
          <p className="eyebrow">A clear path, not a sales call</p>
          <h2 className="section-title mt-3">From “I’m not sure” to an organised next step.</h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-4 lg:flex lg:items-start lg:justify-between">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;

            return (
              <div
                key={step.title}
                className="relative flex flex-col items-center gap-2.5 text-center lg:flex-1"
              >
                {!isLast && (
                  <span
                    className="pointer-events-none absolute left-1/2 top-5 hidden h-px w-full border-t border-dashed border-white/15 lg:block"
                    aria-hidden="true"
                  />
                )}

                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-400 ring-4 ring-[#020817]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <p className="text-xs font-semibold leading-tight text-white">{step.title}</p>
                  {step.copy && (
                    <p className="mt-0.5 text-[11px] text-secondary">{step.copy}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
