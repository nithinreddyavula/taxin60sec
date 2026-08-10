"use client";

import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle2, Circle, Clock, Plus, ShieldCheck } from "lucide-react";
import { useAppSession } from "@/components/AppProviders";
import { ChecklistService, ChecklistItem } from "@/services/checklist-service";

function statusMeta(status: ChecklistItem["status"]) {
  switch (status) {
    case "VERIFIED":
      return { icon: <CheckCircle2 size={16} className="text-emerald-600" />, pill: "bg-emerald-50 text-emerald-700", label: "Verified" };
    case "UPLOADED":
      return { icon: <Clock size={16} className="text-blue-600" />, pill: "bg-blue-50 text-blue-700", label: "Awaiting review" };
    case "REJECTED":
      return { icon: <AlertTriangle size={16} className="text-red-600" />, pill: "bg-red-50 text-red-700", label: "Needs re-upload" };
    default:
      return { icon: <Circle size={16} className="text-slate-400" />, pill: "bg-slate-100 text-slate-500", label: "Not uploaded" };
  }
}

export default function ChecklistPanel({ caseId }: { caseId: number }) {
  const { user } = useAppSession();
  const queryClient = useQueryClient();
  const canManage = user?.roles.some((r) => r === "ROLE_CA" || r === "ROLE_ADMIN") ?? false;

  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [description, setDescription] = useState("");
  const [mandatory, setMandatory] = useState(true);

  const checklistQuery = useQuery({
    queryKey: ["case-checklist", caseId],
    queryFn: () => ChecklistService.list(caseId),
  });

  const addItem = useMutation({
    mutationFn: () =>
      ChecklistService.addItem(caseId, {
        name: name.trim(),
        documentType: documentType.trim(),
        description: description.trim() || undefined,
        mandatory,
      }),
    onSuccess: () => {
      toast.success("Checklist item added");
      queryClient.invalidateQueries({ queryKey: ["case-checklist", caseId] });
      setName("");
      setDocumentType("");
      setDescription("");
      setMandatory(true);
      setShowAddForm(false);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function submitAddItem(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !documentType.trim()) {
      toast.error("Name and document type are required");
      return;
    }
    addItem.mutate();
  }

  const items = checklistQuery.data ?? [];
  const doneCount = items.filter((i) => i.status === "VERIFIED").length;

  return (
    <section className="card-dark p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold">Document Checklist</h2>
          <p className="mt-1 text-sm text-secondary">
            {items.length > 0 ? `${doneCount} of ${items.length} verified` : "What your CA needs from you for this case"}
          </p>
        </div>
        {canManage && (
          <button onClick={() => setShowAddForm((v) => !v)} className="btn-secondary !w-auto px-3 py-1.5 text-xs">
            <Plus size={14} className="mr-1 inline" /> Add item
          </button>
        )}
      </div>

      {showAddForm && (
        <form onSubmit={submitAddItem} className="mt-4 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium">Item name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Form 26AS" className="w-full rounded-lg border border-slate-200 p-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">Document type</label>
              <input value={documentType} onChange={(e) => setDocumentType(e.target.value)} placeholder="e.g. FORM_26AS" className="w-full rounded-lg border border-slate-200 p-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Note for the client (optional)</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Why this is needed" className="w-full rounded-lg border border-slate-200 p-2 text-sm" />
          </div>
          <label className="flex items-center gap-2 text-xs font-medium">
            <input type="checkbox" checked={mandatory} onChange={(e) => setMandatory(e.target.checked)} />
            Mandatory
          </label>
          <div className="flex gap-2">
            <button type="submit" disabled={addItem.isPending} className="btn-primary !w-auto px-4 py-1.5 text-xs disabled:opacity-50">
              {addItem.isPending ? "Adding…" : "Add to checklist"}
            </button>
            <button type="button" onClick={() => setShowAddForm(false)} className="rounded-lg border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-4 space-y-2">
        {checklistQuery.isLoading && <div className="h-12 animate-pulse rounded-lg bg-slate-100" />}

        {!checklistQuery.isLoading && items.length === 0 && (
          <p className="text-sm text-secondary">No checklist items yet.</p>
        )}

        {items
          .slice()
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((item) => {
            const meta = statusMeta(item.status);
            return (
              <div key={item.requiredDocumentId} className="rounded-xl border border-slate-100 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    {meta.icon}
                    <div>
                      <p className="text-sm font-semibold">
                        {item.name}
                        {item.mandatory && <span className="ml-1.5 text-xs font-normal text-red-500">*required</span>}
                      </p>
                      {item.description && <p className="mt-0.5 text-xs text-secondary">{item.description}</p>}
                      {item.status === "REJECTED" && item.rejectionReason && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                          <AlertTriangle size={12} /> {item.rejectionReason}
                        </p>
                      )}
                      {item.uploadedAt && (
                        <p className="mt-1 text-[11px] text-secondary">
                          Uploaded {new Date(item.uploadedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.pill}`}>{meta.label}</span>
                </div>
              </div>
            );
          })}
      </div>

      {items.length > 0 && (
        <p className="mt-4 flex items-center gap-1.5 text-[11px] text-secondary">
          <ShieldCheck size={12} /> Every upload here is encrypted and only visible to your assigned CA.
        </p>
      )}
    </section>
  );
}