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

export const OnboardingService = {

  /*
   * SERVICES
   */

  services: () =>
    request<ServiceOffering[]>(
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
        phone,
        email,
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
      "/api/v1/public/intake/answers",
      "POST",
      {
        caseId,
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
      "/api/v1/public/intake/next",
      "POST",
      {
        caseId,
        answer,
      }
    ),

  /*
   * RESUME
   */

  resume: (token: string) =>
    request<ResumeResponse>(
      `/api/v1/public/intake/resume/${token}`
    ),

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
    request(
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

      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/intake/cases/${caseId}/documents`,

      {
        method: "POST",
        body: formData,
      }

    );

    if (!response.ok) {

      throw new Error("Failed to upload document");

    }

    return response.json();

  },

};