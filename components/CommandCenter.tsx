"use client";

import { useEffect, useState } from "react";
import { Building2, Plus, X } from "lucide-react";
import { BusinessService, BusinessProfileRequest, BusinessType, BusinessStatus } from "@/services/business-service";

const statusColor: Record<string, string> = {
  ACTIVE: "bg-emerald-400/15 text-emerald-200",
  INACTIVE: "bg-amber-400/15 text-amber-200",
  CLOSED: "bg-white/10 text-slate-400",
};

const typeLabels: Record<BusinessType, string> = {
  INDIVIDUAL: "Individual",
  PROPRIETORSHIP: "Proprietorship",
  PARTNERSHIP: "Partnership",
  LLP: "LLP",
  PRIVATE_LIMITED: "Private Limited",
  PUBLIC_LIMITED: "Public Limited",
  OPC: "One Person Company",
  TRUST: "Trust",
  NGO: "NGO",
};

const emptyForm: BusinessProfileRequest = {
  businessName: "",
  businessType: "PRIVATE_LIMITED",
  businessStatus: "ACTIVE",
  panNumber: "",
  gstin: "",
  address: "",
};

export default function CommandCenter() {
  const [data, setData] = useState<{ totalEntities: number; entities: any[] } | null>(null);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<BusinessProfileRequest>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  function load() {
    BusinessService.commandCenter()
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : "Unable to load your entities"));
  }

  useEffect(() => {
    load();
  }, []);

  function update<K extends keyof BusinessProfileRequest>(key: K, value: BusinessProfileRequest[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit() {
    if (!form.businessName) return;
    setSubmitting(true);
    setFormError("");
    try {
      await BusinessService.create(form);
      setForm(emptyForm);
      setShowForm(false);
      load();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Unable to add business");
    } finally {
      setSubmitting(false);
    }
  }

  if (error) {
    return (
      <section className="card-dark p-6">
        <p className="text-sm text-red-300">{error}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="card-dark p-6">
        <div className="h-32 animate-pulse rounded-xl bg-white/5" />
      </section>
    );
  }

  return (
    <section className="card-dark p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 size={18} className="text-blue-300" />
          <h2 className="font-bold">Command Center</h2>
        </div>
        <button onClick={() => setShowForm((s) => !s)} className="flex items-center gap-1 text-sm font-semibold text-blue-300">
          {showForm ? <X size={15} /> : <Plus size={15} />} {showForm ? "Cancel" : "Add entity"}
        </button>
      </div>

      <p className="mt-1 text-sm text-secondary">
        {data.totalEntities === 0
          ? "Add every business you run - company, LLP, proprietorship - and see all of them here in one place."
          : `${data.totalEntities} entit${data.totalEntities === 1 ? "y" : "ies"} under your account.`}
      </p>

      {showForm && (
        <div className="mt-5 space-y-3 rounded-xl border border-white/10 p-4">
          <input
            type="text"
            placeholder="Business name"
            value={form.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            className="input-dark w-full p-2.5"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={form.businessType}
              onChange={(e) => update("businessType", e.target.value as BusinessType)}
              className="input-dark p-2.5"
            >
              {Object.entries(typeLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <select
              value={form.businessStatus}
              onChange={(e) => update("businessStatus", e.target.value as BusinessStatus)}
              className="input-dark p-2.5"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="PAN (optional)"
              value={form.panNumber}
              onChange={(e) => update("panNumber", e.target.value.toUpperCase())}
              className="input-dark p-2.5"
            />
            <input
              type="text"
              placeholder="GSTIN (optional)"
              value={form.gstin}
              onChange={(e) => update("gstin", e.target.value.toUpperCase())}
              className="input-dark p-2.5"
            />
          </div>
          {formError && <p className="text-sm text-red-300">{formError}</p>}
          <button onClick={submit} disabled={submitting || !form.businessName} className="btn-primary !w-auto px-5">
            {submitting ? "Saving..." : "Save entity"}
          </button>
        </div>
      )}

      {data.entities.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {data.entities.map((e) => (
            <div key={e.id} className="rounded-xl border border-white/10 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{e.businessName}</p>
                  <p className="text-xs text-secondary">{typeLabels[e.businessType as BusinessType] ?? e.businessType}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[e.businessStatus] ?? statusColor.ACTIVE}`}>
                  {e.businessStatus.replace("_", " ")}
                </span>
              </div>
              <div className="mt-3 space-y-1 text-xs text-secondary">
                {e.panNumber && <p>PAN: {e.panNumber}</p>}
                {e.gstin && <p>GSTIN: {e.gstin}</p>}
                <p>CA: {e.assignedCaName ?? "Not yet assigned"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}