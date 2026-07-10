import { useEffect, useState } from "react";

/**
 * Computes a human-readable countdown to the next daily credit reset.
 * Pure client-side display helper — the actual refresh decision is server-authoritative.
 */
export function useResetCountdown(resetAt: string | null | undefined): string {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!resetAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [resetAt]);

  if (!resetAt) return "—";
  const diff = new Date(resetAt).getTime() - now;
  if (diff <= 0) return "refreshing…";
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}
