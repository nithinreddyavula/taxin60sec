"use client";

import { useState } from "react";
import { DocumentService, RequiredDocument } from "@/services/document-service";
import UploadCard from "./UploadCard";

type Props = {
  caseId: number;
  documents: RequiredDocument[];
  onUploaded?: () => void;
  onError?: (message: string) => void;
};

export default function DocumentUploader({ caseId, documents, onUploaded, onError }: Props) {
  const [progressByDoc, setProgressByDoc] = useState<Record<number, number>>({});
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  async function handleSelectFile(documentId: number, file: File) {
    setUploadingId(documentId);
    setProgressByDoc((prev) => ({ ...prev, [documentId]: 0 }));

    try {
      await DocumentService.upload(caseId, documentId, file, (percent) => {
        setProgressByDoc((prev) => ({ ...prev, [documentId]: percent }));
      });
      onUploaded?.();
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Unable to add document");
    } finally {
      setUploadingId(null);
    }
  }

  if (!documents.length) {
    return <p className="rounded-xl border border-dashed border-white/15 p-4 text-sm text-secondary">No documents added yet.</p>;
  }

  return (
    <div className="space-y-2">
      {documents.map((document) => (
        <UploadCard
          key={document.id}
          document={document}
          uploading={uploadingId === document.id}
          progress={progressByDoc[document.id] ?? 0}
          onSelectFile={handleSelectFile}
        />
      ))}
    </div>
  );
}