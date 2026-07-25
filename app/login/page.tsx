"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth-service";
import { useAppSession } from "@/components/AppProviders";

export default function LoginPage() {
  const router = useRouter();
  const { setSession } = useAppSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    if (loading) return; // guard against double-click / double-submit
    setLoading(true);
    setMessage("");

    try {
      const auth = await AuthService.login(email, password);
      setSession(auth);

      const isCa = auth.user.roles.includes("ROLE_CA");
      router.push(isCa ? "/ca/cases" : "/dashboard");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Login failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#020817] px-6 text-white flex items-center justify-center">
      <div className="card-dark w-full max-w-md p-8">
        <p className="eyebrow">Secure access</p>

        <h1 className="mt-3 text-3xl font-bold">
          Welcome to Tax60
        </h1>

        <p className="mt-2 text-secondary">
          Sign in to continue your case or review assigned work.
        </p>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-dark w-full p-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-dark w-full p-3"
          />

          <button
            disabled={loading || !email || !password}
            onClick={login}
            className="btn-primary w-full"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {message && (
            <p className="text-sm text-red-300">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}