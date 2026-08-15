import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Tax Health Check",
  description:
    "Answer 12 quick questions and get your personalized Tax Health Score in under 2 minutes — free, AI-powered, no card required.",
};

export default function HealthCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}