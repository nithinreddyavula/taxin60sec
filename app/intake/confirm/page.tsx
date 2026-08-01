"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, FileText, UploadCloud, UserRound } from "lucide-react";
import { useAppSession } from "@/components/AppProviders";

function ConfirmContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAppSession();
  const serviceId = params.get("id");

  function continueToNextStep() {
    if (!serviceId) {
      router.push("/health-check");
      return;
    }
    if (user) {
      router.push(`/intake?id=${serviceId}`);
    } else {
      router.push(`/login?next=${encodeURIComponent(`/intake?id=${serviceId}`)}`);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7faf9] px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        </div>

        <h1 className="mt-6 text-3xl font-bold">Great Choice!</h1>
        <p className="mt-2 text-secondary">
          Let&apos;s get started with fixing your tax compliance.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <UserRound className="h-6 w-6 text-emerald-400" />
            </div>
            <p className="text-sm font-semibold">
              {user ? "Confirm your account" : "Register / Login"}
            </p>
            <p className="text-xs text-secondary">
              {user ? "You're already signed in" : "Create your account or log in"}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <UploadCloud className="h-6 w-6 text-emerald-400" />
            </div>
            <p className="text-sm font-semibold">Upload Documents</p>
            <p className="text-xs text-secondary">Securely upload required documents</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <FileText className="h-6 w-6 text-emerald-400" />
            </div>
            <p className="text-sm font-semibold">We Assign Your CA</p>
            <p className="text-xs text-secondary">Our expert CA will review and take it forward</p>
          </div>
        </div>

        <button onClick={continueToNextStep} className="btn-primary mt-10 w-full">
          Continue
        </button>

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-secondary">
          🔒 100% Secure. Your data is safe with us.
        </p>

        {!user && (
          <p className="mt-6 text-sm text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300">
              Log in
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}

export default function IntakeConfirmPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmContent />
    </Suspense>
  );
}