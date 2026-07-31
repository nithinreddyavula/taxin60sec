import { request } from "./client";
export type CaseItem = { id:number; caseNumber:string; title:string; status:string; workflowStage:string; intakeSummary?:string; firstResponseAt?:string; responseSeconds?:number; slaMet?:boolean; clientName?:string; clientEmail?:string; clientPhone?:string; assignedCaId?:number; assignedCaName?:string };
export type Page<T> = { items:T[]; totalElements:number; totalPages:number };
export type TimelineEvent = { id?: number; title: string; description?: string; createdAt: string; eventType?: string };
export type OnboardingSummary = { summary?: string; missingDocuments?: { name?: string; documentName?: string }[]; price?: number; amount?: number; workflow?: { stage?: string; status?: string } };
export const CaseService = {
  list: (path="/api/v1/cases") => request<Page<CaseItem>>(path),
  detail: (id:number) => request<CaseItem>(`/api/v1/cases/${id}`),
  timeline: (id:number) => request<TimelineEvent[]>(`/api/v1/cases/${id}/documents/timeline`),
  onboarding: (id: number) => request<OnboardingSummary>(`/api/v1/cases/${id}/onboarding/summary`),
  workflow: (id: number) => request<{ stage?: string; status?: string; currentStage?: string }>(`/api/v1/cases/${id}/onboarding/workflow`),
  pricing: (id: number) => request<{ amount?: number; price?: number; currency?: string }>(`/api/v1/cases/${id}/onboarding/pricing`),
  missingDocuments: (id: number) => request<{ name?: string; documentName?: string }[]>(`/api/v1/cases/${id}/documents/missing`),
};