import { Zap } from "lucide-react";

export default function GuaranteeBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
      <Zap size={16} />
      Confirmed within 60 seconds, guaranteed
    </div>
  );
}