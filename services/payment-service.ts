import { request } from "./client";

export type PaymentOrder = {
  id: string;
  provider: string;
  referenceId: string;
  amount: number;
  currency: string;
  status: string;
};

export const PaymentService = {
  orderForCase: (caseId: number) =>
    request<PaymentOrder>(`/api/v1/payments/orders/for-case/${caseId}`, "POST"),
};