"use client";

import { MarketingHeader, MarketingFooter } from "@/components/site/MarketingHeader";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      <article className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="font-display text-4xl font-semibold">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Placeholder privacy policy for the Zenivra creator platform.
        </p>
      </article>
      <MarketingFooter />
    </div>
  );
}
