import { Info } from "lucide-react";

type Props = {
  label?: string;
  basePrice: number;
  /** Flat platform fee in INR. Defaults to ₹49 to match the rest of the product. */
  platformFee?: number;
  /** GST rate as a decimal. Defaults to 18%, the standard rate for professional services in India. */
  gstRate?: number;
};

function formatInr(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

// Fix 5 — Pricing transparency. Shows exactly what a price is made of instead
// of a single opaque number, so "why does someone else pay less" answers itself.
export default function PriceBreakdown({
  label = "Base Filing",
  basePrice,
  platformFee = 49,
  gstRate = 0.18,
}: Props) {
  const taxableAmount = basePrice + platformFee;
  const gst = Math.round(taxableAmount * gstRate);
  const total = taxableAmount + gst;

  const rows = [
    { name: label, value: basePrice },
    { name: "Platform Fee", value: platformFee },
    { name: `GST (${Math.round(gstRate * 100)}%)`, value: gst },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="space-y-2.5">
        {rows.map((row) => (
          <div key={row.name} className="flex items-center justify-between text-sm">
            <span className="text-secondary">{row.name}</span>
            <span className="font-medium text-slate-200">{formatInr(row.value)}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-sm font-semibold text-white">Total</span>
        <span className="text-lg font-bold text-white">{formatInr(total)}</span>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-3 text-xs text-secondary">
        <Info size={14} className="mt-0.5 shrink-0 text-emerald-400" />
        <p>
          Why does another user pay a different amount? Pricing scales with income
          complexity — different forms, capital gains, or number of income sources
          can change the base filing fee.
        </p>
      </div>
    </div>
  );
}