import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming tax and compliance deadlines",
  description: "Check the upcoming tax and compliance deadlines currently supplied by TaxIn60Sec.",
  alternates: { canonical: "/deadlines" },
};

export default function DeadlinesLayout({ children }: { children: React.ReactNode }) { return children; }
