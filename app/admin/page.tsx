"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, CheckCircle2, TrendingUp, Users } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import AppShell from "@/components/AppShell";
import { AdminService, AdminDashboard } from "@/services/admin-service";

const COLORS = ["#3b82f6", "#f59e0b", "#a855f7", "#10b981", "#ef4444"];

export default function AdminOverviewPage() {
  const [data, setData] = useState<AdminDashboard | null>(null);

  useEffect(() => {
    AdminService.dashboard().then(setData).catch(() => {});
  }, []);

  const donutData = data
    ? [
        { name: "In Progress", value: data.inProgress },
        { name: "CA Review", value: data.caReview },
        { name: "Pending Info", value: data.intake + data.documentCollection },
        { name: "Completed", value: data.completed },
        { name: "Cancelled", value: data.cancelled },
      ]
    : [];

  return (
    <AppShell roles={["ROLE_ADMIN"]}>
      <h1 className="text-3xl font-bold">Good morning, Admin!</h1>
      <p className="mt-2 text-secondary">Here&apos;s what&apos;s happening on the platform today.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="card-dark p-6">
          <Users size={20} className="text-blue-400" />
          <p className="mt-3 text-3xl font-bold">{data?.totalCases ?? "—"}</p>
          <p className="text-sm text-secondary">Total Cases</p>
        </div>
        <div className="card-dark p-6">
          <Briefcase size={20} className="text-amber-400" />
          <p className="mt-3 text-3xl font-bold">{data ? data.inProgress + data.caReview : "—"}</p>
          <p className="text-sm text-secondary">Active Cases</p>
        </div>
        <div className="card-dark p-6">
          <CheckCircle2 size={20} className="text-emerald-400" />
          <p className="mt-3 text-3xl font-bold">{data?.completed ?? "—"}</p>
          <p className="text-sm text-secondary">Completed Cases</p>
        </div>
        <div className="card-dark p-6">
          <TrendingUp size={20} className="text-purple-400" />
          <p className="mt-3 text-3xl font-bold">{data?.draft ?? "—"}</p>
          <p className="text-sm text-secondary">Draft Cases</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Link href="/admin/clients" className="card-dark block p-6 hover:bg-white/[0.03]">
          <p className="font-bold">Clients</p>
          <p className="mt-1 text-sm text-secondary">Manage all registered clients on the platform →</p>
        </Link>

        <section className="card-dark p-6">
          <p className="font-bold">Case Status Overview</p>
          {data && (
            <div className="mt-2 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donutData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                    {donutData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Link href="/admin/cases" className="card-dark p-5 hover:bg-white/[0.03]">
          <p className="font-bold">Cases</p>
          <p className="mt-1 text-xs text-secondary">Track and manage all client cases</p>
        </Link>
        <Link href="/admin/ca-applications" className="card-dark p-5 hover:bg-white/[0.03]">
          <p className="font-bold">CA Management</p>
          <p className="mt-1 text-xs text-secondary">Manage and monitor all CA partners</p>
        </Link>
        <Link href="/admin/reports" className="card-dark p-5 hover:bg-white/[0.03]">
          <p className="font-bold">Reports & Analytics</p>
          <p className="mt-1 text-xs text-secondary">Insights and analytics across the platform</p>
        </Link>
      </div>
    </AppShell>
  );
}