import { request } from "./client";

export type RepatriationRecord = {
  id: number;
  amountUsd: number;
  transactionDate: string;
  purpose: string;
  form15caFiled: boolean;
};

export type RepatriationSummary = {
  financialYear: string;
  limitUsd: number | null;
  usedUsd: number;
  remainingUsd: number | null;
  records: RepatriationRecord[];
  disclaimer: string;
};

export const RepatriationService = {
  summary: () => request<RepatriationSummary>("/api/v1/nri/repatriation"),

  addRecord: (
    amountUsd: number,
    transactionDate: string,
    purpose: string,
    form15caFiled: boolean
  ) =>
    request<RepatriationSummary>("/api/v1/nri/repatriation", "POST", {
      amountUsd,
      transactionDate,
      purpose,
      form15caFiled,
    }),
};  