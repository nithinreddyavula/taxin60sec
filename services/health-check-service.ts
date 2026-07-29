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

export const HealthCheckService = {
  evaluate: (userType: string, answers: Record<string, boolean>) =>
    request<HealthCheckResult>(
      "/api/v1/public/intake/health-check",
      "POST",
      { userType, answers }
    ),

  captureLead: (
    email: string,
    phoneNumber: string,
    userType: string,
    result: HealthCheckResult
  ) =>
    request<void>(
      "/api/v1/public/intake/health-check/capture",
      "POST",
      {
        email,
        phoneNumber,
        userType,
        score: result.score,
        statusLabel: result.statusLabel,
        issuesSummary: result.issues.map((i) => i.title).join(", "),
      }
    ),
};