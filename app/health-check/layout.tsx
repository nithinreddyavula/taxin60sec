import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Tax Health Check",
  description:
    "Answer a few questions tailored to your situation and get a personalized Tax Health Score — free, AI-powered, no card required.",
  alternates: { canonical: "/health-check" },
};

export default function HealthCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
