import { request } from "./client";

export type UserRole = "ROLE_CLIENT" | "ROLE_CA" | "ROLE_ADMIN";
export type AuthUser = {
  id?: number;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  roles: UserRole[];
};
// accessToken/refreshToken are no longer part of the response body - they arrive as
// httpOnly cookies the browser stores automatically and this app never touches.
export type AuthSession = { user: AuthUser };

export const AuthService = {
  login: (email: string, password: string) =>
    request<AuthSession>("/api/v1/auth/login", "POST", { email, password }),

  register: (fullName: string, email: string, phoneNumber: string, password: string) =>
    request<AuthSession>("/api/v1/auth/register", "POST", {
      fullName,
      email,
      phoneNumber,
      password,
    }),

  // Hits the backend so it can revoke the refresh token and clear both cookies -
  // logout is no longer just a local localStorage.removeItem().
  logout: () => request<void>("/api/v1/auth/logout", "POST"),
};