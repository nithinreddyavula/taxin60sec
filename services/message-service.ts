import { request } from "./client";

export type CaseMessage = {
  id: number;
  senderId: number;
  senderName: string;
  senderRole: "CLIENT" | "CA" | "ADMIN";
  body: string;
  createdAt: string;
};

export const MessageService = {
  list: (caseId: number) => request<CaseMessage[]>(`/api/v1/cases/${caseId}/messages`),
  send: (caseId: number, body: string) =>
    request<CaseMessage>(`/api/v1/cases/${caseId}/messages`, "POST", { body }),
};