"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BriefcaseBusiness, ChevronRight, ClipboardList, LayoutDashboard, LogOut, Menu, ShieldCheck, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppSession } from "./AppProviders";

const clientLinks = [{ href: "/dashboard", label: "Overview", icon: LayoutDashboard }, { href: "/intake", label: "Start a service", icon: BriefcaseBusiness }, { href: "/dashboard", label: "My cases", icon: ClipboardList }, { href: "/profile", label: "Profile", icon: UserRound }];
const caLinks = [{ href: "/ca/cases", label: "Work queue", icon: ClipboardList }, { href: "/profile", label: "Profile", icon: UserRound }];
const adminLinks = [{ href: "/admin", label: "System overview", icon: LayoutDashboard }, { href: "/ca/cases", label: "Case queue", icon: ClipboardList }, { href: "/profile", label: "Profile", icon: UserRound }];

export default function AppShell({ children, roles = ["ROLE_CLIENT", "ROLE_CA", "ROLE_ADMIN"] }: { children: React.ReactNode; roles?: string[] }) {
  const { user, ready, logout } = useAppSession(); const router = useRouter(); const pathname = usePathname(); const [open, setOpen] = useState(false);
  useEffect(() => { if (ready && (!user || !user.roles.some((role) => roles.includes(role.name)))) router.replace("/login"); }, [ready, user, roles, router]);
  if (!ready || !user || !user.roles.some((role) => roles.includes(role.name))) return <main className="min-h-screen bg-[#020817] p-6 text-white"><div className="mx-auto mt-24 h-40 max-w-5xl animate-pulse rounded-2xl bg-white/5" /></main>;
  const links = user.roles.some((role) => role.name === "ROLE_ADMIN") ? adminLinks : user.roles.some((role) => role.name === "ROLE_CA") ? caLinks : clientLinks;
  const close = () => setOpen(false);
  return <div className="min-h-screen bg-[#020817] text-white lg:grid lg:grid-cols-[250px_1fr]">
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#060d1d] p-4 transition-transform lg:static lg:w-auto ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
      <div className="flex items-center justify-between px-2 py-3"><Link href="/dashboard" className="text-xl font-bold">Tax<span className="text-blue-500">60</span>Sec</Link><button onClick={close} className="lg:hidden" aria-label="Close menu"><X /></button></div>
      <p className="px-2 pt-8 text-xs font-bold uppercase tracking-[.18em] text-slate-500">Workspace</p><nav className="mt-3 grid gap-1">{links.map(({ href, label, icon: Icon }) => <Link onClick={close} key={label} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${pathname === href ? "bg-blue-500/15 text-blue-300" : "text-slate-300 hover:bg-white/5"}`}><Icon size={18} />{label}</Link>)}</nav>
      <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-white/[.03] p-3"><p className="truncate text-sm font-semibold">{user.name ?? user.email ?? "Tax60 member"}</p><p className="mt-1 text-xs text-secondary">{user.roles[0]?.name.replace("ROLE_", "")}</p><button onClick={() => { logout(); router.replace("/"); }} className="mt-3 flex items-center gap-2 text-sm text-slate-300 hover:text-white"><LogOut size={16} /> Sign out</button></div>
    </aside>
    {open && <button onClick={close} aria-label="Close menu overlay" className="fixed inset-0 z-40 bg-black/50 lg:hidden" />}
    <div className="min-w-0"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#020817]/90 px-4 backdrop-blur lg:px-8"><button onClick={() => setOpen(true)} className="lg:hidden" aria-label="Open menu"><Menu /></button><div className="hidden items-center gap-2 text-sm text-secondary sm:flex"><ShieldCheck size={17} className="text-emerald-400" /> Secure Tax60 workspace <ChevronRight size={15} /></div><Link href="/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-blue-200" aria-label="Open profile"><UserRound size={18} /></Link></header><main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main></div>
  </div>;
}
