import { client } from "./client";

export type RequiredDocument = {
  id: number;
  name: string;
  mandatory: boolean;
  uploaded: boolean;
};

export type DocumentValidationResult = {
  valid: boolean;
  message: string;
  missingDocuments: string[];
};

export const DocumentService = {

  async requiredDocuments(caseId: number) {

    const response = await client.get(

      `/api/v1/public/intake/cases/${caseId}/documents`

    );

    return response.data.data;

  },

  async upload(

    caseId: number,

    requiredDocumentId: number,

    file: File

  ) {

    const form = new FormData();

    form.append(

      "requiredDocumentId",

      requiredDocumentId.toString()

    );

    form.append(

      "file",

      file

    );

    const response = await client.post(

      `/api/v1/public/intake/cases/${caseId}/documents`,

      form,

      {

        headers: {

          "Content-Type": "multipart/form-data",

        },

      }

    );

    return response.data.data;

  },

  async validate(caseId: number) {

    const response = await client.get(

      `/api/v1/public/intake/cases/${caseId}/documents/validate`

    );

    return response.data.data as DocumentValidationResult;

  },

  async submit(caseId: number) {

    const response = await client.post(

      `/api/v1/public/intake/cases/${caseId}/submit`

    );

    return response.data.data;

  },

};