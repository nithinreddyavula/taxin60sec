"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search, ShieldCheck, Upload } from "lucide-react";
import AppShell from "@/components/AppShell";
import { VaultService, VaultDocument } from "@/services/vault-service";
import { CaseService, CaseItem } from "@/services/case-service";

const CATEGORY_MAP: Record<string, string> = {
  PAN_CARD: "Identity Proof",
  AADHAAR: "Identity Proof",
  FORM_16: "Income Proof",
  SALARY_SLIP: "Income Proof",
  BANK_STATEMENT: "Bank Statements",
  INVESTMENT_PROOF: "Investments",
  PROPERTY_DOCUMENT: "Property Documents",
  GST_CERTIFICATE: "Business Documents",
  OTHER: "Others",
};

const CATEGORIES = ["Identity Proof", "Income Proof", "Bank Statements", "Investments", "Property Documents", "Business Documents", "Others"];

const STORAGE_QUOTA_BYTES = 5 * 1024 * 1024 * 1024; // 5 GB plan limit

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatGb(bytes: number) {
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function statusColor(status: string) {
  if (status === "VERIFIED") return "text-emerald-600";
  if (status === "REJECTED") return "text-red-600";
  return "text-amber-600";
}

export default function VaultPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<VaultDocument[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");

  useEffect(() => {
    VaultService.list().then(setDocuments).catch(() => setDocuments([])).finally(() => setLoading(false));
    CaseService.list().then((page) => setCases(page.items)).catch(() => setCases([]));
  }, []);

  async function handleDownload(doc: VaultDocument) {
    setDownloadingId(doc.id);
    try {
      await VaultService.download(doc.id, doc.originalFilename);
    } catch {
      toast.error("Unable to download this document");
    } finally {
      setDownloadingId(null);
    }
  }

  // Documents live on a case (they're tied to that case's required-document
  // checklist), so "Upload Document" needs to land the person on the right
  // case's Documents tab rather than doing nothing.
  function handleUploadClick() {
    const active = cases.filter((c) => c.status !== "COMPLETED" && c.status !== "CANCELLED");
    if (active.length === 1) {
      router.push(`/cases/${active[0].id}?tab=Documents`);
      return;
    }
    if (active.length > 1) {
      toast.message("Pick which case to add documents to");
      router.push("/my-services");
      return;
    }
    toast.message("Start a filing first, then you can add documents to it");
    router.push("/intake");
  }

  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    documents.forEach((doc) => {
      const category = CATEGORY_MAP[doc.documentType] ?? "Others";
      counts[category] = (counts[category] ?? 0) + 1;
    });
    return counts;
  }, [documents]);

  const filtered = documents
    .filter((d) => typeFilter === "All Types" || CATEGORY_MAP[d.documentType] === typeFilter)
    .filter((d) => d.originalFilename.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  const usedBytes = documents.reduce((sum, d) => sum + (d.fileSize ?? 0), 0);
  const usedPercent = Math.min(100, Math.round((usedBytes / STORAGE_QUOTA_BYTES) * 100));

  return (
    <AppShell roles={["ROLE_CLIENT", "ROLE_CA", "ROLE_ADMIN"]}>
      <h1 className="text-3xl font-bold">Documents Vault</h1>
      <p className="mt-2 text-secondary">All your documents are encrypted and stored securely.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search documents..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
            <option>All Types</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <button onClick={handleUploadClick} className="btn-primary !w-auto px-4"><Upload size={15} className="mr-1 inline" /> Upload Document</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setTypeFilter(category)}
            className={`card-dark p-4 text-left ${typeFilter === category ? "ring-2 ring-emerald-400" : ""}`}
          >
            <p className="text-sm font-semibold">{category}</p>
            <p className="mt-1 text-xs text-secondary">{countsByCategory[category] ?? 0} Documents</p>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="card-dark p-0 overflow-x-auto">
          <p className="p-4 font-bold">Recent Documents</p>
          {loading ? (
            <div className="h-32 animate-pulse" />
          ) : filtered.length === 0 ? (
            <div className="p-4">
              <p className="text-sm text-secondary">No documents yet.</p>
              <button onClick={handleUploadClick} className="btn-secondary !w-auto mt-3 px-4 text-xs">
                <Upload size={14} className="mr-1 inline" /> Upload your first document
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-semibold">{doc.originalFilename}</p>
                    <p className="text-xs text-secondary">
                      {doc.serviceName ?? "General"} · {new Date(doc.uploadedAt).toLocaleDateString()}
                      {doc.fileSize ? ` · ${formatSize(doc.fileSize)}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-semibold ${statusColor(doc.verificationStatus)}`}>{doc.verificationStatus}</span>
                    <button onClick={() => handleDownload(doc)} disabled={downloadingId === doc.id} className="btn-secondary !w-auto px-3 py-1.5 text-xs disabled:opacity-50">
                      {downloadingId === doc.id ? "..." : "Download"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="space-y-4">
          <section className="card-dark p-5">
            <p className="font-bold">Your Documents are Safe</p>
            <ul className="mt-3 space-y-2 text-xs text-secondary">
              <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-600" /> AES-256 encrypted</li>
              <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-600" /> Stored securely in India</li>
              <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-600" /> Access limited to assigned CA</li>
              <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-600" /> Never shared with third parties</li>
            </ul>
          </section>

          <section className="card-dark p-5">
            <p className="font-bold">Storage Used</p>
            <div className="mt-3 h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${usedPercent}%` }} />
            </div>
            <p className="mt-2 text-xs text-secondary">{formatGb(usedBytes)} / {formatGb(STORAGE_QUOTA_BYTES)} · {usedPercent}% Used</p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}