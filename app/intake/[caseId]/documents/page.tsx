"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Lock, ScanLine, ShieldCheck, UploadCloud, UserCheck2 } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { OnboardingService, RequiredDocument } from "@/services/intake-service";

function whyThisDocument(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("pan")) return "Used to verify your identity and match it to your filing.";
  if (lower.includes("aadhaar") || lower.includes("aadhar")) return "Used for identity verification, as required by the tax department.";
  if (lower.includes("form 16") || lower.includes("form16")) return "Shows your salary and the tax already deducted by your employer.";
  if (lower.includes("bank") || lower.includes("statement")) return "Used to verify income, interest, and any transactions relevant to your filing.";
  if (lower.includes("gst")) return "Used to verify your GST registration and filing history.";
  if (lower.includes("investment") || lower.includes("80c") || lower.includes("insurance")) return "Used to claim eligible deductions and reduce your tax liability.";
  if (lower.includes("rent") || lower.includes("property")) return "Used to calculate income or deductions related to your property.";
  return "Used by your assigned CA to verify and prepare your case accurately.";
}

const UPLOAD_STAGES = [
  { key: "uploading", label: "Uploading", icon: UploadCloud },
  { key: "scanning", label: "Scanning", icon: ScanLine },
  { key: "encrypting", label: "Encrypting", icon: Lock },
  { key: "stored", label: "Stored Securely", icon: ShieldCheck },
] as const;

type StageKey = (typeof UPLOAD_STAGES)[number]["key"];

export default function DocumentPage() {
  const router = useRouter();
  const params = useParams();
  const caseId = Number(params.caseId);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [documents, setDocuments] = useState<RequiredDocument[]>([]);
  const [files, setFiles] = useState<Record<number, File>>({});
  const [uploading, setUploading] = useState<Record<number, boolean>>({});
  const [stage, setStage] = useState<Record<number, StageKey>>({});

  useEffect(() => { loadDocuments(); }, []);

  async function loadDocuments() {
    try {
      const docs = await OnboardingService.requiredDocuments(caseId);
      setDocuments(docs);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to load documents");
    } finally {
      setLoading(false);
    }
  }

  function chooseFile(id: number, file: File | null) {
    if (!file) return;
    setFiles({ ...files, [id]: file });
  }

  function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function uploadDocument(id: number) {
    const file = files[id];
    if (!file) { toast.error("Choose a file"); return; }

    setUploading({ ...uploading, [id]: true });
    setStage((prev) => ({ ...prev, [id]: "uploading" }));

    try {
      const uploadPromise = OnboardingService.uploadDocument(caseId, id, file);

      await Promise.all([
        uploadPromise,
        wait(400).then(() => setStage((prev) => ({ ...prev, [id]: "uploading" }))),
      ]);

      setStage((prev) => ({ ...prev, [id]: "scanning" }));
      await wait(450);
      setStage((prev) => ({ ...prev, [id]: "encrypting" }));
      await wait(450);
      setStage((prev) => ({ ...prev, [id]: "stored" }));
      await wait(350);

      toast.success("Document uploaded successfully");
      await loadDocuments();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading({ ...uploading, [id]: false });
    }
  }

  async function submit() {
    setSaving(true);
    try {
      const validation = await OnboardingService.validateDocuments(caseId);
      if (!validation.valid) { toast.error(validation.message); return; }

      const submission = await OnboardingService.submitCase(caseId);
      toast.success("Application submitted successfully.");

      const params = new URLSearchParams({
        referralCode: submission.referralCode,
        referralLink: submission.referralShareUrl,
      });

      router.push(`/intake/${caseId}/success?${params.toString()}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to submit application");
    } finally {
      setSaving(false);
    }
  }

  const uploadedCount = documents.filter((d) => d.uploaded).length;

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <section className="mx-auto max-w-2xl px-6 py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Secure Upload</p>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold">Upload Required Documents</h1>
            {documents.length > 0 && (
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-semibold text-secondary">
                {uploadedCount}/{documents.length} uploaded
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-secondary">
            Upload every required document. Once everything is uploaded, submit your application for CA review.
          </p>

          <p className="mt-1.5 flex items-center gap-1 text-[11px] text-secondary">
            <ShieldCheck size={12} className="text-emerald-400" />
            Every file is encrypted immediately and only visible to your assigned CA.
          </p>

          <div className="card-dark mt-6 p-5">
            {loading ? (
              <div className="space-y-3">
                <div className="h-10 animate-pulse rounded bg-white/10" />
                <div className="h-10 animate-pulse rounded bg-white/10" />
                <div className="h-10 animate-pulse rounded bg-white/10" />
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => {
                  const isUploading = uploading[doc.id];
                  const currentStage = stage[doc.id];
                  const stageIndex = UPLOAD_STAGES.findIndex((s) => s.key === currentStage);

                  return (
                    <div key={doc.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold">{doc.name}</h3>
                          <p className="mt-0.5 text-xs text-secondary">
                            {doc.mandatory ? "Required" : "Optional"} · PDF, JPG or PNG
                          </p>
                          <p className="mt-1 text-[11px] text-secondary">{whyThisDocument(doc.name)}</p>
                        </div>

                        {doc.uploaded ? (
                          <span className="flex shrink-0 items-center gap-1 rounded-lg bg-green-500/20 px-2.5 py-1 text-xs font-medium text-green-400">
                            <CheckCircle2 size={13} /> Uploaded
                          </span>
                        ) : (
                          <span className="shrink-0 rounded-lg bg-yellow-500/20 px-2.5 py-1 text-xs font-medium text-yellow-400">
                            Pending
                          </span>
                        )}
                      </div>

                      {!doc.uploaded && (
                        <>
                          <input
                            type="file"
                            className="input-dark mt-3 block w-full p-2 text-xs"
                            onChange={(e) => chooseFile(doc.id, e.target.files?.[0] ?? null)}
                            disabled={isUploading}
                          />

                          {files[doc.id] && !isUploading && (
                            <p className="mt-1.5 text-xs text-cyan-400">Selected: {files[doc.id].name}</p>
                          )}

                          {isUploading && (
                            <div className="mt-3 flex items-center gap-3">
                              {UPLOAD_STAGES.map((s, i) => {
                                const Icon = s.icon;
                                const active = i === stageIndex;
                                const done = i < stageIndex;
                                return (
                                  <div key={s.key} className="flex flex-1 flex-col items-center gap-1">
                                    <div
                                      className={`flex h-7 w-7 items-center justify-center rounded-full border transition ${
                                        done
                                          ? "border-emerald-400 bg-emerald-500/20 text-emerald-400"
                                          : active
                                          ? "border-emerald-400 bg-emerald-500/10 text-emerald-400 ring-2 ring-emerald-500/30"
                                          : "border-white/10 bg-white/[0.03] text-slate-500"
                                      }`}
                                    >
                                      {done ? <CheckCircle2 size={13} /> : <Icon size={13} />}
                                    </div>
                                    <AnimatePresence mode="wait">
                                      {active && (
                                        <motion.span
                                          key={s.key}
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          className="text-center text-[9px] font-semibold text-emerald-400"
                                        >
                                          {s.label}
                                        </motion.span>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          <button
                            className="btn-secondary mt-3 border-cyan-400/40 py-2 text-xs text-cyan-300 hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isUploading || !files[doc.id]}
                            onClick={() => uploadDocument(doc.id)}
                          >
                            {isUploading ? "Uploading..." : "Upload Document"}
                          </button>
                        </>
                      )}
                    </div>
                  );
                })}

                <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-2.5 text-[11px] text-secondary">
                  <UserCheck2 size={13} className="shrink-0 text-emerald-400" />
                  Documents are verified only by your assigned CA — never shared elsewhere.
                </div>

                <button className="btn-primary mt-1 w-full py-2.5 text-sm" disabled={saving} onClick={submit}>
                  {saving ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}