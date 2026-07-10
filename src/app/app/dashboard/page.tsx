"use client";

import { useQuery } from "@tanstack/react-query";

import { AppShell } from "@/components/app/AppShell";
import { getCreditBalance, getDashboardStats } from "@/lib/api/credits";

export default function DashboardPage() {
  const stats = useQuery({ queryKey: ["dashboard"], queryFn: () => getDashboardStats() });
  const credits = useQuery({ queryKey: ["credits"], queryFn: () => getCreditBalance() });
  const c = stats.data;

  return (
    <AppShell credits={credits.data?.balance ?? null}>
      <div className="mx-auto max-w-7xl p-6 md:p-10">
        <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your activity at a glance.</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Credits", value: credits.data?.balance ?? "—" },
            { label: "Plan", value: (credits.data?.plan ?? "free").toUpperCase() },
            { label: "Total images", value: c?.totalImages ?? "—" },
            { label: "Images (7d)", value: c?.images7d ?? "—" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-2 font-display text-3xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border p-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Credits spent (7d)
            </p>
            <p className="mt-2 font-display text-4xl font-semibold">{c?.spent7d ?? 0}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              ≈ {Math.floor((c?.spent7d ?? 0) / 10)} images
            </p>
          </div>
          <div className="rounded-2xl border border-border p-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Storage
            </p>
            <p className="mt-2 font-display text-4xl font-semibold">
              {((c?.totalImages ?? 0) * 1.2).toFixed(1)}{" "}
              <span className="text-sm text-muted-foreground">MB</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Unlimited on Pro</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
