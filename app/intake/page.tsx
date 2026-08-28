"use client";

import { Suspense, FormEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  OnboardingService,
  ServiceOffering,
} from "@/services/intake-service";

import { useAppSession } from "@/components/AppProviders";
import { track } from "@/lib/analytics";

function SavedTag() {
  return (
    <AnimatePresence>
      <motion.span
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400"
      >
        <Check size={12} /> Saved
      </motion.span>
    </AnimatePresence>
  );
}

function IntakeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, ready } = useAppSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [services, setServices] = useState<ServiceOffering[]>([]);
  const [serviceId, setServiceId] = useState("");
  const [caseId, setCaseId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [resumeSessionChecked, setResumeSessionChecked] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error" | "idle">("idle");
  const saveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    if (!ready) return;
    if (!resumeSessionChecked) return;
    if (!user && !caseId) {
      const currentUrl = `${window.location.pathname}${window.location.search}`;
      router.replace(`/login?next=${encodeURIComponent(currentUrl)}`);
    }
  }, [ready, user, router, resumeSessionChecked, caseId]);

  useEffect(() => {
    const resumeToken = searchParams.get("resume");
    if (resumeToken && !caseId) {
      window.location.replace(OnboardingService.resumeUrl(resumeToken));
      return;
    }

    async function load() {
      try {
        const response = await OnboardingService.services();
        const loadedServices = response.items;
        setServices(loadedServices);

        // If no token in URL, try to resume session from cookie
        if (!resumeToken && !caseId) {
          try {
            const saved = await OnboardingService.resumeCurrentSession();
            setCaseId(saved.caseId);
            
            // The backend's ResumeIntakeResponse omits the questions list, so we extract it from the matched service
            const match = loadedServices.find(s => s.displayName === saved.serviceName);
            const parsedQuestions = match?.intakeQuestions?.map(q => q.trim()).filter(q => q.length > 0) ?? [];
            
            setQuestions(parsedQuestions);
            setAnswers(saved.answers);
            setSaveStatus("saved");
            track("intake_resumed");
          } catch {
            // No active session
          } finally {
            setResumeSessionChecked(true);
          }
        }

        const id = searchParams.get("id");
        if (id) {
          const selected = loadedServices.find(
            (service) => String(service.id) === id
          );

          if (selected) {
            setServiceId(String(selected.id));
          } else {
            toast.error(`Service ${id} not found`);
          }
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Unable to load services");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [searchParams, caseId]);

  useEffect(() => () => Object.values(saveTimers.current).forEach(clearTimeout), []);

  useEffect(() => {
    if (!serviceId || caseId || typeof window === "undefined") return;
    const raw = localStorage.getItem(`tax60-intake-draft:${serviceId}`);
    if (!raw) return;
    try {
      const draft = JSON.parse(raw) as { caseId: number; resumeToken: string };
      if (!draft.resumeToken) throw new Error("Invalid token");
      window.location.replace(OnboardingService.resumeUrl(draft.resumeToken));
    } catch { localStorage.removeItem(`tax60-intake-draft:${serviceId}`); }
  }, [serviceId, caseId]);

  async function start() {
    if (!serviceId) { toast.error("Select a service"); return; }
    const submittedName = fullName.trim() || user?.fullName || "";
    const submittedPhone = phone.trim() || user?.phoneNumber || "";
    const submittedEmail = email.trim() || user?.email || "";
    if (!submittedName) { toast.error("Enter your name"); return; }
    if (!submittedPhone) { toast.error("Enter phone number"); return; }
    if (!submittedEmail) { toast.error("Enter email"); return; }

    setSaving(true);
    const startedAt = Date.now();

    try {
      const result = await OnboardingService.start(Number(serviceId), submittedName, submittedPhone, submittedEmail);

      setCaseId(result.caseId);
      setQuestions(result.questions);
      setAnswers({});
      localStorage.setItem(`tax60-intake-draft:${serviceId}`, JSON.stringify({ caseId: result.caseId, resumeToken: result.intakeToken }));
      sessionStorage.setItem("tax60-intake-resume-token", result.intakeToken);
      track("intake_started", { has_referral: Boolean(localStorage.getItem("tax60-referral-code")) });

      const elapsedSeconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
      toast.success(`Confirmed in ${elapsedSeconds}s — check your email/WhatsApp`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to create case");
    } finally {
      setSaving(false);
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!caseId) return;

    setSaving(true);

    try {
      for (const question of questions) {
        await OnboardingService.saveAnswer(caseId, question, answers[question] ?? "");
      }

      localStorage.removeItem(`tax60-intake-draft:${serviceId}`);
      track("intake_completed");

      toast.success("Answers saved");
      router.push(`/intake/${caseId}/documents`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to save answers");
    } finally {
      setSaving(false);
    }
  }

  function queueAnswer(question: string, answer: string, retryAttempt = 0) {
    setAnswers((current) => ({ ...current, [question]: answer }));
    if (!caseId) return;
    setSaveStatus("saving");
    clearTimeout(saveTimers.current[question]);
    saveTimers.current[question] = setTimeout(async () => {
      try {
        await OnboardingService.saveAnswer(caseId, question, answer);
        setSaveStatus("saved");
        track("intake_answer_saved");
      } catch {
        setSaveStatus("error");
        // Keep the answer locally and retry once; final submit remains the durable fallback.
        if (retryAttempt === 0) {
          saveTimers.current[question] = setTimeout(() => queueAnswer(question, answer, 1), 3_000);
        }
      }
    }, 650);
  }

  if (!ready || (!user && !caseId)) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto mt-24 h-40 max-w-xl animate-pulse rounded-2xl bg-white/5" />
      </main>
    );
  }

  const answeredCount = questions.filter((q) => (answers[q] ?? "").trim().length > 0).length;
  const selectedService = services.find((s) => String(s.id) === serviceId);

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <section className="mx-auto max-w-xl px-6 py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Tax60 Secure Intake
          </p>

          <h1 className="mt-2 text-2xl font-bold">
            {caseId ? "A few quick questions" : "Let's get started"}
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            {caseId
              ? "Just a couple of details — your CA will use these to prepare your case."
              : "Tell us who you are and what you need. We use these details to set up your case."}
          </p>

          <div className="card-dark mt-6 p-5">
            {loading ? (
              <div className="space-y-3">
                <div className="h-7 w-44 animate-pulse rounded bg-white/10" />
                <div className="h-10 animate-pulse rounded bg-white/10" />
                <div className="h-10 animate-pulse rounded bg-white/10" />
                <div className="h-10 animate-pulse rounded bg-white/10" />
              </div>
            ) : !caseId ? (
              <div className="space-y-4">
                {!searchParams.get("id") && (
                  <div>
                    <label className="mb-1.5 block text-xs font-medium">Which service do you need?</label>
                    <select
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="input-dark w-full p-2.5 text-sm"
                    >
                      <option value="">Choose Service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>{service.displayName}</option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedService && (
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3">
                    <p className="text-xs font-semibold text-emerald-300">
                      {selectedService.minimumPrice === selectedService.maximumPrice
                        ? `₹${selectedService.basePrice.toLocaleString("en-IN")} for this filing`
                        : `₹${selectedService.minimumPrice.toLocaleString("en-IN")} – ₹${selectedService.maximumPrice.toLocaleString("en-IN")} depending on complexity`}
                    </p>
                    <p className="mt-1 text-[11px] text-secondary">
                      Final price is confirmed after document review — you&apos;ll never pay more than the top of this range. Est. {selectedService.estimatedCompletionDays} day{selectedService.estimatedCompletionDays === 1 ? "" : "s"} to complete.
                    </p>
                    {(selectedService.includedFeatures?.length ?? 0) > 0 && (
                      <p className="mt-1.5 text-[11px] text-secondary">Includes: {selectedService.includedFeatures!.join(", ")}</p>
                    )}
                  </div>
                )}

                <p className="text-xs text-secondary">Confirm your details below — pre-filled from your account.</p>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-xs font-medium">Full Name</label>
                    {fullName.trim() && <SavedTag />}
                  </div>
                  <input
                    className="input-dark w-full p-2.5 text-sm"
                    value={fullName || user?.fullName || ""}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                  <p className="mt-1 text-[11px] text-secondary">Exactly as it appears on your PAN card.</p>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-xs font-medium">Mobile number</label>
                    {phone.trim() && <SavedTag />}
                  </div>
                  <input
                    className="input-dark w-full p-2.5 text-sm"
                    value={phone || user?.phoneNumber || ""}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                  />
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-secondary">
                    <ShieldCheck size={11} /> We&apos;ll only use this to reach you about your case.
                  </p>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-xs font-medium">Email</label>
                    {email.trim() && <SavedTag />}
                  </div>
                  <input
                    type="email"
                    className="input-dark w-full p-2.5 text-sm"
                    value={email || user?.email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                  />
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-secondary">
                    <ShieldCheck size={11} /> Used to send updates about your case.
                  </p>
                </div>

                <button disabled={saving} onClick={start} className="btn-primary mt-2 w-full py-2.5 text-sm">
                  {saving ? "Creating Case..." : "Continue"}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">Answer these questions</h2>
                    <p className="mt-1 text-xs text-secondary">
                      Your responses help our CA understand your case before reviewing documents.
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-emerald-400">
                    {answeredCount}/{questions.length} answered
                  </span>
                </div>

                {questions.map((question, i) => {
                  const isAnswered = (answers[question] ?? "").trim().length > 0;
                  return (
                    <div key={question}>
                      <div className="mb-1.5 flex items-center justify-between gap-3">
                        <label className="block text-sm font-medium">
                          <span className="mr-1 text-secondary">{i + 1}.</span>
                          {question}
                        </label>
                        {isAnswered && <SavedTag />}
                      </div>
                      <textarea
                        required
                        rows={2}
                        className="input-dark w-full p-2.5 text-sm"
                        value={answers[question] ?? ""}
                        onChange={(e) => queueAnswer(question, e.target.value)}
                      />
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-secondary">
                        <ShieldCheck size={11} /> Used by the team handling your case.
                      </p>
                    </div>
                  );
                })}

                <button disabled={saving} className="btn-primary w-full py-2.5 text-sm">
                  {saving ? "Saving..." : "Continue to Document Upload"}
                </button>
                <p className={`text-center text-xs ${saveStatus === "error" ? "text-amber-400" : "text-secondary"}`}>
                  {saveStatus === "saving" ? "Saving your progress…" : saveStatus === "saved" ? "Progress saved" : saveStatus === "error" ? "Connection interrupted — we'll retry when you continue." : "Answers save automatically."}
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function IntakePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <IntakeContent />
    </Suspense>
  );
}
