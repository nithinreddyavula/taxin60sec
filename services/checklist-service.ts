import { request } from "./client";

/** PENDING = nothing uploaded yet, UPLOADED = awaiting CA review, VERIFIED, REJECTED. */
export type ChecklistItemStatus = "PENDING" | "UPLOADED" | "VERIFIED" | "REJECTED";

export type ChecklistItem = {
  requiredDocumentId: number;
  name: string;
  documentType: string;
  description?: string;
  mandatory: boolean;
  source: string;
  displayOrder: number;
  status: ChecklistItemStatus;
  rejectionReason?: string;
  uploadedDocumentId?: number;
  uploadedAt?: string;
};

export type AddChecklistItemRequest = {
  name: string;
  documentType: string;
  description?: string;
  mandatory: boolean;
  acceptedFileTypes?: string;
};

export const ChecklistService = {
  list: (caseId: number) => request<ChecklistItem[]>(`/api/v1/cases/${caseId}/checklist`),
  addItem: (caseId: number, body: AddChecklistItemRequest) =>
    request<ChecklistItem>(`/api/v1/cases/${caseId}/checklist/items`, "POST", body),
};