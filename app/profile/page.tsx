"use client";

import { UserRound, Mail, ShieldCheck } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useAppSession } from "@/components/AppProviders";

export default function ProfilePage() {
  const { user } = useAppSession();

  return (
    <AppShell>
      <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-600">Account</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Profile & Settings</h1>

      <section className="mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <UserRound size={26} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">{user?.name ?? "Not provided"}</p>
            <p className="text-sm text-slate-500">
              {user?.roles?.map((role) => role.replace("ROLE_", "")).join(", ")}
            </p>
          </div>
        </div>

        <dl className="mt-8 grid gap-6 border-t border-slate-100 pt-6 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 text-slate-400" />
            <div>
              <dt className="text-sm text-slate-500">Email</dt>
              <dd className="mt-1 font-semibold text-slate-900">{user?.email ?? "Not provided"}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} className="mt-0.5 text-slate-400" />
            <div>
              <dt className="text-sm text-slate-500">Account type</dt>
              <dd className="mt-1 font-semibold text-slate-900">
                {user?.roles?.[0]?.replace("ROLE_", "") ?? "—"}
              </dd>
            </div>
          </div>
        </dl>
      </section>
    </AppShell>
  );
}