import { request } from "./client";

export type ComplianceItem = {
  id: number;
  type: string;
  title: string;
  dueDate: string;
  status: string;
  recommendedServiceId: number | null;
};

// Backend rollup for the fixed Income Tax / GST / ROC / Payroll categories.
// Always all four, even if a category is "NOT_APPLICABLE" (no obligation of
// that kind exists for this client) - the shape is constant regardless of
// the client's situation. Was already returned by /compliance/score but
// never captured on the frontend type or rendered anywhere.
export type ComplianceCategory = {
  category: "INCOME_TAX" | "GST" | "ROC" | "PAYROLL" | string;
  status: "OVERDUE" | "PENDING" | "COMPLETED" | "NOT_APPLICABLE" | string;
};

export type ComplianceScore = {
  score: number;
  statusLabel: string;
  items: ComplianceItem[];
  nextDue: ComplianceItem | null;
  categories: ComplianceCategory[];
};

export const ComplianceService = {
  myScore: () => request<ComplianceScore>("/api/v1/compliance/score"),
};