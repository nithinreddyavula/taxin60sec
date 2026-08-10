import { client, request } from "./client";

export type CAProfile = {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  membershipNumber: string;
  panNumber: string;
  firmName: string | null;
  specialization: string | null;
  verified: boolean;
  tier: string | null;
  backgroundCheckStatus: string;
  practiceCertificateUploaded: boolean;
  panDocumentUploaded: boolean;
  agreementAccepted: boolean;
  availability: string;
  activeCaseload: number;
  payoutDestinationConfigured: boolean;
  payoutMethod: string | null;
  payoutUpiId: string | null;
  payoutBankAccountNumberMasked: string | null;
};

export type CaDashboard = {
  profile: CAProfile;
  caseCounts: Record<string, number>;
  totalEarnings: number;
  pendingEarnings: number;
};

export type CaApplicationPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  membershipNumber: string;
  panNumber: string;
  firmName?: string;
  specialization?: string;
};

export type PayoutDestinationPayload = {
  method: "UPI" | "BANK_TRANSFER";
  accountHolderName?: string;
  bankAccountNumber?: string;
  bankIfsc?: string;
  upiId?: string;
};

export type CAPublicProfile = {
  userId: number;
  fullName: string;
  membershipNumber?: string;
  firmName?: string;
  specialization?: string;
  verified: boolean;
  tier?: string;
};

export const CAProfileService = {
  apply: (payload: CaApplicationPayload) =>
    request<CAProfile>("/api/v1/ca/apply", "POST", payload),

  myDashboard: () => request<CaDashboard>("/api/v1/ca/me/dashboard"),

  myProfile: () => request<CAProfile>("/api/v1/ca/me/profile"),

  // Client-facing: safe-to-show credentials of a specific CA (by user id) -
  // used on the case detail page so the client can see who they're assigned to.
  publicProfile: (caUserId: number) => request<CAPublicProfile>(`/api/v1/ca/${caUserId}/public-profile`),

  uploadDocument: async (documentType: "PRACTICE_CERTIFICATE" | "PAN_CARD", file: File) => {
    const form = new FormData();
    form.append("documentType", documentType);
    form.append("file", file);
    const res = await client.post<{ data: CAProfile }>("/api/v1/ca/me/documents", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  },

  acceptAgreement: (agreementVersion = "v1") =>
    request<CAProfile>("/api/v1/ca/me/agreement/accept", "POST", { agreementVersion }),

  setAvailability: (availability: "AVAILABLE" | "LIMITED" | "UNAVAILABLE") =>
    request<CAProfile>("/api/v1/ca/me/availability", "PATCH", { availability }),

  setPayoutDestination: (payload: PayoutDestinationPayload) =>
    request<CAProfile>("/api/v1/ca/me/payout-destination", "PUT", payload),

  // admin
  pendingApplications: () => request<CAProfile[]>("/api/v1/ca/applications/pending"),
  verify: (profileId: number) => request<CAProfile>(`/api/v1/ca/applications/${profileId}/verify`, "POST"),
  reject: (profileId: number) => request<void>(`/api/v1/ca/applications/${profileId}/reject`, "POST"),
  setTier: (profileId: number, tier: "JUNIOR" | "SENIOR") =>
    request<CAProfile>(`/api/v1/ca/applications/${profileId}/tier`, "PATCH", { tier }),
  setBackgroundCheckStatus: (profileId: number, status: "PENDING" | "PASSED" | "FAILED") =>
    request<CAProfile>(`/api/v1/ca/applications/${profileId}/background-check`, "PATCH", { status }),
};