"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Circle, IndianRupee, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { CaseService } from "@/services/case-service";
import { DocumentService, RequiredDocument } from "@/services/document-service";
import PayNowButton from "@/components/PayNowButton";
import SlaBadge from "@/components/SlaBadge";
import DocumentUploader from "@/components/intake/DocumentUploader";

const stages = ["INTAKE", "DOCUMENTS_PENDING", "OCR_REVIEW", "VALIDATION", "PAYMENT_PENDING", "IN_PROGRESS", "COMPLETED"];
const pretty = (value?: string) => value?.replaceAll("_", " ") ?? "Pending";

export default function CaseDetailsPage() {
  const params = useParams<{ id: string }>(); const id = Number(params.id); const queryClient = useQueryClient();
  const caseQuery = useQuery({ queryKey: ["case", id], queryFn: () => CaseService.detail(id), enabled: Number.isFinite(id) });
 const docsQuery = useQuery<RequiredDocument[]>({
  queryKey: ["case-documents", id],
  queryFn: () => DocumentService.requiredDocuments(id),
  enabled: Number.isFinite(id),
});
 const missingQuery = useQuery({ queryKey: ["case-missing", id], queryFn: () => CaseService.missingDocuments(id), enabled: Number.isFinite(id) });
  const timelineQuery = useQuery({ queryKey: ["case-timeline", id], queryFn: () => CaseService.timeline(id), enabled: Number.isFinite(id) });
  const pricingQuery = useQuery({ queryKey: ["case-pricing", id], queryFn: () => CaseService.pricing(id), enabled: Number.isFinite(id), retry: false });
  const completeOnboarding = useMutation({ mutationFn: () => import("@/services/client").then(({ request }) => request(`/api/v1/cases/${id}/onboarding/complete`, "POST")), onSuccess: () => { toast.success("AI case summary refreshed."); queryClient.invalidateQueries({ queryKey: ["case", id] }); }, onError: (error: Error) => toast.error(error.message) });
  const currentStage = useMemo(() => stages.indexOf(caseQuery.data?.workflowStage ?? "INTAKE"), [caseQuery.data?.workflowStage]);
  if (caseQuery.isLoading) return <AppShell roles={["ROLE_CLIENT"]}><div className="h-96 animate-pulse rounded-2xl bg-white/5" /></AppShell>;
  if (caseQuery.error || !caseQuery.data) return <AppShell roles={["ROLE_CLIENT"]}><p className="text-red-300">{caseQuery.error?.message ?? "Case not found"}</p><Link href="/dashboard" className="btn-primary mt-5">Back to dashboard</Link></AppShell>;
  const taxCase = caseQuery.data; const price = pricingQuery.data?.amount ?? pricingQuery.data?.price;
  return <AppShell roles={["ROLE_CLIENT"]}><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><Link href="/dashboard" className="text-sm font-semibold text-blue-300">← All cases</Link><p className="eyebrow mt-5">{taxCase.caseNumber}</p><h1 className="mt-2 text-3xl font-bold">{taxCase.title}</h1><p className="mt-2 text-secondary">{taxCase.intakeSummary ?? "Your Tax60 team is reviewing the information you shared."}</p><div className="mt-3"><SlaBadge responseSeconds={taxCase.responseSeconds} slaMet={taxCase.slaMet} /></div></div><span className="rounded-full bg-blue-500/15 px-3 py-1.5 text-sm font-bold text-blue-200">{pretty(taxCase.status)}</span></div>
    <section className="card-dark mt-7 p-5"><div className="flex items-center justify-between"><div><h2 className="font-bold">Case progress</h2><p className="mt-1 text-sm text-secondary">Current step: {pretty(taxCase.workflowStage)}</p></div><button onClick={() => completeOnboarding.mutate()} disabled={completeOnboarding.isPending} className="text-sm font-semibold text-blue-300"><RefreshCw className="mr-1 inline" size={15} /> Refresh AI summary</button></div><ol className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-7">{stages.map((stage, index) => <li key={stage} className={`rounded-xl border p-3 text-xs font-bold ${index <= currentStage ? "border-blue-400/30 bg-blue-500/10 text-blue-200" : "border-white/10 text-slate-500"}`}>{index <= currentStage ? <CheckCircle2 className="mb-2" size={17} /> : <Circle className="mb-2" size={17} />}{pretty(stage)}</li>)}</ol></section>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_.9fr]"><div className="space-y-6"><section className="card-dark p-5"><div><h2 className="font-bold">Secure documents</h2><p className="mt-1 text-sm text-secondary">Add the requested records. We’ll validate each one before it moves forward.</p></div><div className="mt-5">{docsQuery.isLoading ? <div className="h-12 animate-pulse rounded-lg bg-white/5" /> : <DocumentUploader caseId={id} documents={docsQuery.data ?? []} onUploaded={() => { toast.success("Document added for secure review."); queryClient.invalidateQueries({ queryKey: ["case-documents", id] }); }} onError={(message) => toast.error(message)} />}</div></section>
        <section className="card-dark p-5"><h2 className="font-bold">Case timeline</h2><div className="mt-5 space-y-4">{timelineQuery.data?.length ? timelineQuery.data.map((event, index) => <div key={`${event.createdAt}-${index}`} className="border-l border-blue-400/40 pl-4"><p className="text-sm font-semibold">{event.title}</p><p className="mt-1 text-sm text-secondary">{event.description}</p><p className="mt-1 text-xs text-slate-500">{new Date(event.createdAt).toLocaleString()}</p></div>) : <p className="text-sm text-secondary">Timeline updates will appear here as your case progresses.</p>}</div></section></div>
      <aside className="space-y-6"><section className="card-dark p-5"><ShieldCheck className="text-emerald-400" size={21} /><h2 className="mt-3 font-bold">Missing documents</h2><div className="mt-3 space-y-2">{missingQuery.data?.length ? missingQuery.data.map((document, index) => <p key={index} className="rounded-lg bg-amber-300/5 px-3 py-2 text-sm text-amber-100">{document.name ?? document.documentName ?? "Required document"}</p>) : <p className="text-sm text-secondary">Your checklist is up to date.</p>}</div></section><section className="card-dark p-5"><IndianRupee className="text-blue-300" size={21} /><h2 className="mt-3 font-bold">Pricing & payment</h2><p className="mt-2 text-sm text-secondary">A final payment request is issued after document validation.</p>{price !== undefined && <p className="mt-3 text-2xl font-bold">₹{Number(price).toLocaleString("en-IN")}</p>}{taxCase.workflowStage === "PAYMENT_PENDING" ? <div className="mt-4"><PayNowButton caseId={id} clientName={taxCase.clientName} clientEmail={taxCase.clientEmail} clientPhone={taxCase.clientPhone} /></div> : <button disabled className="btn-primary mt-4 w-full opacity-60">Payment unlocks after review</button>}</section></aside></div>
  </AppShell>;
}