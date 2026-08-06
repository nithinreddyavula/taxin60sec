import { request } from "./client";

export type AdminClientSummary = {
  id: number;
  fullName: string;
  email: string;
  panNumber: string | null;
  status: string;
  joinedOn: string;
  totalCases: number;
};

export type AdminCaseSummary = {
  caseId: number;
  clientName: string;
  serviceName: string;
  status: string;
  intakeCompleted: boolean;
  answeredQuestions: number;
  totalQuestions: number;
  createdAt: string;
};

export type AdminDashboard = {
  totalCases: number;
  draft: number;
  intake: number;
  documentCollection: number;
  caReview: number;
  inProgress: number;
  completed: number;
  cancelled: number;
};

export type CaSummary = {
  id: number;
  fullName: string;
  email: string;
  tier: string | null;
  firmName: string | null;
  specialization: string | null;
  availability: string;
  activeCaseload: number;
  averageRating: number | null;
};

export type PlatformSetting = {
  key: string;
  value: string;
  defaultValue: string;
  description: string;
  customized: boolean;
  updatedAt: string;
};

export type AuditLog = {
  id: number;
  action: string;
  entityType: string;
  entityId: string;
  actorId: string;
  attributes: string;
  createdAt: string;
};

type PageResponse<T> = { items: T[]; page: number; size: number; totalElements: number; totalPages: number };

export const AdminService = {
  dashboard: () => request<AdminDashboard>("/api/v1/admin/dashboard"),

  clients: (search = "", page = 0, size = 20) =>
    request<PageResponse<AdminClientSummary>>(`/api/v1/admin/clients?search=${encodeURIComponent(search)}&page=${page}&size=${size}`),

  cases: () => request<AdminCaseSummary[]>("/api/v1/admin/cases"),

  caList: () => request<CaSummary[]>("/api/v1/admin/cas"),

  settings: () => request<PlatformSetting[]>("/api/v1/admin/settings"),
  updateSetting: (key: string, value: string) => request<PlatformSetting>(`/api/v1/admin/settings/${key}`, "PUT", { value }),

  auditLogs: (search = "", module = "", page = 0, size = 20) =>
    request<PageResponse<AuditLog>>(`/api/v1/admin/audit-logs?search=${encodeURIComponent(search)}&module=${encodeURIComponent(module)}&page=${page}&size=${size}`),

  auditLogDetail: (id: number) => request<AuditLog>(`/api/v1/admin/audit-logs/${id}`),
};