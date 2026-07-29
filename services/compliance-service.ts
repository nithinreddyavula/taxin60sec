import { request } from "./client";

export type ComplianceItem = {
  id: number;
  type: string;
  title: string;
  dueDate: string;
  status: string;
  recommendedServiceId: number | null;
};

export type ComplianceScore = {
  score: number;
  statusLabel: string;
  items: ComplianceItem[];
  nextDue: ComplianceItem | null;
};

export const ComplianceService = {
  myScore: () => request<ComplianceScore>("/api/v1/compliance/score"),
};