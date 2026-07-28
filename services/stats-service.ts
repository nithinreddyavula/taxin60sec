import { request } from "./client";

export type ResponseTimeStats = {
  sampleSize: number;
  averageResponseSeconds?: number;
  slaMetPercentage?: number;
  slaThresholdSeconds: number;
};

export type DashboardStats = {
  totalClients: number;
  totalCasesCompleted: number;
  complianceRatePercentage?: number;
};

export const StatsService = {
  responseTime: () => request<ResponseTimeStats>("/api/v1/public/stats/response-time"),
  dashboard: () => request<DashboardStats>("/api/v1/public/stats/dashboard"),
};