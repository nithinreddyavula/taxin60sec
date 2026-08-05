"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CAProfileService } from "@/services/ca-profile-service";

export default function CaApplyPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "", email: "", phoneNumber: "", password: "",
    membershipNumber: "", panNumber: "", firmName: "", specialization: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit() {
    setLoading(true);
    setMessage("");
    try {
      await CAProfileService.apply(form);
      setSubmitted(true);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Application failed");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f7faf9] px-6 py-20 text-slate-900">
        <div className="card-dark mx-auto max-w-lg p-8 text-center">
          <h1 className="text-2xl font-bold">Application submitted</h1>
          <p className="mt-3 text-secondary">
            Thanks for applying. Log in to upload your KYC documents (practice certificate
            and PAN) and accept the partner agreement — we&apos;ll review once both are in.
          </p>
          <button onClick={() => router.push("/login")} className="btn-primary mt-6 w-full">
            Go to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7faf9] px-6 py-16 text-slate-900">
      <div className="card-dark mx-auto max-w-lg p-8">
        <p className="eyebrow">Join as a Tax60 Partner CA</p>
        <h1 className="mt-3 text-3xl font-bold">Apply to become a partner</h1>
        <p className="mt-2 text-secondary">
          Every partner CA completes KYC verification — ICAI membership, PAN, and a practice
          certificate — before being assignable to client cases.
        </p>

        <div className="mt-6 space-y-3">
          <input className="input-dark w-full p-3" placeholder="Full name"
            value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
          <input className="input-dark w-full p-3" placeholder="Email" type="email"
            value={form.email} onChange={(e) => set("email", e.target.value)} />
          <input className="input-dark w-full p-3" placeholder="Mobile number" type="tel"
            value={form.phoneNumber} onChange={(e) => set("phoneNumber", e.target.value)} />
          <input className="input-dark w-full p-3" placeholder="Password" type="password"
            value={form.password} onChange={(e) => set("password", e.target.value)} />
          <input className="input-dark w-full p-3" placeholder="ICAI membership number"
            value={form.membershipNumber} onChange={(e) => set("membershipNumber", e.target.value)} />
          <input className="input-dark w-full p-3" placeholder="PAN number"
            value={form.panNumber} onChange={(e) => set("panNumber", e.target.value.toUpperCase())} />
          <input className="input-dark w-full p-3" placeholder="Firm name (optional)"
            value={form.firmName} onChange={(e) => set("firmName", e.target.value)} />
          <textarea className="input-dark w-full p-3" rows={3} placeholder="Specialization (optional) — e.g. GST, NRI taxation, audits"
            value={form.specialization} onChange={(e) => set("specialization", e.target.value)} />

          {message && <p className="text-sm text-red-600">{message}</p>}

          <button disabled={loading} onClick={submit} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Submitting..." : "Submit application"}
          </button>
        </div>
      </div>
    </div>
  );
}