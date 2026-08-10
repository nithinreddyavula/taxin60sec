"use client";
import axios from "axios";

// Tokens now live in httpOnly cookies set by the backend - this client never reads or
// writes them itself. withCredentials is what makes the browser attach those cookies
// (and the XSRF-TOKEN cookie) to every request, and accept new ones from responses.
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

const MUTATING_METHODS = new Set(["post", "put", "patch", "delete"]);

client.interceptors.request.use((config) => {
  const method = (config.method ?? "get").toLowerCase();
  if (MUTATING_METHODS.has(method)) {
    const csrfToken = readCookie("XSRF-TOKEN");
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      // No tokens to clear from localStorage anymore - the server clears the
      // httpOnly cookies itself on logout/expiry. We just clear the cached user
      // profile and let the app react to the unauthorized event.
      localStorage.removeItem("tax60-user");
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