"use client";

import { ChangeEvent } from "react";
import { CheckCircle2, FileUp, Loader2 } from "lucide-react";
import UploadProgress from "./UploadProgress";
import type { RequiredDocument } from "@/services/document-service";

type Props = {
  document: RequiredDocument;
  uploading: boolean;
  progress: number;
  onSelectFile: (documentId: number, file: File) => void;
};

export default function UploadCard({ document, uploading, progress, onSelectFile }: Props) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onSelectFile(document.id, file);
    event.target.value = "";
  }

  return (
    <div className="rounded-xl border border-white/10 p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {document.name}
            {document.mandatory && <span className="ml-1 text-red-300">*</span>}
          </p>
          <p className="mt-0.5 text-xs text-secondary">
            {document.uploaded ? "Uploaded" : document.mandatory ? "Required" : "Optional"}
          </p>
        </div>

        {document.uploaded && !uploading ? (
          <CheckCircle2 className="shrink-0 text-emerald-400" size={19} />
        ) : (
          <label className="btn-secondary shrink-0 cursor-pointer px-3 py-1.5 text-xs">
            {uploading ? <Loader2 className="animate-spin" size={15} /> : <FileUp size={15} />}
            {uploading ? "Uploading…" : document.uploaded ? "Replace" : "Add"}
            <input className="sr-only" type="file" onChange={handleChange} disabled={uploading} />
          </label>
        )}
      </div>

      {uploading && <UploadProgress percent={progress} />}
    </div>
  );
}