import { request } from "./client";

export type Deadline = {
  type: string;
  title: string;
  dueDate: string;
  daysRemaining: number;
};

export const DeadlinesService = {
  upcoming: () =>
    request<{ deadlines: Deadline[] }>("/api/v1/public/intake/deadlines"),

  subscribe: (phoneNumber: string) =>
    request<void>("/api/v1/public/intake/deadlines/subscribe", "POST", {
      phoneNumber,
    }),
};