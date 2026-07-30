import { request, client } from "./client";

export type VaultDocument = {
  id: number;
  originalFilename: string;
  documentType: string;
  caseNumber: string | null;
  serviceName: string | null;
  verificationStatus: string;
  fileSize: number | null;
  uploadedAt: string;
};

export const VaultService = {
  list: () => request<VaultDocument[]>("/api/v1/documents/vault"),

  async download(id: number, filename: string) {
    const response = await client.get(`/api/v1/documents/${id}/download`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};