"use client";

import { MarketingHeader, MarketingFooter } from "@/components/site/MarketingHeader";
import { mockMarketplace } from "@/lib/mock";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Marketplace</p>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
          Prompts, styles & packs by creators
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Sell your prompts and styles. Keep 80% of every sale.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockMarketplace.map((m) => (
            <div key={m.id} className="overflow-hidden rounded-2xl border border-border">
              <img src={m.cover} alt={m.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {m.type}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold">{m.title}</h3>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">@{m.creator}</span>
                  <span className="font-mono font-semibold">â‚¹{m.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
