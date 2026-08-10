"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { AuthService, AuthSession, AuthUser } from "@/services/auth-service";

type AppContextValue = { user: AuthUser | null; ready: boolean; setSession: (session: AuthSession) => void; logout: () => void };
const AppContext = createContext<AppContextValue | null>(null);
const SESSION_EVENT = "tax60:session-changed";
const subscribe = (notify: () => void) => { window.addEventListener(SESSION_EVENT, notify); window.addEventListener("tax60:unauthorized", notify); return () => { window.removeEventListener(SESSION_EVENT, notify); window.removeEventListener("tax60:unauthorized", notify); }; };
const serverSnapshot = () => null;
let cachedRaw: string | null = null;
let cachedUser: AuthUser | null = null;
const getUserSnapshot = () => {
  const saved = localStorage.getItem("tax60-user");
  if (saved === cachedRaw) return cachedUser; // same reference -> stops the infinite-loop crash
  cachedRaw = saved;
  try { cachedUser = saved ? (JSON.parse(saved) as AuthUser) : null; } catch { cachedUser = null; }
  return cachedUser;
};
const getReadySnapshot = () => true;
const getServerReadySnapshot = () => false;

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(subscribe, getUserSnapshot, serverSnapshot);
  const ready = useSyncExternalStore(subscribe, getReadySnapshot, getServerReadySnapshot);

  // The access/refresh tokens themselves are httpOnly cookies now - this app never
  // stores them and can't read them even if it wanted to. Only the (non-sensitive)
  // user profile is cached locally so the UI can render without waiting on a network
  // round trip on every page load.
  const logout = useCallback(() => {
    AuthService.logout().catch(() => {
      // Even if the network call fails, still clear local UI state below -
      // the cookies will simply expire on their own if the request didn't land.
    }).finally(() => {
      localStorage.removeItem("tax60-user");
      window.dispatchEvent(new Event(SESSION_EVENT));
    });
  }, []);

  const value = useMemo(() => ({
    user,
    ready,
    logout,
    setSession: (session: AuthSession) => {
      localStorage.setItem("tax60-user", JSON.stringify(session.user));
      window.dispatchEvent(new Event(SESSION_EVENT));
    },
  }), [user, ready, logout]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useAppSession() { const context = useContext(AppContext); if (!context) throw new Error("useAppSession must be used within AppProviders"); return context; }