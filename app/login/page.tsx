"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthService } from "@/services/auth-service";
import { useAppSession } from "@/components/AppProviders";

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();
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

      const next = params.get("next");
      if (next) {
        router.push(next);
        return;
      }

      const isCa = auth.user.roles.includes("ROLE_CA");
      router.push(isCa ? "/ca/cases" : "/dashboard");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Login failed. Please try again.");
      setLoading(false);
    }
  }

  const registerHref = params.get("next")
    ? `/register?next=${encodeURIComponent(params.get("next")!)}`
    : "/register";

  return (
    <div className="min-h-screen bg-[#f7faf9] px-6 text-slate-900 flex items-center justify-center">
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
            <p className="text-sm text-red-600">
              {message}
            </p>
          )}

          <p className="text-center text-sm text-secondary">
            New to Tax60?{" "}
            <Link href={registerHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}