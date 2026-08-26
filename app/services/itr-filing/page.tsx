import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceLanding from "@/components/ServiceLanding";
export const metadata: Metadata = { title: "ITR Filing: find your next step", description: "Use TaxIn60Sec to understand your income-tax filing next step, then complete a structured case.", alternates: { canonical: "/services/itr-filing" } };
const config = { title: "ITR filing without guessing where to begin", intro: "If you are unsure what applies to your income, begin with your situation. TaxIn60Sec guides you toward the appropriate next step and keeps the resulting case organised.", category: "INCOME_TAX", codeHints: ["ITR", "INCOME"], forWho: ["Salaried people preparing to file", "People with more than one Indian income source", "Anyone who wants a structured filing journey"], tool: { href: "/tools", label: "Try the income tax calculator" } };
export default function Page() { return <main><Navbar /><ServiceLanding config={config} /><Footer /></main>; }
