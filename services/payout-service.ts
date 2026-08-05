import { request } from "./client";

export type CaPayoutSummary = {
  caId: number;
  caName: string;
  totalReleased: number;
  totalHeld: number;
  totalCommission: number;
  totalPayments: number;
};

export type PayoutLineItem = {
  id: number;
  caseNumber: string;
  amount: number;
  escrowStatus: string;
  platformCommissionAmount: number;
  caPayoutAmount: number;
  escrowReleasedAt: string | null;
  escrowReleasedBy: string | null;
};

export const PayoutService = {
  myPayouts: () => request<PayoutLineItem[]>("/api/v1/ca/me/payouts"),
  platformSummary: () => request<CaPayoutSummary[]>("/api/v1/admin/payouts"),
  forCa: (caUserId: number) => request<PayoutLineItem[]>(`/api/v1/admin/payouts/${caUserId}`),
};