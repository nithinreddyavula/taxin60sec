import { request } from "./client";

export type HealthCheckIssue = {
  title: string;
  severity: "HIGH" | "MEDIUM";
};

export type HealthCheckRecommendation = {
  serviceId: number;
  code: string;
  displayName: string;
  priceFrom: number;
  turnaroundDays: number;
};

export type HealthCheckResult = {
  score: number;
  statusLabel: string;
  issues: HealthCheckIssue[];
  recommendations: HealthCheckRecommendation[];
};

export type HealthCheckLead = {
  id: number;
  email?: string;
  phoneNumber?: string;
  userType: string;
  score: number;
  statusLabel: string;
  converted: boolean;
  createdAt: string;
};

export const HealthCheckService = {
  evaluate: (userType: string, answers: Record<string, boolean>) =>
    request<HealthCheckResult>(
      "/api/v1/public/intake/health-check",
      "POST",
      { userType, answers }
    ),

  captureLead: (
    userType: string,
    result: HealthCheckResult,
    options?: { leadId?: number; email?: string; phoneNumber?: string }
  ) =>
    request<HealthCheckLead>(
      "/api/v1/public/intake/health-check/capture",
      "POST",
      {
        leadId: options?.leadId,
        email: options?.email ?? "",
        phoneNumber: options?.phoneNumber ?? "",
        userType,
        score: result.score,
        statusLabel: result.statusLabel,
        issuesSummary: result.issues.map((i) => i.title).join(", "),
        triggeredCodes: result.recommendations.map((r) => r.code),
      }
    ),
};