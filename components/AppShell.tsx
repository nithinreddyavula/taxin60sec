"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, BriefcaseBusiness, Calendar, ChevronRight, ClipboardList, CreditCard, HeartPulse, LayoutDashboard, LogOut, Menu, MessagesSquare, ShieldCheck, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppSession } from "./AppProviders";

const clientLinks = [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }, { href: "/tax-health", label: "Tax Health", icon: HeartPulse }, { href: "/calendar", label: "Tax Calendar", icon: Calendar }, { href: "/my-services", label: "My Services", icon: BriefcaseBusiness }, { href: "/vault", label: "Documents Vault", icon: ClipboardList }, { href: "/ca-workspace", label: "CA Workspace", icon: MessagesSquare }, { href: "/notices", label: "Notices", icon: Bell }, { href: "/payments", label: "Payments", icon: CreditCard }, { href: "/profile", label: "Profile & Settings", icon: UserRound }];
const caLinks = [{ href: "/ca/cases", label: "Work queue", icon: ClipboardList }, { href: "/profile", label: "Profile", icon: UserRound }];
const adminLinks = [{ href: "/admin", label: "System overview", icon: LayoutDashboard }, { href: "/ca/cases", label: "Case queue", icon: ClipboardList }, { href: "/profile", label: "Profile", icon: UserRound }];

export default function AppShell({ children, roles = ["ROLE_CLIENT", "ROLE_CA", "ROLE_ADMIN"] }: { children: React.ReactNode; roles?: string[] }) {
  const { user, ready, logout } = useAppSession(); const router = useRouter(); const pathname = usePathname(); const [open, setOpen] = useState(false);
  useEffect(() => { if (ready && (!user || !user.roles.some((role) => roles.includes(role)))) router.replace("/login"); }, [ready, user, roles, router]);
  if (!ready || !user || !user.roles.some((role) => roles.includes(role))) return <main className="min-h-screen bg-[#f7faf9] p-6 text-slate-900"><div className="mx-auto mt-24 h-40 max-w-5xl animate-pulse rounded-2xl bg-slate-100" /></main>;
  const links = user.roles.includes("ROLE_ADMIN") ? adminLinks : user.roles.includes("ROLE_CA") ? caLinks : clientLinks;
  const close = () => setOpen(false);
  return <div className="min-h-screen bg-[#f4f6f8] lg:grid lg:grid-cols-[250px_1fr]">
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white p-4 text-slate-900 transition-transform lg:static lg:w-auto ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
      <div className="flex items-center justify-between px-2 py-3"><Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold"><ShieldCheck size={20} className="text-emerald-400" />Tax<span className="text-emerald-400">60</span></Link><button onClick={close} className="lg:hidden" aria-label="Close menu"><X /></button></div>
      <p className="px-2 pt-8 text-xs font-bold uppercase tracking-[.18em] text-slate-500">Workspace</p><nav className="mt-3 grid gap-1">{links.map(({ href, label, icon: Icon }) => <Link onClick={close} key={label} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${pathname === href ? "bg-emerald-500/15 text-emerald-300" : "text-slate-600 hover:bg-slate-100"}`}><Icon size={18} />{label}</Link>)}</nav>
      <div className="absolute inset-x-4 bottom-4 rounded-xl border border-slate-200 bg-white/[.03] p-3"><p className="truncate text-sm font-semibold">{user.fullName ?? user.email ?? "Tax60 member"}</p><p className="mt-1 text-xs text-secondary">{user.roles[0]?.replace("ROLE_", "")}</p><button onClick={() => { logout(); router.replace("/"); }} className="mt-3 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"><LogOut size={16} /> Sign out</button></div>
    </aside>
    {open && <button onClick={close} aria-label="Close menu overlay" className="fixed inset-0 z-40 bg-black/50 lg:hidden" />}
    <div className="min-w-0"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:px-8"><button onClick={() => setOpen(true)} className="text-slate-700 lg:hidden" aria-label="Open menu"><Menu /></button><div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex"><ShieldCheck size={17} className="text-emerald-500" /> Secure Tax60 workspace <ChevronRight size={15} /></div><Link href="/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700" aria-label="Open profile"><UserRound size={18} /></Link></header><main className="mx-auto max-w-7xl p-4 text-slate-900 sm:p-6 lg:p-8">{children}</main></div>
  </div>;
}