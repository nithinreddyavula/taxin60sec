"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { User, Briefcase, Globe, Building2, CheckCircle2, ArrowRight, Check, Copy, MessageCircle, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  HealthCheckService,
  HealthCheckResult,
} from "@/services/health-check-service";
import { track } from "@/lib/analytics";

const USER_TYPES = [
  { value: "INDIVIDUAL", label: "Individual", desc: "Salary, Investments, House Property", icon: User },
  { value: "FREELANCER", label: "Freelancer", desc: "Consultant, Creator, Self-employed", icon: Briefcase },
  { value: "NRI", label: "NRI", desc: "Living Abroad, Income in India", icon: Globe },
  { value: "BUSINESS", label: "Business", desc: "Companies, LLP, Partnership", icon: Building2 },
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

// Fix — the stepper now matches the real 3-step flow instead of a
// 4-label stepper where one label was never reachable.
const STEPS = [
  { label: "About You", eyebrow: "Step 1", title: "Tell us about yourself" },
  { label: "Your Income", eyebrow: "Step 2", title: "Let's understand your income" },
  { label: "Your Report", eyebrow: "Step 3", title: "Almost done" },
];

const SECONDS_PER_QUESTION = 15;

const PROFILE_SUMMARIES: Record<string, { situation: string; areas: string[]; documents: string[]; tool?: string }> = {
  INDIVIDUAL: { situation: "You told us you are filing as an individual.", areas: ["Income-tax return status", "Advance-tax timing where applicable"], documents: ["Identity and tax details requested by your selected case", "Income records relevant to the service you select"], tool: "Income tax calculator" },
  FREELANCER: { situation: "You told us you earn as a freelancer or self-employed professional.", areas: ["Income-tax return status", "Advance-tax timing", "GST status where applicable"], documents: ["Income and expense information requested for your case", "GST information where it applies"], tool: "Income tax calculator" },
  BUSINESS: { situation: "You told us you are representing a business.", areas: ["GST return status", "TDS compliance", "ROC filing status"], documents: ["Business and compliance records requested for your case", "GST, TDS or ROC information where it applies"] },
  NRI: { situation: "You told us you are an NRI with Indian tax questions.", areas: ["Indian ITR status", "NRE/NRO account declarations", "Repatriation forms where applicable"], documents: ["Indian-income details requested for your case", "NRE/NRO or repatriation information where it applies"] },
};

function ScoreGauge({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 85 ? "#16A34A" : score >= 60 ? "#F59E0B" : "#DC2626";

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={radius} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-xs text-secondary">/100</span>
      </div>
    </div>
  );
}

// Fix — every answer instantly confirms itself instead of just changing color.
function SavedTag() {
  return (
    <AnimatePresence>
      <motion.span
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="ml-auto flex items-center gap-1 text-xs font-semibold text-emerald-400"
      >
        <Check size={13} /> Saved
      </motion.span>
    </AnimatePresence>
  );
}

export default function HealthCheckPage() {
  const router = useRouter();
  const [step, setStep] = useState<"type" | "questions" | "results">("type");
  const [userType, setUserType] = useState("");
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<HealthCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [capturing, setCapturing] = useState(false);
  const [captured, setCaptured] = useState(false);

  function selectType(type: string) {
    track("health_check_started", { user_type: type });
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
      // Save the anonymous result so a later intake can be associated with the
      // guidance the visitor saw. This is deliberately best-effort: viewing a
      // result never depends on lead capture succeeding.
      HealthCheckService.captureLead(userType, res)
        .then((lead) => localStorage.setItem("tax60-health-check-lead-id", String(lead.id)))
        .catch(() => undefined);
      track("health_check_completed", { user_type: userType, issues: res.issues.length });
    } catch {
      toast.error("Unable to run the check right now");
    } finally {
      setLoading(false);
    }
  }

  async function shareCheck() {
    const url = `${window.location.origin}/health-check`;
    const text = "Not sure what tax service you need? This short tax check gives you a useful starting point.";
    try {
      if (navigator.share) {
        await navigator.share({ title: "TaxIn60Sec tax health check", text, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Health check link copied");
      }
      track("health_check_shared");
    } catch {
      // A visitor cancelling the native share sheet is not an error state.
    }
  }

  async function copyCheckLink() {
    await navigator.clipboard.writeText(`${window.location.origin}/health-check`);
    toast.success("Health check link copied");
    track("health_check_shared", { channel: "copy" });
  }

  function whatsappShare() {
    const url = `${window.location.origin}/health-check`;
    const text = encodeURIComponent(`Not sure what tax service you need? This short TaxIn60Sec check gives you a useful starting point.\n\n${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
    track("health_check_shared", { channel: "whatsapp" });
  }

  async function captureResults() {
    if (!result || !leadEmail.trim()) return;
    setCapturing(true);
    try {
      const lead = await HealthCheckService.captureLead(userType, result, {
        email: leadEmail.trim(),
        phoneNumber: leadPhone.trim(),
      });
      localStorage.setItem("tax60-health-check-lead-id", String(lead.id));
      setCaptured(true);
      track("lead_created", { source: "health_check" });
      track("lead_contact_submitted", { has_phone: Boolean(leadPhone.trim()) });
      toast.success("Results sent to your email");
    } catch {
      toast.error("Unable to send results right now");
    } finally {
      setCapturing(false);
    }
  }

  const questions = QUESTIONS[userType] ?? [];
  const answeredCount = questions.filter((q) => answers[q.key] !== undefined).length;
  const allAnswered = questions.length > 0 && answeredCount === questions.length;
  const currentStepIndex = step === "type" ? 0 : step === "questions" ? 1 : 2;

  // Fix — "Almost there · X seconds left" instead of a bare "2 / 4".
  const secondsLeft = Math.max((questions.length - answeredCount) * SECONDS_PER_QUESTION, 5);
  const questionsProgressLabel =
    answeredCount === 0
      ? `About ${secondsLeft} seconds left`
      : answeredCount === questions.length
      ? "Almost there"
      : `Almost there · ~${secondsLeft}s left`;

  const monitoredAreas = questions.length + 4;
  const compliant = result ? monitoredAreas - result.issues.length : 0;
  const onTimePercent = result ? Math.round((compliant / monitoredAreas) * 100) : 0;

  const cheapestFix = useMemo(() => {
    if (!result || result.recommendations.length === 0) return null;
    return result.recommendations.reduce((min, r) =>
      Number(r.priceFrom) < Number(min.priceFrom) ? r : min
    );
  }, [result]);

  const isGoodNews = !!result && result.issues.length <= 2 && result.score >= 60;
  const profileSummary = PROFILE_SUMMARIES[userType];

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pb-20 pt-12">
        <div className="mx-auto max-w-3xl px-4">

          <div className="mb-3 flex items-center justify-center gap-2 sm:gap-4">
            {STEPS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2 sm:gap-4">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      i < currentStepIndex
                        ? "bg-emerald-500 text-white"
                        : i === currentStepIndex
                        ? "bg-emerald-500 text-white ring-4 ring-emerald-500/30"
                        : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {i < currentStepIndex ? <CheckCircle2 size={16} /> : i + 1}
                  </div>
                  <span className="hidden text-xs font-medium text-secondary sm:block">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 w-6 sm:w-12 ${i < currentStepIndex ? "bg-emerald-500" : "bg-white/10"}`} />
                )}
              </div>
            ))}
          </div>

          {step !== "results" && (
            <p className="mb-7 text-center text-xs font-semibold uppercase tracking-wide text-emerald-400">
              {STEPS[currentStepIndex].eyebrow} · {STEPS[currentStepIndex].title}
            </p>
          )}

          {step === "type" && (
            <div className="card-dark p-8">
              <h1 className="text-center text-2xl font-bold text-white">
                Let&apos;s Check Your Tax Health
              </h1>
              <p className="mt-2 text-center text-secondary">
                Answer a few simple questions to see what needs attention. It&apos;s free.
              </p>

              <p className="mt-8 mb-3 text-sm font-semibold text-slate-200">
                What best describes you?
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {USER_TYPES.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.value}
                      onClick={() => selectType(t.value)}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left transition hover:border-emerald-400/50 hover:bg-emerald-500/10"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                        <Icon size={20} className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{t.label}</p>
                        <p className="text-xs text-secondary">{t.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="mt-6 text-center text-xs text-secondary">
                Usually takes about a minute · You can view guidance before sharing contact details
              </p>
            </div>
          )}

          {step === "questions" && (
            <div className="card-dark p-8">
              <div className="flex items-center justify-between gap-3">
                <h1 className="text-2xl font-bold text-white">A few quick questions</h1>
                <span className="shrink-0 text-xs font-semibold text-emerald-400">
                  {questionsProgressLabel}
                </span>
              </div>
              <p className="mt-1 text-secondary">This helps us spot what needs attention.</p>

              <div className="mt-6 space-y-3">
                {questions.map((q) => (
                  <div key={q.key} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-slate-200">{q.text}</p>
                      {answers[q.key] !== undefined && <SavedTag />}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => answer(q.key, true)}
                        className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                          answers[q.key] === true
                            ? "bg-emerald-500 text-white"
                            : "bg-white/10 text-slate-300 hover:bg-white/20"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => answer(q.key, false)}
                        className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                          answers[q.key] === false
                            ? "bg-emerald-500 text-white"
                            : "bg-white/10 text-slate-300 hover:bg-white/20"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={seeResults}
                disabled={!allAnswered || loading}
                className="btn-primary mt-6 w-full"
              >
                {loading ? "Generating report..." : "See my Tax Health Score"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </div>
          )}

          {step === "results" && result && (
            <div className="space-y-5">

              <div className="card-dark p-8">
                <p className="text-center text-sm font-semibold uppercase tracking-wide text-secondary">
                  We&apos;ve Analyzed Your Profile
                </p>

                {/* Fix — lead with a plain-language verdict instead of a bare number. */}
                <h1 className="mt-1 text-center text-2xl font-bold text-white">
                  {isGoodNews ? "Good news." : "Here's what we found."}
                </h1>
                <p className="mx-auto mt-2 max-w-md text-center text-sm text-secondary">
                  {result.issues.length === 0 ? (
                    "Your tax health is excellent — nothing needs your attention right now."
                  ) : (
                    <>
                      Your tax health score is {result.score}/100 ({result.statusLabel}). We
                      found {result.issues.length} issue{result.issues.length === 1 ? "" : "s"}{" "}
                      that need attention
                      {cheapestFix ? (
                        <> — sorting it out starts at just ₹{Number(cheapestFix.priceFrom).toLocaleString("en-IN")}.</>
                      ) : (
                        "."
                      )}
                    </>
                  )}
                </p>

                <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center">
                  <ScoreGauge score={result.score} />

                  <div className="flex-1 sm:max-w-sm">
                    {result.issues.length > 0 ? (
                      <>
                        <p className="mb-2 text-sm font-bold text-red-400">
                          {result.issues.length} action{result.issues.length === 1 ? "" : "s"} need your attention
                        </p>
                        <div className="space-y-2">
                          {result.issues.map((issue, i) => (
                            <div key={i} className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 text-sm">
                              <span
                                className={`h-2 w-2 shrink-0 rounded-full ${
                                  issue.severity === "HIGH" ? "bg-red-500" : "bg-yellow-500"
                                }`}
                              />
                              <span className="text-slate-200">{issue.title}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="text-secondary">
                        You&apos;re in great shape! No urgent actions right now.
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{monitoredAreas}</p>
                    <p className="text-xs text-secondary">Monitored Areas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-red-400">{result.issues.length}</p>
                    <p className="text-xs text-secondary">Action Needed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-emerald-400">{compliant}</p>
                    <p className="text-xs text-secondary">Compliant</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{onTimePercent}%</p>
                    <p className="text-xs text-secondary">On-time Compliance</p>
                  </div>
                </div>
              </div>

              {result.recommendations.length > 0 && (
                <div className="card-dark p-8">
                  <h2 className="text-center text-xl font-bold text-white">
                    Best Next Step
                  </h2>
                  <p className="mt-1 text-center text-sm text-secondary">
                    Based on your Tax Health Score
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {result.recommendations.map((rec, i) => (
                      <div
                        key={rec.code}
                        className={`relative rounded-xl border p-5 ${
                          i === 0 ? "border-emerald-400 ring-1 ring-emerald-400" : "border-white/10"
                        }`}
                      >
                        {i === 0 && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-bold text-white">
                            BEST NEXT STEP
                          </span>
                        )}
                        <p className="mt-1 font-bold text-white">{rec.displayName}</p>
                        <p className="mt-3 text-2xl font-bold text-white">
                          ₹{Number(rec.priceFrom).toLocaleString("en-IN")}
                        </p>
                        <p className="text-xs text-secondary">{rec.turnaroundDays} day turnaround</p>
                        <button
                          onClick={() => { track("health_check_recommendation_selected", { service_id: rec.serviceId }); router.push(`/intake?id=${rec.serviceId}`); }}
                          className="btn-primary mt-4 w-full"
                        >
                          Select Service
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {profileSummary && <div className="card-dark p-6"><p className="eyebrow">Your situation</p><h2 className="mt-2 text-xl font-bold text-white">A clearer picture of what may apply</h2><p className="mt-2 text-sm text-secondary">{profileSummary.situation} This free check is general guidance, not professional tax advice.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><div><p className="font-semibold text-white">What may apply</p><ul className="mt-2 space-y-2">{profileSummary.areas.map((area) => <li key={area} className="flex gap-2 text-sm text-secondary"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-400" />{area}</li>)}</ul></div><div><p className="font-semibold text-white">You may need</p><ul className="mt-2 space-y-2">{profileSummary.documents.map((document) => <li key={document} className="flex gap-2 text-sm text-secondary"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-400" />{document}</li>)}</ul>{profileSummary.tool && <a href="/tools" className="mt-4 inline-block text-sm font-semibold text-emerald-400">Open the {profileSummary.tool} <ArrowRight className="inline" size={14} /></a>}</div></div></div>}

              <div className="card-dark p-5">
                <div>
                  <p className="font-semibold text-white">Know someone who is unsure where to start?</p>
                  <p className="mt-1 text-sm text-secondary">Send them this free check. It helps them understand their own situation first.</p>
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row"><button onClick={shareCheck} className="btn-secondary"><Share2 size={16} /> Share</button><button onClick={whatsappShare} className="btn-secondary"><MessageCircle size={16} /> WhatsApp</button><button onClick={copyCheckLink} className="btn-secondary"><Copy size={16} /> Copy link</button></div>
              </div>

              {!captured && (
                <div className="card-dark p-6">
                  <p className="font-semibold text-white">Not ready yet?</p>
                  <p className="mb-3 text-sm text-secondary">
                    Get these results emailed to you so you don&apos;t lose them.
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="email"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="input-dark flex-1 px-4 py-2 text-sm"
                    />
                    <input
                      type="tel"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="Phone (optional)"
                      className="input-dark flex-1 px-4 py-2 text-sm"
                    />
                    <button
                      onClick={captureResults}
                      disabled={!leadEmail.trim() || capturing}
                      className="btn-secondary shrink-0 border-emerald-400/40 text-emerald-400 hover:bg-emerald-500/10 disabled:opacity-50"
                    >
                      {capturing ? "Sending..." : "Email my results"}
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
