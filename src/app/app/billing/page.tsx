"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { AppShell } from "@/components/app/AppShell";
import { getCreditBalance } from "@/lib/api/credits";

export default function BillingPage() {
  const credits = useQuery({ queryKey: ["credits"], queryFn: () => getCreditBalance() });
  return (
    <AppShell credits={credits.data?.balance ?? null}>
      <div className="mx-auto max-w-4xl p-6 md:p-10">
        <h1 className="font-display text-3xl font-semibold">Billing</h1>
        <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Current plan
          </p>
          <p className="mt-2 font-display text-3xl font-semibold">
            {(credits.data?.plan ?? "free").toUpperCase()}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {credits.data?.balance ?? 0} credits remaining · refills daily
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-block rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:opacity-90"
          >
            Upgrade plan
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
