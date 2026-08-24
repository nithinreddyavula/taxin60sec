"use client";
import axios from "axios";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  // The backend now issues the access/refresh tokens exclusively as httpOnly
  // cookies (see AuthCookieService on the backend) - they're never in the JSON
  // body and never touched by this file. withCredentials makes the browser send
  // those cookies on every request and store the ones the backend sets on login.
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  if (typeof window !== "undefined" && config.url?.startsWith("/api/v1/public/intake/cases/")) {
    const intakeToken = window.sessionStorage.getItem("tax60-intake-resume-token");
    if (intakeToken) config.headers.set("X-Intake-Token", intakeToken);
  }
  return config;
});

let refreshInFlight: Promise<void> | null = null;

function doRefresh(): Promise<void> {
  if (!refreshInFlight) {
    refreshInFlight = axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"}/api/v1/auth/refresh`,
        {},
        { withCredentials: true }
      )
      .then(() => undefined)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && typeof window !== "undefined" && !original?._retry) {
      original._retry = true;
      try {
        // Access token cookie expired - the refresh token cookie may still be
        // valid, so try a silent refresh once before giving up and logging out.
        await doRefresh();
        return client(original);
      } catch {
        window.dispatchEvent(new Event("tax60:unauthorized"));
      }
    }

    return Promise.reject(new Error(error.response?.data?.message ?? error.message ?? "Request failed"));
  },
);

export async function request<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  data?: unknown,
): Promise<T> {
  const response = await client.request<{ success?: boolean; message?: string; data?: T }>({ url, method, data });
  if (response.data.success === false) throw new Error(response.data.message ?? "Request failed");
  return (response.data.data ?? response.data) as T;
}
