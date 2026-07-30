import { request } from "./client";

export type BusinessType = "INDIVIDUAL" | "PROPRIETORSHIP" | "PARTNERSHIP" | "LLP" | "PRIVATE_LIMITED" | "PUBLIC_LIMITED" | "OPC" | "TRUST" | "NGO";
export type BusinessStatus = "ACTIVE" | "INACTIVE" | "CLOSED";

export type BusinessProfile = {
  id: number;
  clientProfileId: number;
  businessName: string;
  businessType: BusinessType;
  panNumber?: string;
  gstin?: string;
  tanNumber?: string;
  cin?: string;
  msmeNumber?: string;
  incorporationDate?: string;
  businessStatus: BusinessStatus;
  assignedCaId?: number;
  address?: string;
  createdAt: string;
  updatedAt: string;
};

export type BusinessProfileRequest = {
  businessName: string;
  businessType: BusinessType;
  panNumber?: string;
  gstin?: string;
  tanNumber?: string;
  cin?: string;
  msmeNumber?: string;
  incorporationDate?: string;
  businessStatus: BusinessStatus;
  address?: string;
};

export type EntitySummary = {
  id: number;
  businessName: string;
  businessType: BusinessType;
  businessStatus: BusinessStatus;
  panNumber?: string;
  gstin?: string;
  incorporationDate?: string;
  assignedCaId?: number;
  assignedCaName?: string;
};

export type CommandCenter = {
  totalEntities: number;
  entities: EntitySummary[];
};

export const BusinessService = {
  commandCenter: () => request<CommandCenter>("/api/v1/businesses/me/command-center"),

  myBusinesses: () => request<BusinessProfile[]>("/api/v1/businesses/me"),

  create: (body: BusinessProfileRequest) => request<BusinessProfile>("/api/v1/businesses/me", "POST", body),

  update: (id: number, body: BusinessProfileRequest) =>
    request<BusinessProfile>(`/api/v1/businesses/me/${id}`, "PUT", body),

  remove: (id: number) => request<void>(`/api/v1/businesses/me/${id}`, "DELETE"),
};