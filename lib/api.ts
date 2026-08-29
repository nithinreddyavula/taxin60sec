/**
 * Browser requests intentionally stay relative.  The Next.js `/api` rewrite
 * is the only supported browser-to-backend path in production; using a public
 * backend URL here bypasses the frontend-origin cookie and CSRF design.
 */
export const apiBaseUrl = "";

export type ApiEnvelope<T> = { success: boolean; message: string; data: T };

export async function api<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  if (!path.startsWith("/api/")) {
    throw new Error("API requests must use the same-origin /api path");
  }

  const response = await fetch(path, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...init.headers },
  });
  const payload = await response.json() as ApiEnvelope<T>;
  if (!response.ok || !payload.success) throw new Error(payload.message || "Request failed");
  return payload.data;
}
