import { request } from "./client";

export type SupportTicket = {
  id: number;
  raisedById: number;
  raisedByName: string;
  caseId: number | null;
  caseNumber: string | null;
  subject: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
};

export type SupportTicketMessage = {
  id: number;
  ticketId: number;
  senderId: number;
  senderName: string;
  body: string;
  createdAt: string;
};

type TicketPage = {
  items: SupportTicket[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export const SupportTicketService = {
  forCase: (caseId: number) =>
    request<TicketPage>(`/api/v1/support/tickets?caseId=${caseId}`),

  mine: () => request<TicketPage>("/api/v1/support/tickets"),

  create: (subject: string, message: string, caseId?: number) =>
    request<SupportTicket>("/api/v1/support/tickets", "POST", { subject, message, caseId }),

  messages: (ticketId: number) =>
    request<SupportTicketMessage[]>(`/api/v1/support/tickets/${ticketId}/messages`),

  reply: (ticketId: number, body: string) =>
    request<SupportTicketMessage>(`/api/v1/support/tickets/${ticketId}/messages`, "POST", { body }),
};