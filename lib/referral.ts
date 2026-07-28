export function captureReferralCode() {
  if (typeof window === "undefined") return;
  const ref = new URLSearchParams(window.location.search).get("ref");
  if (ref) {
    localStorage.setItem("tax60-referral-code", ref);
  }
}

export function getStoredReferralCode(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem("tax60-referral-code") ?? undefined;
}