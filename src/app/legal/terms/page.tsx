"use client";

import { MarketingHeader, MarketingFooter } from "@/components/site/MarketingHeader";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      <article className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="font-display text-4xl font-semibold">Terms of Service</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Placeholder terms for the Zenivra creator platform. Replace with your finalized legal copy before launch.
        </p>
      </article>
      <MarketingFooter />
    </div>
  );
}
