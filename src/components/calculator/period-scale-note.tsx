"use client";

export function PeriodScaleNote({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="text-xs leading-snug text-[#0047FF]">{message}</p>
  );
}
