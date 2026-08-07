"use client";

import { Suspense, FormEvent, useEffect, useState } from "react";
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

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      const currentUrl = `${window.location.pathname}${window.location.search}`;
      router.replace(`/login?next=${encodeURIComponent(currentUrl)}`);
    }
  }, [ready, user, router]);

  useEffect(() => {
    if (!user) return;
    setFullName((prev) => prev || user.fullName || "");
    setPhone((prev) => prev || user.phoneNumber || "");
    setEmail((prev) => prev || user.email || "");
  }, [user]);

  useEffect(() => {
    async function load() {
      try {
        const response = await OnboardingService.services();
        const loadedServices = response.items;
        setServices(loadedServices);

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
  }, [searchParams]);

  async function start() {
    if (!serviceId) { toast.error("Select a service"); return; }
    if (!fullName.trim()) { toast.error("Enter your name"); return; }
    if (!phone.trim()) { toast.error("Enter phone number"); return; }
    if (!email.trim()) { toast.error("Enter email"); return; }

    setSaving(true);
    const startedAt = Date.now();

    try {
      const result = await OnboardingService.start(Number(serviceId), fullName, phone, email);

      setCaseId(result.caseId);
      setQuestions(result.questions);
      setAnswers({});

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

      toast.success("Answers saved");
      router.push(`/intake/${caseId}/documents`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to save answers");
    } finally {
      setSaving(false);
    }
  }

  if (!ready || !user) {
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
              : "Tell us who you are and what you need. It's encrypted the moment you submit it."}
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
                    value={fullName}
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
                    value={phone}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                  />
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-secondary">
                    <ShieldCheck size={11} /> Encrypted immediately. Used to send your updates and report.
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
                        onChange={(e) => setAnswers({ ...answers, [question]: e.target.value })}
                      />
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-secondary">
                        <ShieldCheck size={11} /> Encrypted immediately. Seen only by your assigned CA.
                      </p>
                    </div>
                  );
                })}

                <button disabled={saving} className="btn-primary w-full py-2.5 text-sm">
                  {saving ? "Saving..." : "Continue to Document Upload"}
                </button>
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