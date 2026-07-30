import { request } from "./client";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AiResponse = {
  message: string;
};

export const AiChatService = {
  send: (caseId: number, message: string) =>
    request<AiResponse>(`/api/ai/chat/${caseId}`, "POST", { message }),
};