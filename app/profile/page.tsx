"use client";

import { UserRound, Mail, ShieldCheck } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useAppSession } from "@/components/AppProviders";

export default function ProfilePage() {
  const { user } = useAppSession();

  return (
    <AppShell>
      <p className="eyebrow">Account</p>
      <h1 className="mt-2 text-3xl font-bold">Profile &amp; Settings</h1>

      <section className="card-dark mt-8 max-w-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
            <UserRound size={26} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">{user?.fullName ?? "Not provided"}</p>
            <p className="text-sm text-secondary">
              {user?.roles?.map((role) => role.replace("ROLE_", "")).join(", ")}
            </p>
          </div>
        </div>

        <dl className="mt-8 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 text-secondary" />
            <div>
              <dt className="text-sm text-secondary">Email</dt>
              <dd className="mt-1 font-semibold text-white">{user?.email ?? "Not provided"}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} className="mt-0.5 text-secondary" />
            <div>
              <dt className="text-sm text-secondary">Account type</dt>
              <dd className="mt-1 font-semibold text-white">
                {user?.roles?.[0]?.replace("ROLE_", "") ?? "—"}
              </dd>
            </div>
          </div>
        </dl>
      </section>
    </AppShell>
  );
}