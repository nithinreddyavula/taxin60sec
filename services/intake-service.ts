import { request } from "./client";

export type ServiceOffering = {
  id: number;
  code: string;
  displayName: string;
  description?: string;
  category: string;
  estimatedCompletionDays: number;
  basePrice: number;
  minimumPrice: number;
  maximumPrice: number;
  active: boolean;
  featured: boolean;
  displayOrder: number;
  icon: string;
  color: string;
  requiresPaymentFirst: boolean;
  requiresDocumentVerification: boolean;
  intakeQuestions: string[];
};
export type IntakeCase = {
  taxCase: { id: number; caseNumber?: string; title?: string; intakeSummary?: string; workflowStage?: string };
  questions: string[];
  answers: Record<string, string>;
  missingDocuments: { name: string }[];
};
type Page<T> = {
  items: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export const OnboardingService = {
  services: () => request<Page<ServiceOffering>>("/api/v1/services?active=true"),
  start: (serviceOfferingId: number) => request<IntakeCase>("/api/v1/intake/cases", "POST", { serviceOfferingId }),
  saveAnswers: (caseId: number, answers: Record<string, string>) =>
    request<IntakeCase>(`/api/v1/intake/cases/${caseId}/answers`, "POST", {
      answers: Object.entries(answers).map(([question, answer]) => ({ question, answer })), complete: true,
    }),
};
