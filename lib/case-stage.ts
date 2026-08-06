export const CASE_STAGES = ["Intake", "Documents Uploaded", "CA Review", "Filing", "Completed"] as const;
export type CaseStage = (typeof CASE_STAGES)[number];

const STAGE_MAP: Record<string, CaseStage> = {
  CREATED: "Intake",
  DOCUMENTS_PENDING: "Documents Uploaded",
  DOCUMENTS_UPLOADED: "Documents Uploaded",
  DOCUMENTS_VERIFIED: "Documents Uploaded",
  CA_ASSIGNED: "CA Review",
  UNDER_REVIEW: "CA Review",
  CLIENT_ACTION_REQUIRED: "CA Review",
  READY_TO_FILE: "Filing",
  PAYMENT_PENDING: "Filing",
  PAYMENT_COMPLETED: "Filing",
  PROCESSING: "Filing",
  FILED: "Filing",
  COMPLETED: "Completed",
};

export function caseStageIndex(workflowStage?: string): number {
  const stage = workflowStage ? STAGE_MAP[workflowStage] : undefined;
  const index = stage ? CASE_STAGES.indexOf(stage) : 0;
  return index === -1 ? 0 : index;
}

export const NEXT_ACTION_COPY: Record<string, string> = {
  CREATED: "We're reviewing what you've shared.",
  DOCUMENTS_PENDING: "Upload your documents to get things moving.",
  DOCUMENTS_UPLOADED: "Your documents are queued for verification.",
  DOCUMENTS_VERIFIED: "Documents verified — waiting for a CA to be assigned.",
  CA_ASSIGNED: "Your CA has been assigned and will begin review shortly.",
  UNDER_REVIEW: "Your CA is reviewing your documents.",
  CLIENT_ACTION_REQUIRED: "Your CA needs something from you — check messages.",
  READY_TO_FILE: "Your filing is ready — a payment request is coming.",
  PAYMENT_PENDING: "Payment is due to move your filing forward.",
  PAYMENT_COMPLETED: "Payment received — we're preparing your filing.",
  PROCESSING: "We're filing your return now.",
  FILED: "Filed! We're waiting on confirmation.",
  COMPLETED: "This case is complete.",
};