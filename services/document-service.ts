import { request } from "./client";

export type CaseDocument = { id: number; originalFilename: string; verificationStatus: string; uploadedAt?: string; url?: string };

export const DocumentService = {
  list: (caseId: number) => request<CaseDocument[]>(`/api/v1/cases/${caseId}/documents`),
  create: (caseId: number, file: File, documentType = "OTHER") => request<CaseDocument>(`/api/v1/cases/${caseId}/documents`, "POST", {
    originalFilename: file.name, documentType, mimeType: file.type || "application/octet-stream", fileSize: file.size,
  }),
  approve: (caseId: number, documentId: number) => request<CaseDocument>(`/api/v1/cases/${caseId}/documents/${documentId}/approve`, "POST"),
  reject: (caseId: number, documentId: number, reason: string) => request<CaseDocument>(`/api/v1/cases/${caseId}/documents/${documentId}/reject`, "POST", { reason }),
};
