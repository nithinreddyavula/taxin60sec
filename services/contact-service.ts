import { request } from "./client";

export type ContactLead = { id: string | number; name: string; email: string; phone?: string; message: string; createdAt?: string };
export const ContactService = {
  create: (lead: Omit<ContactLead, "id" | "createdAt">) => request<ContactLead>("/api/contact", "POST", lead),
  list: () => request<ContactLead[]>("/api/contact"),
  remove: (id: string | number) => request<void>(`/api/contact/${id}`, "DELETE"),
};
