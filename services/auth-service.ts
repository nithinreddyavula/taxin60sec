import { request } from "./client";

export type UserRole = "ROLE_CLIENT" | "ROLE_CA" | "ROLE_ADMIN";
export type AuthUser = {
  id?: number;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  roles: UserRole[];
};
// accessToken/refreshToken no longer travel in the JSON body - the backend sets
// them as httpOnly cookies directly on the response. Only `user` is real here.
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

  refresh: () => request<AuthSession>("/api/v1/auth/refresh", "POST"),

  logout: () => request<void>("/api/v1/auth/logout", "POST"),
};