"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { IntakeCase, OnboardingService, ServiceOffering } from "@/services/intake-service";

export default function IntakePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serviceId, setServiceId] = useState("");
   const [services, setServices] = useState<ServiceOffering[]>([]); 
   const [intake, setIntake] = useState<IntakeCase | null>(null);
    const [answers, setAnswers] = useState<Record<string, string>>({}); 
    const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false);
useEffect(() => {
  OnboardingService.services()
    .then((page) => {
      const loadedServices = page.content;
      setServices(loadedServices);

      const serviceIdParam = searchParams.get("id");

if (serviceIdParam) {
  const selected = loadedServices.find(
    (service) => String(service.id) === serviceIdParam
  );

  if (selected) {
    setServiceId(String(selected.id));
  }
}
    })
    .catch((error: Error) => toast.error(error.message))
    .finally(() => setLoading(false));
}, [searchParams]);  async function start() 
{ setSaving(true);
   try { const result = await OnboardingService.start(Number(serviceId)); setIntake(result); setAnswers(result.answers); toast.success("Your case is ready for a few questions."); } catch (error) { toast.error(error instanceof Error ? error.message : "Unable to start your case"); } finally { setSaving(false); } }
  async function submit(event: FormEvent) 
  { event.preventDefault(); if (!intake) return; setSaving(true); try { const result = await OnboardingService.saveAnswers(intake.taxCase.id, answers); setIntake(result); toast.success("Details saved. Your document checklist is ready."); router.push(`/cases/${result.taxCase.id}`); } catch (error) { toast.error(error instanceof Error ? error.message : "Unable to save your answers"); } finally { setSaving(false); } }
  return <AppShell roles={["ROLE_CLIENT"]}><p className="eyebrow">New service</p>
  <h1 className="mt-2 text-3xl font-bold">Tell us what you need.</h1><p className="mt-2 max-w-2xl text-secondary">We’ll create a secure case and tailor the questions and document checklist to your service.</p>
  <section className="card-dark mt-8 max-w-3xl p-5 sm:p-7">{loading ? <div className="h-32 animate-pulse rounded-xl bg-white/5" /> : !intake ? <div className="space-y-5">

  {!searchParams.get("id") ? (
    <label className="block text-sm font-semibold">
      Select a service

      <select
        className="input-dark mt-2 p-3"
        value={serviceId}
        onChange={(event) => setServiceId(event.target.value)}
      >
        <option value="">Choose a service</option>

        {services.map((service) => (
          <option
            key={service.id}
            value={service.id}
          >
            {service.displayName}
          </option>
        ))}
      </select>
    </label>
  ) : (
    <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
      <p className="text-sm text-secondary">
        Selected Service
      </p>

      <h3 className="mt-1 text-lg font-semibold">
        {services.find(
          (service) => String(service.id) === serviceId
        )?.displayName}
      </h3>
    </div>
  )}

  <button
    disabled={!serviceId || saving}
    className="btn-primary"
    onClick={start}
  >
    {saving ? "Starting..." : "Continue"}
  </button>

</div>
 : (

<form
  className="space-y-5"
  onSubmit={submit}
>

  <div>
    <p className="font-semibold">
      A few details for your case
    </p>

    <p className="mt-1 text-sm text-secondary">
      Your answers are saved securely and reviewed by the Tax60 team.
    </p>
  </div>

  {intake.questions.map((question) => (

    <label
      key={question}
      className="block text-sm font-semibold"
    >
      {question}

      <textarea
        required
        className="input-dark mt-2 min-h-24 p-3"
        value={answers[question] ?? ""}
        onChange={(event) =>
          setAnswers({
            ...answers,
            [question]: event.target.value,
          })
        }
      />

    </label>

  ))}

  <button
    disabled={saving}
    className="btn-primary"
  >
    {saving ? "Saving..." : "Save & view documents"}
  </button>

  {intake.missingDocuments.length > 0 && (

    <div className="rounded-xl border border-amber-300/20 bg-amber-300/5 p-4">

      <p className="font-semibold text-amber-100">
        Document checklist
      </p>

      <ul className="mt-2 list-inside list-disc text-sm text-secondary">

        {intake.missingDocuments.map((document) => (

          <li key={document.name}>
            {document.name}
          </li>

        ))}

      </ul>

    </div>

  )}

</form>

)}
</section>
</AppShell>;
}