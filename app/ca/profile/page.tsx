"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { CAProfile, CAProfileService, PayoutDestinationPayload } from "@/services/ca-profile-service";

const STEPS: { key: keyof CAProfile; label: string }[] = [
  { key: "practiceCertificateUploaded", label: "Practice certificate uploaded" },
  { key: "panDocumentUploaded", label: "PAN document uploaded" },
  { key: "agreementAccepted", label: "Partner agreement accepted" },
  { key: "payoutDestinationConfigured", label: "Payout destination set up" },
];

export default function CaProfilePage() {
  const [profile, setProfile] = useState<CAProfile | null>(null);
  const [message, setMessage] = useState("");
  const [payoutMethod, setPayoutMethod] = useState<"UPI" | "BANK_TRANSFER">("UPI");
  const [payoutForm, setPayoutForm] = useState<PayoutDestinationPayload>({ method: "UPI" });

  function load() {
    CAProfileService.myProfile().then(setProfile).catch((e) => setMessage(e.message));
  }

  useEffect(load, []);

  async function upload(type: "PRACTICE_CERTIFICATE" | "PAN_CARD", file?: File) {
    if (!file) return;
    try {
      const updated = await CAProfileService.uploadDocument(type, file);
      setProfile(updated);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Upload failed");
    }
  }

  async function acceptAgreement() {
    try {
      setProfile(await CAProfileService.acceptAgreement());
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Failed to accept agreement");
    }
  }

  async function changeAvailability(value: string) {
    try {
      setProfile(await CAProfileService.setAvailability(value as "AVAILABLE" | "LIMITED" | "UNAVAILABLE"));
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Failed to update availability");
    }
  }

  async function savePayout() {
    try {
      setProfile(await CAProfileService.setPayoutDestination({ ...payoutForm, method: payoutMethod }));
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Failed to save payout destination");
    }
  }

  if (!profile) {
    return (
      <AppShell roles={["ROLE_CA"]}>
        <div className="card-dark h-40 animate-pulse rounded-2xl" />
      </AppShell>
    );
  }

  return (
    <AppShell roles={["ROLE_CA"]}>
      <p className="eyebrow">Partner profile</p>
      <h1 className="mt-2 text-3xl font-bold">{profile.fullName}</h1>

      <div className="mt-4 flex items-center gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
          profile.verified ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
        }`}>
          {profile.verified ? "Verified" : "Pending verification"}
        </span>
        {profile.tier && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {profile.tier} tier
          </span>
        )}
      </div>

      {!profile.verified && (
        <div className="card-dark mt-6 p-6">
          <h2 className="text-lg font-bold">Complete your KYC to get verified</h2>
          <div className="mt-4 space-y-3">
            {STEPS.map((s) => (
              <div key={s.key} className="flex items-center gap-2 text-sm">
                <span className={`h-2 w-2 rounded-full ${profile[s.key] ? "bg-emerald-500" : "bg-slate-300"}`} />
                <span className={profile[s.key] ? "text-slate-700" : "text-secondary"}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Practice certificate
              <input type="file" className="input-dark mt-1 w-full p-2 text-sm"
                onChange={(e) => upload("PRACTICE_CERTIFICATE", e.target.files?.[0])} />
            </label>
            <label className="text-sm font-semibold">
              PAN document
              <input type="file" className="input-dark mt-1 w-full p-2 text-sm"
                onChange={(e) => upload("PAN_CARD", e.target.files?.[0])} />
            </label>
          </div>

          {!profile.agreementAccepted && (
            <button onClick={acceptAgreement} className="btn-secondary mt-4">
              Accept partner agreement
            </button>
          )}
        </div>
      )}

      {profile.verified && (
        <div className="card-dark mt-6 p-6">
          <h2 className="text-lg font-bold">Availability</h2>
          <p className="mt-1 text-sm text-secondary">
            Let admin know your current capacity — advisory only, doesn&apos;t block assignment.
          </p>
          <select
            value={profile.availability}
            onChange={(e) => changeAvailability(e.target.value)}
            className="input-dark mt-3 w-full p-3"
          >
            <option value="AVAILABLE">Available</option>
            <option value="LIMITED">Limited capacity</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </select>
        </div>
      )}

      <div className="card-dark mt-6 p-6">
        <h2 className="text-lg font-bold">Payout destination</h2>
        {profile.payoutDestinationConfigured ? (
          <p className="mt-2 text-sm text-secondary">
            {profile.payoutMethod === "UPI" ? `UPI: ${profile.payoutUpiId}` : `Bank: ${profile.payoutBankAccountNumberMasked}`}
          </p>
        ) : (
          <p className="mt-2 text-sm text-secondary">Not set up yet — payouts can&apos;t be sent until you add this.</p>
        )}

        <div className="mt-4 space-y-3">
          <select value={payoutMethod} onChange={(e) => setPayoutMethod(e.target.value as "UPI" | "BANK_TRANSFER")}
            className="input-dark w-full p-3">
            <option value="UPI">UPI</option>
            <option value="BANK_TRANSFER">Bank transfer</option>
          </select>

          {payoutMethod === "UPI" ? (
            <input className="input-dark w-full p-3" placeholder="UPI ID"
              onChange={(e) => setPayoutForm((f) => ({ ...f, upiId: e.target.value }))} />
          ) : (
            <>
              <input className="input-dark w-full p-3" placeholder="Account holder name"
                onChange={(e) => setPayoutForm((f) => ({ ...f, accountHolderName: e.target.value }))} />
              <input className="input-dark w-full p-3" placeholder="Bank account number"
                onChange={(e) => setPayoutForm((f) => ({ ...f, bankAccountNumber: e.target.value }))} />
              <input className="input-dark w-full p-3" placeholder="IFSC code"
                onChange={(e) => setPayoutForm((f) => ({ ...f, bankIfsc: e.target.value }))} />
            </>
          )}

          <button onClick={savePayout} className="btn-primary w-full">Save payout destination</button>
        </div>
      </div>

      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </AppShell>
  );
}