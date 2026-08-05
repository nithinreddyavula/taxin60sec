"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { CAProfile, CAProfileService } from "@/services/ca-profile-service";

export default function AdminCaApplicationsPage() {
  const [applications, setApplications] = useState<CAProfile[]>([]);
  const [message, setMessage] = useState("");

  function load() {
    CAProfileService.pendingApplications().then(setApplications).catch((e) => setMessage(e.message));
  }

  useEffect(load, []);

  async function verify(id: number) {
    try {
      await CAProfileService.verify(id);
      load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Verification failed");
    }
  }

  async function reject(id: number) {
    try {
      await CAProfileService.reject(id);
      load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Rejection failed");
    }
  }

  async function setTier(id: number, tier: "JUNIOR" | "SENIOR") {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, tier } : a)));
    await CAProfileService.setTier(id, tier);
  }

  async function setBackgroundCheck(id: number, status: "PENDING" | "PASSED" | "FAILED") {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, backgroundCheckStatus: status } : a)));
    await CAProfileService.setBackgroundCheckStatus(id, status);
  }

  return (
    <AppShell roles={["ROLE_ADMIN"]}>
      <p className="eyebrow">Partner management</p>
      <h1 className="mt-2 text-3xl font-bold">CA applications</h1>

      {message && <p className="mt-3 text-sm text-red-600">{message}</p>}

      <div className="mt-6 space-y-4">
        {applications.length === 0 && <p className="text-sm text-secondary">No pending applications.</p>}

        {applications.map((a) => (
          <div key={a.id} className="card-dark p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold">{a.fullName}</p>
                <p className="text-sm text-secondary">{a.email} · ICAI {a.membershipNumber} · PAN {a.panNumber}</p>
                {a.firmName && <p className="text-sm text-secondary">{a.firmName}</p>}
                {a.specialization && <p className="mt-1 text-sm text-secondary">{a.specialization}</p>}
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => verify(a.id)} className="btn-primary !px-3 !py-1.5 !text-xs">Verify</button>
                <button onClick={() => reject(a.id)} className="btn-secondary !px-3 !py-1.5 !text-xs">Reject</button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-sm">
              <span className={a.practiceCertificateUploaded ? "text-emerald-600" : "text-secondary"}>
                {a.practiceCertificateUploaded ? "✓" : "○"} Practice certificate
              </span>
              <span className={a.panDocumentUploaded ? "text-emerald-600" : "text-secondary"}>
                {a.panDocumentUploaded ? "✓" : "○"} PAN document
              </span>
              <span className={a.agreementAccepted ? "text-emerald-600" : "text-secondary"}>
                {a.agreementAccepted ? "✓" : "○"} Agreement accepted
              </span>

              <select value={a.tier ?? ""} onChange={(e) => setTier(a.id, e.target.value as "JUNIOR" | "SENIOR")}
                className="input-dark ml-auto p-1.5 text-xs">
                <option value="" disabled>Set tier</option>
                <option value="JUNIOR">Junior</option>
                <option value="SENIOR">Senior</option>
              </select>

              <select value={a.backgroundCheckStatus} onChange={(e) => setBackgroundCheck(a.id, e.target.value as "PENDING" | "PASSED" | "FAILED")}
                className="input-dark p-1.5 text-xs">
                <option value="PENDING">Background check: Pending</option>
                <option value="PASSED">Background check: Passed</option>
                <option value="FAILED">Background check: Failed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}