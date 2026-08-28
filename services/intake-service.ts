import { request } from "./client";

// Replace your current ServiceOffering type with this version:
 
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
  // New — backed by service_offerings.complexity / included_features.
  complexity?: "SIMPLE" | "MODERATE" | "COMPLEX" | string;
  /** List of what's included, e.g. ["Review", "Filing", "Notice support", "Expert Verification"] */
    includedFeatures?: string[];
};

export type StartIntakeResponse = {
  caseId: number;
  caseNumber: string;
  resumeToken: string;
  questions: string[];
};

export type RequiredDocument = {
  id: number;
  name: string;
  mandatory: boolean;
  uploaded: boolean;
};

export type DocumentValidationResult = {
  valid: boolean;
  message: string;
  missingDocuments: string[];
};

export type ResumeResponse = {
  caseId: number;
  currentQuestion: string;
  answers: Record<string, string>;
  questions: string[];
};
export type PageResponse<T> = {
  items: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export const OnboardingService = {

  /*
   * SERVICES
   */

  services: () =>
    request<PageResponse<ServiceOffering>>(
        "/api/v1/services?active=true"
    ),

  /*
   * START INTAKE
   */

  start: (
    serviceOfferingId: number,
    fullName: string,
    phone: string,
    email: string
  ) =>
    request<StartIntakeResponse>(
      "/api/v1/public/intake/start",
      "POST",
      {
        serviceOfferingId,
        fullName,
        phoneNumber: phone,
        email,
        referralCode:
          typeof window !== "undefined"
            ? localStorage.getItem("tax60-referral-code") ?? undefined
            : undefined,
        healthCheckLeadId:
          typeof window !== "undefined" && localStorage.getItem("tax60-health-check-lead-id")
            ? Number(localStorage.getItem("tax60-health-check-lead-id"))
            : undefined,
      }
    ),

  /*
   * SAVE ONE ANSWER
   */

  saveAnswer: (
  caseId: number,
  question: string,
  answer: string
) =>
  request(
    `/api/v1/public/intake/cases/${caseId}/answers`,
    "POST",
    {
      question,
      answer,
    }
  ),

  /*
   * NEXT QUESTION
   */

  nextQuestion: (
  caseId: number,
  answer: string
) =>
  request(
    `/api/v1/public/intake/cases/${caseId}/next`,
    "POST",
    {
      answer,
    }
  ),

  /*
   * RESUME
   */

  resumeUrl: (token: string) =>
    `/api/v1/public/intake/resume/${encodeURIComponent(token)}`,

  resumeCurrentSession: () =>
    request<ResumeResponse>("/api/v1/public/intake/resume-session"),

  /*
   * REQUIRED DOCUMENTS
   */

  requiredDocuments: (
    caseId: number
  ) =>
    request<RequiredDocument[]>(
      `/api/v1/public/intake/cases/${caseId}/documents`
    ),

  /*
   * DOCUMENT VALIDATION
   */

  validateDocuments: (
    caseId: number
  ) =>
    request<DocumentValidationResult>(
      `/api/v1/public/intake/cases/${caseId}/documents/validate`
    ),

  /*
   * SUBMIT CASE
   */

  submitCase: (
    caseId: number
  ) =>
    request<{ referralCode: string; referralShareUrl: string }>(
      `/api/v1/public/intake/cases/${caseId}/submit`,
      "POST"
    ),

  /*
   * DOCUMENT UPLOAD
   */

  uploadDocument: async (
    caseId: number,
    requiredDocumentId: number,
    file: File
  ) => {

    const formData = new FormData();

    formData.append(
      "requiredDocumentId",
      String(requiredDocumentId)
    );

    formData.append(
      "file",
      file
    );

    const response = await fetch(
      `/api/v1/public/intake/cases/${caseId}/documents`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: (() => {
          const headers = new Headers();
          const token = typeof window === "undefined" ? null : sessionStorage.getItem("tax60-intake-resume-token");
          if (token) headers.set("X-Intake-Token", token);
          return headers;
        })(),
      }
    );

    if (!response.ok) {

      throw new Error("Failed to upload document");

    }

    return response.json();

  },

};
