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

      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-6 py-24">
          <div className="card-dark border-emerald-400/20 p-10 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10">
              <span className="text-5xl">✅</span>
            </div>

            <h1 className="mt-8 text-4xl font-bold">
              Application Submitted
            </h1>

            <p className="mt-5 text-secondary">
              Thank you.
              <br />
              Your documents have been received successfully.
              <br />
              Our CA team will review everything and contact you shortly.
            </p>

            <div className="mt-8 rounded-xl bg-white/[0.03] p-5">
              <p className="text-sm text-secondary">
                Case Reference
              </p>

              <h2 className="mt-2 text-2xl font-bold text-emerald-400">
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
                className="btn-primary px-8 py-3"
              >
                Back to Home
              </Link>

              <a
                href="https://wa.me/917013734079"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-3"
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
    <Suspense fallback={<div className="min-h-screen" />}>
      <SuccessContent />
    </Suspense>
  );
}