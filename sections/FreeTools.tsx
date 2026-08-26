import Link from "next/link";
import { ArrowRight, BellRing, Calculator, ClipboardCheck, Share2, type LucideIcon } from "lucide-react";

type Highlight = { icon: LucideIcon; title: string; copy: string };

const HIGHLIGHTS: Highlight[] = [
  { icon: ClipboardCheck, title: "Tax health check", copy: "Find a sensible starting point" },
  { icon: Calculator, title: "Tax calculator", copy: "Compare a simple estimate" },
  { icon: BellRing, title: "Deadline reminders", copy: "Keep key dates visible" },
  { icon: Share2, title: "Easy to share", copy: "Send a useful starting point" },
];

type Tool = { icon: LucideIcon; title: string; tone: string; href: string };

const TOOLS: Tool[] = [
  { icon: Calculator, title: "Income Tax Calculator", tone: "bg-blue-500/15 text-blue-300", href: "/tools" },
];

export default function FreeTools() {
  return (
    <section className="section-space">
      <div className="container-main">
        <div className="section-header">
          <p className="eyebrow">Useful before you are ready to file</p>
          <h2 className="section-title mt-3">Free tax tools and reminders</h2>
          <p className="section-copy mt-3">Use a calculator, check deadlines, or share a useful starting point with someone who needs tax help.</p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
                  <Icon size={20} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-secondary">{item.copy}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-end">
          <Link href="/tools" className="flex items-center gap-1 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300">
            Open free tools
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="card-dark flex flex-col items-start gap-3 p-4 transition hover:-translate-y-0.5 hover:border-emerald-400/30"
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tool.tone}`}>
                  <Icon size={17} />
                </div>
                <p className="text-xs font-semibold leading-tight text-white">{tool.title}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
