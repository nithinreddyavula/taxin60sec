import { request } from "./client";

export type SupportTicket = {
  id: number;
  caseId?: number;
  subject: string;
  body: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  adminResponse?: string;
  respondedByName?: string;
  respondedAt?: string;
  createdAt: string;
};

export const SupportTicketService = {
  forCase: (caseId: number) => request<SupportTicket[]>(`/api/v1/cases/${caseId}/support-tickets`),
  mine: () => request<SupportTicket[]>("/api/v1/support-tickets/me"),
  create: (caseId: number, subject: string, body: string) =>
    request<SupportTicket>("/api/v1/support-tickets", "POST", { caseId, subject, body }),
};