"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Auth = { accessToken: string; refreshToken: string; user: { roles: { name: string }[] } };

export default function LoginPage() {
  const router = useRouter(); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [message, setMessage] = useState(""); const [loading, setLoading] = useState(false);
  async function login() {
    setLoading(true); setMessage("");
    try {
      const auth = await api<Auth>("/api/v1/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      localStorage.setItem("tax60-access-token", auth.accessToken); localStorage.setItem("tax60-refresh-token", auth.refreshToken);
      const isCa = auth.user.roles.some((role) => role.name === "ROLE_CA");
      router.push(isCa ? "/ca/cases" : "/intake");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Login failed"); } finally { setLoading(false); }
  }
  return <div className="min-h-screen bg-[#020817] px-6 text-white flex items-center justify-center"><div className="card-dark w-full max-w-md p-8"><p className="eyebrow">Secure access</p><h1 className="mt-3 text-3xl font-bold">Welcome to Tax60</h1><p className="mt-2 text-secondary">Sign in to continue your case or review assigned work.</p><div className="mt-6 space-y-4"><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="input-dark w-full p-3" /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="input-dark w-full p-3" /><button disabled={loading || !email || !password} onClick={login} className="btn-primary w-full">{loading ? "Signing in…" : "Sign in"}</button>{message && <p className="text-sm text-red-300">{message}</p>}</div></div></div>;
}
