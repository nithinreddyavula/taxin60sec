"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import AppShell from "@/components/AppShell";
import { ComplianceService, ComplianceScore } from "@/services/compliance-service";

const HISTORY = [
  { month: "Dec", score: 62 }, { month: "Jan", score: 68 }, { month: "Feb", score: 71 },
  { month: "Mar", score: 75 }, { month: "Apr", score: 79 }, { month: "May", score: 85 },
];

const ringColor = (score: number) =>
  score >= 85 ? "#34d399" : score >= 70 ? "#3b82f6" : score >= 50 ? "#fbbf24" : "#f87171";

const statusIcon = (status: string) => {
  if (status === "OVERDUE") return <AlertTriangle size={15} className="text-red-400" />;
  if (status === "COMPLETED") return <CheckCircle2 size={15} className="text-emerald-400" />;
  return <ShieldCheck size={15} className="text-blue-300" />;
};

export default function TaxHealthPage() {
  const [data, setData] = useState<ComplianceScore | null>(null);

  useEffect(() => {
    ComplianceService.myScore().then(setData).catch(() => {});
  }, []);

  const circumference = 2 * Math.PI * 40;
  const offset = data ? circumference - (data.score / 100) * circumference : circumference;

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <h1 className="text-3xl font-bold">Your Tax Health</h1>
      <p className="mt-2 text-secondary">Last updated on {new Date().toLocaleDateString()}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr_0.8fr]">
        <section className="card-dark p-5">
          <p className="font-bold">Tax Health Score</p>
          {data ? (
            <>
              <div className="relative mx-auto mt-4 h-28 w-28">
                <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="9" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke={ringColor(data.score)} strokeWidth="9" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">{data.score}</span>
                  <span className="text-[10px] text-secondary">/100</span>
                </div>
              </div>
              <p className="mt-3 text-center text-sm font-semibold text-emerald-500">{data.statusLabel}</p>
              <p className="mt-1 text-center text-xs text-secondary">You&apos;re doing great! Keep it up.</p>
            </>
          ) : (
            <div className="mt-4 h-28 animate-pulse rounded-xl bg-black/5" />
          )}
          <Link href="/intake" className="btn-primary mt-4 w-full">View Detailed Report</Link>
        </section>

        <section className="card-dark p-5">
          <p className="font-bold">Score Summary</p>
          <div className="mt-4 space-y-3">
            {(data?.items ?? []).map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">{statusIcon(item.status)} {item.title}</span>
                <span className="text-xs font-semibold text-secondary">{item.status.replace("_", " ")}</span>
              </div>
            ))}
            {(!data || data.items.length === 0) && (
              <p className="text-sm text-secondary">No compliance items tracked yet.</p>
            )}
          </div>
        </section>

        <section className="card-dark p-5 text-center">
          <p className="font-bold">Potential Tax Saving</p>
          <p className="mt-3 text-2xl font-bold text-emerald-500">₹18,400</p>
          <p className="mt-1 text-xs text-secondary">If you act on the opportunities</p>
          <Link href="/intake" className="btn-secondary mt-4 w-full">Explore Opportunities</Link>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="card-dark p-5">
          <p className="font-bold">Insights for You</p>
          <p className="mt-2 text-sm text-secondary">Great job! We found 2 areas that can help you save more tax.</p>
          <ul className="mt-3 space-y-2 text-sm text-secondary">
            <li>Invest in ELSS before 31 Mar to save on tax</li>
            <li>Consider updating your HRA details — you may save more</li>
          </ul>
          <Link href="/intake" className="mt-3 inline-block text-xs font-semibold text-emerald-500">View Detailed Insights</Link>
        </section>

        <section className="card-dark p-5">
          <p className="font-bold">Health History</p>
          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={HISTORY}>
                <XAxis dataKey="month" fontSize={11} />
                <YAxis fontSize={11} domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </AppShell>
  );
}