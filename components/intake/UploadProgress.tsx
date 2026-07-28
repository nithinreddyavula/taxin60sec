"use client";

type Props = {
  percent: number;
};

export default function UploadProgress({ percent }: Props) {
  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-blue-400 transition-all duration-200"
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}