"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReferralShareBlock from "@/components/ReferralShareBlock";

function SuccessContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const caseId = params.caseId;
  const referralCode = searchParams.get("referralCode");
  const referralLink = searchParams.get("referralLink");

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7faf9] text-slate-900">
        <section className="mx-auto max-w-3xl px-6 py-24">
          <div className="rounded-2xl border border-emerald-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
              <span className="text-5xl">✅</span>
            </div>

            <h1 className="mt-8 text-4xl font-bold">
              Application Submitted
            </h1>

            <p className="mt-5 text-slate-500">
              Thank you.
              <br />
              Your documents have been received successfully.
              <br />
              Our CA team will review everything and contact you shortly.
            </p>

            <div className="mt-8 rounded-xl bg-[#f7faf9] p-5">
              <p className="text-sm text-slate-500">
                Case Reference
              </p>

              <h2 className="mt-2 text-2xl font-bold text-emerald-600">
                #{caseId}
              </h2>
            </div>

            {referralCode && referralLink && (
              <div className="mt-8 text-left">
                <ReferralShareBlock
                  referralCode={referralCode}
                  referralShareUrl={referralLink}
                  title="Know someone who needs this?"
                  description="Share your link - you both get rewarded when they become a client."
                />
              </div>
            )}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Back to Home
              </Link>

              <a
                href="https://wa.me/917013734079"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-200 px-8 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Contact on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7faf9]" />}>
      <SuccessContent />
    </Suspense>
  );
}