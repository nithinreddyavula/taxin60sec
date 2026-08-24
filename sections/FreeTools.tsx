import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  UserCheck2,
  ShieldCheck,
  Activity,
  Lock,
  MessageCircle,
  Calculator,
  type LucideIcon,
} from "lucide-react";

type Highlight = { icon: LucideIcon; title: string; copy: string };

const HIGHLIGHTS: Highlight[] = [
  { icon: Sparkles, title: "AI Identifies", copy: "What You Actually Need" },
  { icon: UserCheck2, title: "Expert CA", copy: "Verifies Every Case" },
  { icon: ShieldCheck, title: "Transparent Pricing", copy: "Before You Pay" },
  { icon: Activity, title: "Live Progress", copy: "Tracking" },
  { icon: Lock, title: "Secure Document", copy: "Vault" },
  { icon: MessageCircle, title: "WhatsApp Updates", copy: "At Every Stage" },
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
          <h2 className="section-title">Free Tools &amp; Tax60?</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
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

        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
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
