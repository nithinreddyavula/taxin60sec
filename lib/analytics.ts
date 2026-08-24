"use client";

/**
 * A deliberately small, provider-agnostic analytics boundary. Event payloads must
 * never include personal, tax, payment, or document data.
 */
export type AnalyticsEvent =
  | "health_check_started"
  | "health_check_completed"
  | "health_check_recommendation_selected"
  | "lead_created"
  | "lead_contact_submitted"
  | "login_started"
  | "login_completed"
  | "intake_started"
  | "intake_step_viewed"
  | "intake_answer_saved"
  | "intake_resumed"
  | "intake_completed"
  | "document_upload_started"
  | "document_uploaded"
  | "document_upload_failed"
  | "case_submitted"
  | "payment_opened"
  | "payment_succeeded"
  | "payment_failed"
  | "whatsapp_clicked"
  | "referral_shared"
  | "referral_signup"
  | "referral_reward_earned"
  | "deadline_subscription_started"
  | "application_resume_clicked"
  | "tool_calculated";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, properties: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  // Resume credentials are intentionally never sent to analytics, including via a
  // provider's implicit page URL metadata.
  if (new URLSearchParams(window.location.search).has("resume")) return;
  try {
    window.gtag?.("event", event, properties);
    window.fbq?.("trackCustom", event, properties);
  } catch {
    // Measurement must never interrupt a tax/compliance workflow.
  }
}
