import { request } from "./client";

export type BillingInterval = "MONTHLY" | "QUARTERLY" | "ANNUAL";
export type SubscriptionStatus = "ACTIVE" | "PAUSED" | "CANCELLED";

export type SubscriptionPlan = {
  id: number;
  name: string;
  description?: string;
  serviceOfferingId: number;
  serviceOfferingName: string;
  amount: number;
  billingInterval: BillingInterval;
  active: boolean;
};

export type Subscription = {
  id: number;
  businessProfileId: number;
  businessName: string;
  planId: number;
  planName: string;
  status: SubscriptionStatus;
  assignedCaId?: number;
  assignedCaName?: string;
  nextBillingDate?: string;
};

export type SubscriptionCycle = {
  id: number;
  periodStart: string;
  periodEnd: string;
  caseId?: number;
  caseNumber?: string;
  caseStatus?: string;
  paymentOrderId?: string;
  billedAt?: string;
};

export type CreatePlanRequest = {
  name: string;
  description?: string;
  serviceOfferingId: number;
  amount: number;
  billingInterval: BillingInterval;
};

export const SubscriptionService = {
  plans: () => request<SubscriptionPlan[]>("/api/v1/subscription-plans"),
  createPlan: (body: CreatePlanRequest) => request<SubscriptionPlan>("/api/v1/subscription-plans", "POST", body),

  subscribe: (businessProfileId: number, planId: number) =>
    request<Subscription>("/api/v1/subscriptions", "POST", { businessProfileId, planId }),
  mine: () => request<Subscription[]>("/api/v1/subscriptions/mine"),
  cycles: (subscriptionId: number) => request<SubscriptionCycle[]>(`/api/v1/subscriptions/${subscriptionId}/cycles`),
  cancel: (subscriptionId: number) => request<Subscription>(`/api/v1/subscriptions/${subscriptionId}/cancel`, "POST"),

  // Admin-only
  pause: (subscriptionId: number) => request<Subscription>(`/api/v1/admin/subscriptions/${subscriptionId}/pause`, "POST"),
  resume: (subscriptionId: number) => request<Subscription>(`/api/v1/admin/subscriptions/${subscriptionId}/resume`, "POST"),
};