import { request } from "./client";

export type UserRole = "ROLE_CLIENT" | "ROLE_CA" | "ROLE_ADMIN";
export type AuthUser = { id?: number; name?: string; email?: string; roles: UserRole[] };
export type AuthSession = { accessToken: string; refreshToken: string; user: AuthUser };

export const AuthService = {
  login: (email: string, password: string) => request<AuthSession>("/api/v1/auth/login", "POST", { email, password }),
};