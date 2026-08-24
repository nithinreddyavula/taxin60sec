"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

const numberValue = (value: string) => Math.max(0, Number(value.replace(/,/g, "")) || 0);

// Deliberately limited to a transparent estimate. Surcharge, cess, special-rate
// income and every deduction are outside its scope and are called out in the UI.
function newRegimeTax(income: number) {
  const taxable = Math.max(0, income - 75_000);
  const bands: [number, number][] = [[400_000, 0], [800_000, .05], [1_200_000, .10], [1_600_000, .15], [2_000_000, .20], [Infinity, .30]];
  let previous = 0, tax = 0;
  for (const [limit, rate] of bands) { tax += Math.max(0, Math.min(taxable, limit) - previous) * rate; previous = limit; }
  return taxable <= 1_200_000 ? 0 : tax;
}
function oldRegimeTax(income: number, deductions: number) {
  const taxable = Math.max(0, income - 50_000 - Math.min(deductions, 150_000));
  const bands: [number, number][] = [[250_000, 0], [500_000, .05], [1_000_000, .20], [Infinity, .30]];
  let previous = 0, tax = 0;
  for (const [limit, rate] of bands) { tax += Math.max(0, Math.min(taxable, limit) - previous) * rate; previous = limit; }
  return taxable <= 500_000 ? 0 : tax;
}

export default function TaxCalculator() {
  const [income, setIncome] = useState(""); const [deductions, setDeductions] = useState(""); const [result, setResult] = useState<{oldTax:number; newTax:number} | null>(null);
  function calculate() { const gross = numberValue(income); if (!gross) return; const oldTax = oldRegimeTax(gross, numberValue(deductions)); const newTax = newRegimeTax(gross); setResult({ oldTax, newTax }); track("tool_calculated", { tool: "income_tax_calculator" }); }
  function reset() { setIncome(""); setDeductions(""); setResult(null); }
  return <section className="card-dark mt-8 p-5 sm:p-7"><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Annual taxable income (₹)<input inputMode="numeric" value={income} onChange={e=>setIncome(e.target.value)} placeholder="e.g. 1200000" className="input-dark mt-2 w-full p-3" /></label><label className="text-sm font-semibold">Eligible old-regime deductions (₹)<input inputMode="numeric" value={deductions} onChange={e=>setDeductions(e.target.value)} placeholder="80C and similar, up to ₹1,50,000" className="input-dark mt-2 w-full p-3" /></label></div><div className="mt-5 flex flex-col gap-2 sm:flex-row"><button onClick={calculate} disabled={!numberValue(income)} className="btn-primary">Calculate estimate</button><button onClick={reset} className="btn-secondary">Reset</button></div>{result && <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white/5 p-4"><p className="text-xs text-secondary">Old regime estimate</p><p className="mt-1 text-2xl font-bold">₹{Math.round(result.oldTax).toLocaleString("en-IN")}</p></div><div className="rounded-xl bg-white/5 p-4"><p className="text-xs text-secondary">New regime estimate</p><p className="mt-1 text-2xl font-bold">₹{Math.round(result.newTax).toLocaleString("en-IN")}</p></div></div>}<p className="mt-5 text-xs leading-5 text-secondary">Estimate excludes cess, surcharge, capital gains/special-rate income and deductions other than the basic standard deduction and a capped old-regime deduction input. Tax rules can change; confirm with a CA before filing.</p></section>;
}
