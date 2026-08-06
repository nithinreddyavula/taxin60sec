import { request } from "./client";

export type CaseFunnel = {
  totalCases: number;
  draft: number;
  intake: number;
  documentCollection: number;
  caReview: number;
  inProgress: number;
  completed: number;
  cancelled: number;
};

export type RevenueSummary = {
  totalCollected: number;
  totalReleasedToCa: number;
  totalPlatformCommission: number;
  totalHeldInEscrow: number;
  totalRefunded: number;
};

export type CaseVolumeByCategory = {
  category: string;
  caseCount: number;
};

export type AdminReportsOverview = {
  caseFunnel: CaseFunnel;
  revenue: RevenueSummary;
  volumeByCategory: CaseVolumeByCategory[];
  averageTurnaroundDays: number | null;
  totalClients: number;
  totalVerifiedCAs: number;
};

export const ReportsService = {
  overview: () => request<AdminReportsOverview>("/api/v1/admin/reports/overview"),
};