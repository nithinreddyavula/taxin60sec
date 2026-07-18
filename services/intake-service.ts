import { request } from "./client";

export type ServiceOffering = { id: number; displayName: string; description?: string; intakeQuestions: string[] };
export type IntakeCase = {
  taxCase: { id: number; caseNumber?: string; title?: string; intakeSummary?: string; workflowStage?: string };
  questions: string[];
  answers: Record<string, string>;
  missingDocuments: { name: string }[];
};
type Page<T> = { content: T[] };

export const OnboardingService = {
  services: () => request<Page<ServiceOffering>>("/api/v1/services?active=true"),
  start: (serviceOfferingId: number) => request<IntakeCase>("/api/v1/intake/cases", "POST", { serviceOfferingId }),
  saveAnswers: (caseId: number, answers: Record<string, string>) =>
    request<IntakeCase>(`/api/v1/intake/cases/${caseId}/answers`, "POST", {
      answers: Object.entries(answers).map(([question, answer]) => ({ question, answer })), complete: true,
    }),
};
