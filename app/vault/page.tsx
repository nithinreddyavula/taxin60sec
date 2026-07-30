"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { VaultService, VaultDocument } from "@/services/vault-service";

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function statusColor(status: string) {
  if (status === "VERIFIED") return "text-green-400";
  if (status === "REJECTED") return "text-red-400";
  return "text-yellow-400";
}

export default function VaultPage() {
  const [documents, setDocuments] = useState<VaultDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  useEffect(() => {
    VaultService.list()
      .then(setDocuments)
      .catch(() => setDocuments([]))
      .finally(() => setLoading(false));
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

  const groupedByYear = documents.reduce<Record<string, VaultDocument[]>>((acc, doc) => {
    const year = new Date(doc.uploadedAt).getFullYear().toString();
    acc[year] = acc[year] ?? [];
    acc[year].push(doc);
    return acc;
  }, {});

  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <AppShell roles={["ROLE_CLIENT", "ROLE_CA", "ROLE_ADMIN"]}>
      <div className="p-6">
        <p className="eyebrow">Document Vault</p>
        <h1 className="mt-2 text-3xl font-bold">All your documents, one place</h1>
        <p className="mt-2 text-secondary">
          Every document you've ever submitted, organized by year. Need something for a
          visa or loan application? It's here.
        </p>

        {loading ? (
          <p className="mt-8 text-secondary">Loading...</p>
        ) : documents.length === 0 ? (
          <p className="mt-8 text-secondary">
            No documents yet — they'll show up here once you submit your first case.
          </p>
        ) : (
          <div className="mt-8 space-y-8">
            {years.map((year) => (
              <div key={year}>
                <h2 className="mb-3 text-xl font-bold">{year}</h2>
                <div className="space-y-2">
                  {groupedByYear[year].map((doc) => (
                    <div
                      key={doc.id}
                      className="card-dark flex items-center justify-between p-4"
                    >
                      <div>
                        <p className="font-semibold">{doc.originalFilename}</p>
                        <p className="text-sm text-secondary">
                          {doc.serviceName ?? "General"} · {doc.caseNumber ?? "—"}
                          {" · "}
                          <span className={statusColor(doc.verificationStatus)}>
                            {doc.verificationStatus}
                          </span>
                          {doc.fileSize ? ` · ${formatSize(doc.fileSize)}` : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDownload(doc)}
                        disabled={downloadingId === doc.id}
                        className="btn-secondary shrink-0 disabled:opacity-50"
                      >
                        {downloadingId === doc.id ? "Downloading..." : "Download"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}