import { request } from "./client";

export type ClientTier = "STANDARD" | "PRIORITY" | "VIP";
export type CasePriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export type ClientTierInfo = {
  tier: ClientTier;
  label: string;
  perks: string[];
  defaultCasePriority: CasePriority;
};

export const TierService = {
  myTier: () => request<ClientTierInfo>("/api/v1/businesses/me/tier"),
};