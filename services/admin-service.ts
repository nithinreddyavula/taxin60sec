import { request, client } from "./client";

export type AdminClientSummary = {
  id: number;
  fullName: string;
  email: string;
  panNumber: string | null;
  status: string;
  joinedOn: string;
  totalCases: number;
};

export type AdminClientCaseSummary = {
  caseId: number;
  caseNumber: string;
  serviceName: string;
  status: string;
  createdAt: string;
};

export type AdminClientDetail = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  status: string;
  joinedOn: string;
  businessName: string | null;
  panNumber: string | null;
  gstin: string | null;
  address: string | null;
  tier: string | null;
  referralCode: string | null;
  referredByCode: string | null;
  referralCredits: number;
  totalCases: number;
  cases: AdminClientCaseSummary[];
};

export type AdminCaseDetail = {
  caseId: number;
  clientName: string;
  email: string | null;
  phone: string | null;
  serviceName: string;
  status: string;
  intakeCompleted: boolean;
  answers: Record<string, string>;
  intakeSummary: string | null;
  assignedCaId: number | null;
  assignedCaName: string | null;
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
  assignedCaId: number | null;
  assignedCaName: string | null;
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

export type AssignableCa = {
  id: number;
  fullName: string;
  email: string;
  activeCaseload: number;
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

function downloadBlob(data: BlobPart, filename: string) {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export const AdminService = {
  dashboard: () => request<AdminDashboard>("/api/v1/admin/dashboard"),

  clients: (search = "", page = 0, size = 20) =>
    request<PageResponse<AdminClientSummary>>(`/api/v1/admin/clients?search=${encodeURIComponent(search)}&page=${page}&size=${size}`),

  clientDetail: (id: number) => request<AdminClientDetail>(`/api/v1/admin/clients/${id}`),

  async exportClientsExcel() {
    const response = await client.get("/api/v1/admin/clients/export", { responseType: "blob" });
    downloadBlob(response.data, `tax60-clients-${new Date().toISOString().slice(0, 10)}.xlsx`);
  },

  cases: () => request<AdminCaseSummary[]>("/api/v1/admin/cases"),

  caseDetail: (id: number) => request<AdminCaseDetail>(`/api/v1/admin/cases/${id}`),
  updateCaseStatus: (caseId: number, status: string) =>
    request<void>(`/api/v1/admin/cases/${caseId}/status?status=${encodeURIComponent(status)}`, "PATCH"),

  async exportCasesExcel() {
    const response = await client.get("/api/v1/admin/cases/export", { responseType: "blob" });
    downloadBlob(response.data, `tax60-cases-${new Date().toISOString().slice(0, 10)}.xlsx`);
  },

  assignableCas: () => request<AssignableCa[]>("/api/v1/admin/cases/assignable-cas"),
  assignCase: (caseId: number, caId: number | null) =>
    request<void>(`/api/v1/admin/cases/${caseId}/assign`, "PATCH", { caId }),

  caList: () => request<CaSummary[]>("/api/v1/admin/cas"),

  settings: () => request<PlatformSetting[]>("/api/v1/admin/settings"),
  updateSetting: (key: string, value: string) => request<PlatformSetting>(`/api/v1/admin/settings/${key}`, "PUT", { value }),

  auditLogs: (search = "", module = "", page = 0, size = 20) =>
    request<PageResponse<AuditLog>>(`/api/v1/admin/audit-logs?search=${encodeURIComponent(search)}&module=${encodeURIComponent(module)}&page=${page}&size=${size}`),

  auditLogDetail: (id: number) => request<AuditLog>(`/api/v1/admin/audit-logs/${id}`),
};