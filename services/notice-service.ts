import { request } from "./client";

export type Notice = {
  id: number;
  type: string;
  severity: string;
  title: string;
  message: string | null;
  caseNumber: string | null;
  read: boolean;
  createdAt: string;
};

export type NoticePage = {
  items: Notice[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export const NoticeService = {
  list: (page = 0, size = 20) =>
    request<NoticePage>(`/api/v1/notices?page=${page}&size=${size}`),

  unreadCount: () =>
    request<{ unread: number }>("/api/v1/notices/unread-count"),

  markRead: (id: number) =>
    request<Notice>(`/api/v1/notices/${id}/read`, "POST"),

  markAllRead: () => request<void>("/api/v1/notices/read-all", "POST"),
};