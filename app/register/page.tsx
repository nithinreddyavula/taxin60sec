"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthService } from "@/services/auth-service";
import { useAppSession } from "@/components/AppProviders";

function RegisterContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { setSession } = useAppSession();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {
    if (loading) return;
    setLoading(true);
    setMessage("");

    try {
      const auth = await AuthService.register(fullName, email, phoneNumber, password);
      setSession(auth);

      const next = params.get("next");
      router.push(next ?? "/dashboard");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Registration failed. Please try again.");
      setLoading(false);
    }
  }

  const loginHref = params.get("next")
    ? `/login?next=${encodeURIComponent(params.get("next")!)}`
    : "/login";

  return (
    <div className="min-h-screen bg-[#020817] px-6 text-white flex items-center justify-center">
      <div className="card-dark w-full max-w-md p-8">
        <p className="eyebrow">Create your account</p>

        <h1 className="mt-3 text-3xl font-bold">Join Tax60</h1>

        <p className="mt-2 text-secondary">
          Set up your account to start tracking your tax health.
        </p>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input-dark w-full p-3"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-dark w-full p-3"
          />

          <input
            type="tel"
            placeholder="Mobile number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="input-dark w-full p-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-dark w-full p-3"
          />
          <p className="text-xs text-secondary">
            Must be 8+ characters with uppercase, lowercase, a number, and a special character.
          </p>

          {message && <p className="text-sm text-red-300">{message}</p>}

          <button
            onClick={register}
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-sm text-secondary">
            Already have an account?{" "}
            <Link href={loginHref} className="font-semibold text-emerald-400 hover:text-emerald-300">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterContent />
    </Suspense>
  );
}