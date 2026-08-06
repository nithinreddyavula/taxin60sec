"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText, Wallet, ClipboardList, LifeBuoy } from "lucide-react";
import { CaseService, CaseItem } from "@/services/case-service";

// Phase 12 — one global search that reaches Cases, Vault, Payments, and Support
// from anywhere, instead of each page having its own filter box.
const QUICK_LINKS = [
  { label: "Track a case", href: "/ca-workspace", icon: ClipboardList, keywords: "case status workspace track" },
  { label: "Document vault", href: "/vault", icon: FileText, keywords: "documents vault upload files" },
  { label: "Payment history", href: "/payments", icon: Wallet, keywords: "payment invoice bill pay" },
  { label: "Support", href: "/notices", icon: LifeBuoy, keywords: "help support faq contact" },
];

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cases, setCases] = useState<CaseItem[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open && cases === null) {
      CaseService.list()
        .then((page) => setCases(page.items))
        .catch(() => setCases([]));
    }
  }, [open, cases]);

  const filteredCases = useMemo(() => {
    if (!query.trim()) return (cases ?? []).slice(0, 4);
    const q = query.toLowerCase();
    return (cases ?? []).filter(
      (c) =>
        c.caseNumber.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        (c.assignedCaName ?? "").toLowerCase().includes(q)
    );
  }, [cases, query]);

  const filteredLinks = useMemo(() => {
    if (!query.trim()) return QUICK_LINKS;
    const q = query.toLowerCase();
    return QUICK_LINKS.filter((l) => l.label.toLowerCase().includes(q) || l.keywords.includes(q));
  }, [query]);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-500 hover:border-slate-300"
        aria-label="Search"
      >
        <Search size={15} />
        <span className="hidden sm:inline">Search</span>
        <span className="hidden rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 sm:inline">
          ⌘K
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 p-4 pt-24" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0b1324] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <Search size={16} className="text-secondary" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a service, case, or payment..."
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button onClick={() => setOpen(false)} aria-label="Close search" className="text-secondary">
                <X size={16} />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filteredCases.length > 0 && (
                <div className="mb-2">
                  <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-secondary">Your cases</p>
                  {filteredCases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => go(`/cases/${c.id}`)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-200 hover:bg-white/5"
                    >
                      <ClipboardList size={16} className="text-emerald-400" />
                      <span className="min-w-0 flex-1 truncate">
                        <span className="font-semibold">{c.caseNumber}</span> · {c.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {filteredLinks.length > 0 && (
                <div>
                  <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-secondary">Quick links</p>
                  {filteredLinks.map((l) => (
                    <button
                      key={l.href}
                      onClick={() => go(l.href)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-200 hover:bg-white/5"
                    >
                      <l.icon size={16} className="text-blue-300" />
                      {l.label}
                    </button>
                  ))}
                </div>
              )}

              {filteredCases.length === 0 && filteredLinks.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-secondary">No matches. Try a different term.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}