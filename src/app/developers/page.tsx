"use client";

import { MarketingHeader, MarketingFooter } from "@/components/site/MarketingHeader";
import { ComingSoon } from "@/components/site/ComingSoon";

export default function DevelopersPage() {
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      <ComingSoon
        title="Developer API"
        description="A production-grade REST + streaming API with metered billing. Public beta launching Q3 2026."
      />
      <MarketingFooter />
    </div>
  );
}
