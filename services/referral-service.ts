import { request } from "./client";

export type ReferralInfo = {
  code: string;
  shareLink: string;
  totalReferred: number;
};

export const ReferralService = {
  me: () => request<ReferralInfo>("/api/v1/referrals/me"),
};