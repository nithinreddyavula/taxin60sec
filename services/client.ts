"use client";
import axios from "axios";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});
client.interceptors.request.use((config) => { const token = typeof window === "undefined" ? null : localStorage.getItem("tax60-access-token"); if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("tax60-access-token");
      localStorage.removeItem("tax60-refresh-token");
      window.dispatchEvent(new Event("tax60:unauthorized"));
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
