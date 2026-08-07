"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Circle, IndianRupee, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { CaseService } from "@/services/case-service";
import { DocumentService, RequiredDocument } from "@/services/document-service";
import PayNowButton from "@/components/PayNowButton";
import SlaBadge from "@/components/SlaBadge";
import CaseChat from "@/components/CaseChat";
import CaseSupportPanel from "@/components/CaseSupportPanel";
import DocumentUploader from "@/components/intake/DocumentUploader";
import AskTax60 from "@/components/AskTax60";
import { CASE_STAGES, caseStageIndex } from "@/lib/case-stage";

const pretty = (value?: string) => value?.replaceAll("_", " ") ?? "Pending";

const TABS = ["Overview", "Documents", "Timeline", "Communication", "Payments", "Support"] as const;
type Tab = (typeof TABS)[number];

export default function CaseDetailsPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const id = Number(params.id);
  const queryClient = useQueryClient();
  const requestedTab = TABS.find((t) => t === searchParams.get("tab"));
  const [tab, setTab] = useState<Tab>(requestedTab ?? "Overview");

  const caseQuery = useQuery({ queryKey: ["case", id], queryFn: () => CaseService.detail(id), enabled: Number.isFinite(id) });
  const docsQuery = useQuery<RequiredDocument[]>({ queryKey: ["case-documents", id], queryFn: () => DocumentService.requiredDocuments(id), enabled: Number.isFinite(id) });
  const missingQuery = useQuery({ queryKey: ["case-missing", id], queryFn: () => CaseService.missingDocuments(id), enabled: Number.isFinite(id) });
  const timelineQuery = useQuery({ queryKey: ["case-timeline", id], queryFn: () => CaseService.timeline(id), enabled: Number.isFinite(id) });
  const pricingQuery = useQuery({ queryKey: ["case-pricing", id], queryFn: () => CaseService.pricing(id), enabled: Number.isFinite(id), retry: false });

  const completeOnboarding = useMutation({
    mutationFn: () => import("@/services/client").then(({ request }) => request(`/api/v1/cases/${id}/onboarding/complete`, "POST")),
    onSuccess: () => { toast.success("AI case summary refreshed."); queryClient.invalidateQueries({ queryKey: ["case", id] }); },
    onError: (error: Error) => toast.error(error.message),
  });

  const currentStep = useMemo(() => caseStageIndex(caseQuery.data?.workflowStage), [caseQuery.data?.workflowStage]);

  if (caseQuery.isLoading) return <AppShell roles={["ROLE_CLIENT"]}><div className="h-96 animate-pulse rounded-2xl bg-slate-100" /></AppShell>;
  if (caseQuery.error || !caseQuery.data) return <AppShell roles={["ROLE_CLIENT"]}><p className="text-red-600">{caseQuery.error?.message ?? "Case not found"}</p><Link href="/dashboard" className="btn-primary mt-5 !w-auto px-5">Back to dashboard</Link></AppShell>;

  const taxCase = caseQuery.data;
  const price = pricingQuery.data?.amount ?? pricingQuery.data?.price;

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/dashboard" className="text-sm font-semibold text-emerald-700">← Back to Cases</Link>
          <p className="eyebrow mt-5">Case ID: {taxCase.caseNumber}</p>
          <h1 className="mt-2 text-3xl font-bold">{taxCase.title}</h1>
          <p className="mt-2 text-secondary">{taxCase.intakeSummary ?? "Your Tax60 team is reviewing the information you shared."}</p>
          <p className="mt-1 text-sm text-secondary">CA Assigned: {taxCase.assignedCaName ?? "Not yet assigned"}</p>
          <div className="mt-3"><SlaBadge responseSeconds={taxCase.responseSeconds} slaMet={taxCase.slaMet} /></div>
        </div>
        <span className="pill-blue rounded-full px-3 py-1.5 text-sm font-bold">{pretty(taxCase.status)}</span>
      </div>

      {/* Case progress — 5-stage tracker */}
      <section className="card-dark mt-7 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold">Case Progress</h2>
            <p className="mt-1 text-sm text-secondary">Current step: {CASE_STAGES[currentStep]}</p>
          </div>
          <button onClick={() => completeOnboarding.mutate()} disabled={completeOnboarding.isPending} className="text-sm font-semibold text-emerald-700">
            <RefreshCw className="mr-1 inline" size={15} /> Refresh AI summary
          </button>
        </div>
        <ol className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {CASE_STAGES.map((stage, index) => (
            <li key={stage} className={`rounded-xl border p-3 text-xs font-bold ${index <= currentStep ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-400"}`}>
              {index <= currentStep ? <CheckCircle2 className="mb-2" size={17} /> : <Circle className="mb-2" size={17} />}
              {stage}
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
              tab === t ? "border-emerald-500 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Overview" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="card-dark p-5">
              <h2 className="font-bold">Case Details</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-secondary">Case ID</dt><dd>{taxCase.caseNumber}</dd></div>
                <div className="flex justify-between"><dt className="text-secondary">Service</dt><dd>{taxCase.title}</dd></div>
                <div className="flex justify-between"><dt className="text-secondary">Status</dt><dd>{pretty(taxCase.status)}</dd></div>
                <div className="flex justify-between"><dt className="text-secondary">CA Assigned</dt><dd>{taxCase.assignedCaName ?? "—"}</dd></div>
              </dl>
            </section>
            <section className="card-dark p-5">
              <ShieldCheck className="text-emerald-600" size={21} />
              <h2 className="mt-3 font-bold">Documents Summary</h2>
              <p className="mt-2 text-sm text-secondary">
                {docsQuery.data?.filter((d) => d.uploaded).length ?? 0} / {docsQuery.data?.length ?? 0} documents uploaded
              </p>
              {(docsQuery.data?.length ?? 0) > 0 && (docsQuery.data?.filter((d) => d.uploaded).length ?? 0) === 0 && (
                <button onClick={() => setTab("Documents")} className="btn-primary mt-4 !w-auto px-4 text-sm">Add documents</button>
              )}
            </section>
          </div>
        )}

        {tab === "Documents" && (
          <div className="space-y-6">
            <section className="card-dark p-5">
              <h2 className="font-bold">Secure documents</h2>
              <p className="mt-1 text-sm text-secondary">Add the requested records. We&apos;ll validate each one before it moves forward.</p>
              <div className="mt-5">
                {docsQuery.isLoading ? <div className="h-12 animate-pulse rounded-lg bg-slate-100" /> : (
                  <DocumentUploader
                    caseId={id}
                    documents={docsQuery.data ?? []}
                    onUploaded={() => { toast.success("Document added for secure review."); queryClient.invalidateQueries({ queryKey: ["case-documents", id] }); }}
                    onError={(message) => toast.error(message)}
                  />
                )}
              </div>
            </section>
            <section className="card-dark p-5">
              <ShieldCheck className="text-emerald-600" size={21} />
              <h2 className="mt-3 font-bold">Missing documents</h2>
              <div className="mt-3 space-y-2">
                {missingQuery.data?.length ? missingQuery.data.map((document, index) => (
                  <p key={index} className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                    {document.name ?? document.documentName ?? "Required document"}
                  </p>
                )) : <p className="text-sm text-secondary">Your checklist is up to date.</p>}
              </div>
            </section>
          </div>
        )}

        {tab === "Timeline" && (
          <section className="card-dark p-5">
            <h2 className="font-bold">Case Timeline</h2>
            <div className="mt-5 space-y-4">
              {timelineQuery.data?.length ? timelineQuery.data.map((event, index) => (
                <div key={`${event.createdAt}-${index}`} className="border-l-2 border-emerald-300 pl-4">
                  <p className="text-sm font-semibold">{event.title}</p>
                  <p className="mt-1 text-sm text-secondary">{event.description}</p>
                  <p className="mt-1 text-xs text-slate-400">{new Date(event.createdAt).toLocaleString()}</p>
                </div>
              )) : <p className="text-sm text-secondary">Timeline updates will appear here as your case progresses.</p>}
            </div>
          </section>
        )}

        {tab === "Communication" && (
          <section className="card-dark p-5">
            {taxCase.assignedCaId ? (
              <CaseChat caseId={id} />
            ) : (
              <p className="text-sm text-secondary">Messages open once an expert is assigned to your case.</p>
            )}
          </section>
        )}

        {tab === "Payments" && (
          <section className="card-dark p-5">
            <IndianRupee className="text-emerald-600" size={21} />
            <h2 className="mt-3 font-bold">Pricing & payment</h2>
            <p className="mt-2 text-sm text-secondary">A final payment request is issued after document validation.</p>
            {price !== undefined && (
              <div className="mt-3">
                <p className="text-2xl font-bold">₹{Number(price).toLocaleString("en-IN")}</p>
                <p className="mt-1 text-xs text-secondary">Includes platform fee and GST.</p>
              </div>
            )}
            {taxCase.workflowStage === "PAYMENT_PENDING" ? (
              <div className="mt-4">
                <PayNowButton caseId={id} clientName={taxCase.clientName} clientEmail={taxCase.clientEmail} clientPhone={taxCase.clientPhone} />
                <div className="mt-4 space-y-1.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-secondary">
                  <p>An invoice is generated automatically as soon as payment succeeds.</p>
                  <p>Refund policy: full refund if your CA hasn&apos;t started review yet.</p>
                  <p>
                    Need help?{" "}
                    <button onClick={() => setTab("Support")} className="font-semibold text-emerald-700">Open Support</button>
                  </p>
                </div>
              </div>
            ) : (
              <button disabled className="btn-primary mt-4 w-full opacity-60">Payment unlocks after review</button>
            )}
          </section>
        )}

        {tab === "Support" && <CaseSupportPanel caseId={id} />}
      </div>

      <AskTax60 caseId={id} />
    </AppShell>
  );
}