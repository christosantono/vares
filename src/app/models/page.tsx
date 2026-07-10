"use client";

import { MarketingHeader, MarketingFooter } from "@/components/site/MarketingHeader";
import { mockModels } from "@/lib/mock";

export default function ModelsPage() {
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Catalog</p>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Models</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockModels.map((m) => (
            <div key={m.id} className="rounded-2xl border border-border p-6 transition-colors hover:bg-surface">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {m.family}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold">{m.name}</h3>
                </div>
                {m.badge && (
                  <span className="font-mono rounded-full border border-border px-2 py-0.5 text-[10px] uppercase">
                    {m.badge}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{m.description}</p>
              <p className="font-mono mt-4 text-[10px] uppercase text-muted-foreground">{m.speed}</p>
            </div>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
