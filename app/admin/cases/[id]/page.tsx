"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { AdminService, AdminCaseDetail, AssignableCa } from "@/services/admin-service";

const STATUS_OPTIONS = ["DRAFT", "INTAKE", "DOCUMENT_COLLECTION", "CA_REVIEW", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

export default function AdminCaseDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [taxCase, setTaxCase] = useState<AdminCaseDetail | null>(null);
  const [cas, setCas] = useState<AssignableCa[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [assigning, setAssigning] = useState(false);

  function load() {
    AdminService.caseDetail(id).then(setTaxCase).catch(() => setTaxCase(null)).finally(() => setLoading(false));
    AdminService.assignableCas().then(setCas).catch(() => setCas([]));
  }

  useEffect(() => { load(); }, [id]);

  async function handleStatusChange(status: string) {
    if (!taxCase || status === taxCase.status) return;
    setUpdatingStatus(true);
    try {
      await AdminService.updateCaseStatus(id, status);
      setTaxCase((prev) => (prev ? { ...prev, status } : prev));
      toast.success("Case status updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to update status");
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleAssign(value: string) {
    setAssigning(true);
    const caId = value === "" ? null : Number(value);
    try {
      await AdminService.assignCase(id, caId);
      const ca = cas.find((c) => c.id === caId);
      setTaxCase((prev) => (prev ? { ...prev, assignedCaId: caId, assignedCaName: ca?.fullName ?? null } : prev));
      toast.success(caId ? "CA assigned" : "CA unassigned");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to assign CA");
    } finally {
      setAssigning(false);
    }
  }

  return (
    <AppShell roles={["ROLE_ADMIN"]}>
      <Link href="/admin/cases" className="text-sm font-semibold text-blue-400">← Back to Cases</Link>

      {loading && <div className="card-dark mt-6 h-40 animate-pulse" />}

      {!loading && taxCase && (
        <>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold">TX{taxCase.caseId} · {taxCase.serviceName}</h1>
              <p className="mt-1 text-secondary">{taxCase.clientName}</p>
            </div>
            <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-400">{taxCase.status}</span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="card-dark p-5">
              <p className="font-bold">Client Contact</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-secondary">Name</dt><dd>{taxCase.clientName}</dd></div>
                <div className="flex justify-between"><dt className="text-secondary">Email</dt><dd>{taxCase.email ?? "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-secondary">Phone</dt><dd>{taxCase.phone ?? "—"}</dd></div>
              </dl>
            </section>

            <section className="card-dark p-5">
              <p className="font-bold">Workflow</p>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wide text-secondary">Status</label>
                  <select
                    value={taxCase.status}
                    disabled={updatingStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-50"
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wide text-secondary">Assigned CA</label>
                  <select
                    value={taxCase.assignedCaId ?? ""}
                    disabled={assigning}
                    onChange={(e) => handleAssign(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-50"
                  >
                    <option value="">Unassigned</option>
                    {cas.map((ca) => (
                      <option key={ca.id} value={ca.id}>{ca.fullName} ({ca.activeCaseload})</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between"><dt className="text-secondary">Intake Completed</dt><dd>{taxCase.intakeCompleted ? "Yes" : "No"}</dd></div>
              </div>
            </section>

            <section className="card-dark p-5 lg:col-span-2">
              <p className="font-bold">Intake Summary</p>
              <p className="mt-3 whitespace-pre-wrap text-sm text-secondary">{taxCase.intakeSummary ?? "No summary recorded yet."}</p>
            </section>

            <section className="card-dark p-5 lg:col-span-2">
              <p className="font-bold">Intake Answers</p>
              {Object.keys(taxCase.answers).length === 0 ? (
                <p className="mt-4 text-sm text-secondary">No answers recorded yet.</p>
              ) : (
                <dl className="mt-4 space-y-3 text-sm">
                  {Object.entries(taxCase.answers).map(([question, answer]) => (
                    <div key={question} className="border-b border-white/5 pb-3">
                      <dt className="text-secondary">{question}</dt>
                      <dd className="mt-1 font-medium">{answer}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          </div>
        </>
      )}

      {!loading && !taxCase && <p className="mt-6 text-sm text-secondary">Case not found.</p>}
    </AppShell>
  );
}