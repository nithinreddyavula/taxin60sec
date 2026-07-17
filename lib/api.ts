export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export type ApiEnvelope<T> = { success: boolean; message: string; data: T };

export async function api<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...init.headers },
  });
  const payload = await response.json() as ApiEnvelope<T>;
  if (!response.ok || !payload.success) throw new Error(payload.message || "Request failed");
  return payload.data;
}
