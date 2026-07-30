import { request } from "./client";

export type Payment = {
  id: number;
  providerPaymentId: string | null;
  provider: string | null;
  referenceId: string | null;
  amount: number | null;
  currency: string | null;
  status: string;
  caseNumber: string | null;
  createdAt: string;
};

export type PaymentPage = {
  items: Payment[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export const PaymentHistoryService = {
  list: (page = 0, size = 20) =>
    request<PaymentPage>(`/api/v1/payments?page=${page}&size=${size}`),
};