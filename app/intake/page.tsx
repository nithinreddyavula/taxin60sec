"use client";

import { Suspense, FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  OnboardingService,
  ServiceOffering,
} from "@/services/intake-service";

import { useAppSession } from "@/components/AppProviders";

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

  // We already know who this is - pre-fill from the session instead of
  // making a just-registered/just-logged-in user retype their own details.
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
console.table(
  loadedServices.map((s) => ({
    id: s.id,
    name: s.displayName,
  }))
);

setServices(loadedServices);

    const id = searchParams.get("id");

    console.log("URL Service ID:", id);

    if (id) {
      const selected = loadedServices.find(
        (service) => String(service.id) === id
      );

      console.log("Selected Service:", selected);

      if (selected) {
        setServiceId(String(selected.id));
      } else {
        toast.error(`Service ${id} not found`);
      }
    }
  } catch (e) {
    console.error(e);

    toast.error(
      e instanceof Error
        ? e.message
        : "Unable to load services"
    );
  } finally {
    setLoading(false);
  }
}

    load();

  }, [searchParams]);

  async function start() {

    if (!serviceId) {

      toast.error("Select a service");

      return;

    }

    if (!fullName.trim()) {

      toast.error("Enter your name");

      return;

    }

    if (!phone.trim()) {

      toast.error("Enter phone number");

      return;

    }

    if (!email.trim()) {

      toast.error("Enter email");

      return;

    }

    setSaving(true);

    const startedAt = Date.now();

    try {

      const result = await OnboardingService.start(

        Number(serviceId),

        fullName,

        phone,

        email

      );

      setCaseId(result.caseId);

      setQuestions(result.questions);

      setAnswers({});

      const elapsedSeconds = Math.max(
        1,
        Math.round((Date.now() - startedAt) / 1000)
      );

      toast.success(`Confirmed in ${elapsedSeconds}s — check your email/WhatsApp`);

    }

    catch (e) {

      toast.error(

        e instanceof Error

          ? e.message

          : "Unable to create case"

      );

    }

    finally {

      setSaving(false);

    }

  }

  async function submit(event: FormEvent) {

    event.preventDefault();

    if (!caseId) return;

    setSaving(true);

    try {

      for (const question of questions) {

        await OnboardingService.saveAnswer(

          caseId,

          question,

          answers[question] ?? ""

        );

      }

      toast.success("Answers saved");

      router.push(

        `/intake/${caseId}/documents`

      );

    }

    catch (e) {

      toast.error(

        e instanceof Error

          ? e.message

          : "Unable to save answers"

      );

    }

    finally {

      setSaving(false);

    }

  }

  if (!ready || !user) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto mt-24 h-40 max-w-5xl animate-pulse rounded-2xl bg-white/5" />
      </main>
    );
  }

  return (
  <>
    <Navbar />

    <main className="min-h-screen">

      <section className="mx-auto max-w-4xl px-6 py-16">

        <p className="text-sm uppercase tracking-widest text-emerald-400">
          Tax60 Secure Intake
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Start your application
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Complete a few questions and upload the required
          documents. Your assigned CA will review everything
          securely.
        </p>

        <div className="card-dark mt-10 p-8">

          {loading ? (

            <div className="space-y-4">

              <div className="h-8 w-56 animate-pulse rounded bg-white/10" />

              <div className="h-12 animate-pulse rounded bg-white/10" />

              <div className="h-12 animate-pulse rounded bg-white/10" />

              <div className="h-12 animate-pulse rounded bg-white/10" />

            </div>

          ) : !caseId ? (

            <div className="space-y-6">

              {!searchParams.get("id") && (

                <div>

                  <label className="mb-2 block text-sm font-medium">

                    Select Service

                  </label>

                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="input-dark w-full p-3"
                  >

                    <option value="">
                      Choose Service
                    </option>

                    {services.map((service) => (

                      <option
                        key={service.id}
                        value={service.id}
                      >

                        {service.displayName}

                      </option>

                    ))}

                  </select>

                </div>

              )}

              <p className="text-sm text-secondary">
                Confirm your details below — pre-filled from your account.
              </p>

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Full Name

                </label>

                <input
                  className="input-dark w-full p-3"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  placeholder="Enter your full name"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Mobile Number

                </label>

                <input
                  className="input-dark w-full p-3"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="9876543210"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Email

                </label>

                <input
                  type="email"
                  className="input-dark w-full p-3"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="example@gmail.com"
                />

              </div>

              <button
                disabled={saving}
                onClick={start}
                className="btn-primary mt-4 w-full"
              >

                {saving
                  ? "Creating Case..."
                  : "Continue"}

              </button>

            </div>

          ) : (

            <form
              onSubmit={submit}
              className="space-y-6"
            >

              <div>

                <h2 className="text-2xl font-bold">

                  Answer these questions

                </h2>

                <p className="mt-2 text-secondary">

                  Your responses help our CA understand
                  your case before reviewing documents.

                </p>

              </div>

              {questions.map((question) => (

                <div key={question}>

                  <label className="mb-2 block font-medium">

                    {question}

                  </label>

                  <textarea
                    required
                    rows={4}
                    className="input-dark w-full p-3"
                    value={answers[question] ?? ""}
                    onChange={(e) =>
                      setAnswers({

                        ...answers,

                        [question]: e.target.value,

                      })
                    }
                  />

                </div>

              ))}

              <button
                disabled={saving}
                className="btn-primary w-full"
              >

                {saving

                  ? "Saving..."

                  : "Continue to Document Upload"}

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
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <IntakeContent />
    </Suspense>
  );
}