"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { AuthSession, AuthUser } from "@/services/auth-service";

type AppContextValue = { user: AuthUser | null; ready: boolean; setSession: (session: AuthSession) => void; logout: () => void };
const AppContext = createContext<AppContextValue | null>(null);
const SESSION_EVENT = "tax60:session-changed";
const subscribe = (notify: () => void) => { window.addEventListener(SESSION_EVENT, notify); window.addEventListener("tax60:unauthorized", notify); return () => { window.removeEventListener(SESSION_EVENT, notify); window.removeEventListener("tax60:unauthorized", notify); }; };
const serverSnapshot = () => null;
const getUserSnapshot = () => { const saved = localStorage.getItem("tax60-user"); try { return saved ? JSON.parse(saved) as AuthUser : null; } catch { return null; } };
const getReadySnapshot = () => true;
const getServerReadySnapshot = () => false;

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(subscribe, getUserSnapshot, serverSnapshot);
  const ready = useSyncExternalStore(subscribe, getReadySnapshot, getServerReadySnapshot);
  const logout = useCallback(() => { localStorage.removeItem("tax60-access-token"); localStorage.removeItem("tax60-refresh-token"); localStorage.removeItem("tax60-user"); window.dispatchEvent(new Event(SESSION_EVENT)); }, []);
  const value = useMemo(() => ({ user, ready, logout, setSession: (session: AuthSession) => { localStorage.setItem("tax60-access-token", session.accessToken); localStorage.setItem("tax60-refresh-token", session.refreshToken); localStorage.setItem("tax60-user", JSON.stringify(session.user)); window.dispatchEvent(new Event(SESSION_EVENT)); } }), [user, ready, logout]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useAppSession() { const context = useContext(AppContext); if (!context) throw new Error("useAppSession must be used within AppProviders"); return context; }
