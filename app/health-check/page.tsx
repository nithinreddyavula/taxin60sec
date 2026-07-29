"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  HealthCheckService,
  HealthCheckResult,
} from "@/services/health-check-service";

const USER_TYPES = [
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "FREELANCER", label: "Freelancer" },
  { value: "BUSINESS", label: "Business" },
  { value: "NRI", label: "NRI" },
];

const QUESTIONS: Record<string, { key: string; text: string }[]> = {
  INDIVIDUAL: [
    { key: "itr_filed", text: "Have you filed your Income Tax Return for this year?" },
    { key: "advance_tax_paid", text: "Have you paid advance tax on time (if applicable)?" },
  ],
  FREELANCER: [
    { key: "itr_filed", text: "Have you filed your Income Tax Return for this year?" },
    { key: "advance_tax_paid", text: "Have you paid advance tax on time (if applicable)?" },
    { key: "gst_registered", text: "Are you GST registered, if your income requires it?" },
  ],
  BUSINESS: [
    { key: "gst_filed", text: "Have you filed your GST returns for this period?" },
    { key: "tds_filed", text: "Is your TDS compliance up to date?" },
    { key: "roc_filed", text: "Have you completed your ROC annual filing?" },
  ],
  NRI: [
    { key: "itr_filed", text: "Have you filed your Indian Income Tax Return this year?" },
    { key: "accounts_declared", text: "Have you declared your NRE/NRO accounts?" },
    { key: "repatriation_forms", text: "Have you filed Form 15CA/15CB for any fund repatriation?" },
  ],
};

function scoreColor(score: number) {
  if (score >= 85) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
}

export default function HealthCheckPage() {
  const router = useRouter();
  const [step, setStep] = useState<"type" | "questions" | "results">("type");
  const [userType, setUserType] = useState("");
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<HealthCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [capturing, setCapturing] = useState(false);
  const [leadId, setLeadId] = useState<number | null>(null);

  function selectType(type: string) {
    setUserType(type);
    setAnswers({});
    setStep("questions");
  }

  function answer(key: string, value: boolean) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  async function seeResults() {
    setLoading(true);
    try {
      const res = await HealthCheckService.evaluate(userType, answers);
      setResult(res);
      setStep("results");

      try {
        const lead = await HealthCheckService.captureLead(userType, res);
        setLeadId(lead.id);
      } catch {
        // Silent capture is best-effort — the quiz still works without it.
      }
    } finally {
      setLoading(false);
    }
  }

  function fixWithTax60(serviceId: number) {
    if (leadId != null && typeof window !== "undefined") {
      localStorage.setItem("tax60-health-check-lead-id", String(leadId));
    }
    router.push(`/intake?id=${serviceId}`);
  }

  const questions = QUESTIONS[userType] ?? [];
  const allAnswered = questions.every((q) => answers[q.key] !== undefined);

  async function captureResults() {
    if (!result || !leadEmail.trim()) return;
    setCapturing(true);
    try {
      const lead = await HealthCheckService.captureLead(userType, result, {
        leadId: leadId ?? undefined,
        email: leadEmail.trim(),
      });
      setLeadId(lead.id);
      toast.success("Results sent to your email");
    } catch {
      toast.error("Unable to send results right now");
    } finally {
      setCapturing(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <Navbar />

      <section className="pt-16 pb-20">
        <div className="container-main max-w-2xl">

          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm">
            Free Tax Health Check
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Find out where you stand — in under a minute
          </h1>

          {step === "type" && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {USER_TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => selectType(t.value)}
                  className="card-dark p-6 text-left text-xl font-semibold hover:border-blue-500/40 transition"
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {step === "questions" && (
            <div className="mt-8 space-y-4">
              {questions.map((q) => (
                <div key={q.key} className="card-dark p-5">
                  <p className="mb-3 text-secondary">{q.text}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => answer(q.key, true)}
                      className={`px-5 py-2 rounded-lg font-medium ${
                        answers[q.key] === true
                          ? "bg-blue-600 text-white"
                          : "bg-white/5 text-secondary"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => answer(q.key, false)}
                      className={`px-5 py-2 rounded-lg font-medium ${
                        answers[q.key] === false
                          ? "bg-blue-600 text-white"
                          : "bg-white/5 text-secondary"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={seeResults}
                disabled={!allAnswered || loading}
                className="btn-primary w-full mt-2 disabled:opacity-50"
              >
                {loading ? "Checking..." : "See my Tax Health Score"}
              </button>
            </div>
          )}

          {step === "results" && result && (
            <div className="mt-8 space-y-5">

              <div className="card-dark p-6 text-center">
                <p className="text-sm text-secondary mb-1">Your tax health score</p>
                <p className={`text-5xl font-bold ${scoreColor(result.score)}`}>
                  {result.score}
                  <span className="text-lg text-secondary">/100</span>
                </p>
                <p className="mt-2 text-secondary">{result.statusLabel}</p>
              </div>

              {result.issues.length > 0 && (
                <div className="card-dark p-5">
                  <p className="font-semibold mb-3">
                    {result.issues.length} action{result.issues.length === 1 ? "" : "s"} need attention
                  </p>
                  <ul className="space-y-2">
                    {result.issues.map((issue, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            issue.severity === "HIGH" ? "bg-red-400" : "bg-yellow-400"
                          }`}
                        />
                        {issue.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.recommendations.length > 0 && (
                <div className="space-y-3">
                  <p className="font-semibold">Recommended for you</p>
                  {result.recommendations.map((rec) => (
                    <div key={rec.code} className="card-dark p-5 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{rec.displayName}</p>
                        <p className="text-sm text-secondary">
                          Starting ₹{Number(rec.priceFrom).toLocaleString("en-IN")} · {rec.turnaroundDays} day turnaround
                        </p>
                      </div>
                      <button
                        onClick={() => fixWithTax60(rec.serviceId)}
                        className="btn-primary shrink-0"
                      >
                        Fix with Tax60
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {result.issues.length === 0 && (
                <p className="text-secondary text-center">
                  You&apos;re in good shape! We&apos;ll keep monitoring your obligations.
                </p>
              )}

              <div className="card-dark p-5">
                <p className="font-semibold mb-1">Not ready yet?</p>
                <p className="text-sm text-secondary mb-3">
                  Get these results emailed to you so you don&apos;t lose them.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm"
                  />
                  <button
                    onClick={captureResults}
                    disabled={!leadEmail.trim() || capturing}
                    className="btn-secondary shrink-0 disabled:opacity-50"
                  >
                    {capturing ? "Sending..." : "Email my results"}
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}