"use client";

import Link from "next/link";

import { MarketingHeader, MarketingFooter } from "@/components/site/MarketingHeader";
import { mockGallery } from "@/lib/mock";

export default function ExplorePage() {
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Community
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Explore
            </h1>
          </div>
          <div className="hidden gap-2 sm:flex">
            {["Trending", "Latest", "Following"].map((t, i) => (
              <button
                key={t}
                className={`rounded-full px-4 py-1.5 text-xs ${i === 0 ? "bg-foreground text-background" : "border border-border hover:bg-surface"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3 [&>*]:break-inside-avoid">
          {mockGallery.map((img) => (
            <Link
              key={img.id}
              href={`/image/${img.id}`}
              className="group block overflow-hidden rounded-xl border border-border"
            >
              <img
                src={img.src}
                alt={img.prompt}
                className="w-full transition-transform group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="flex items-center justify-between p-3">
                <span className="font-mono text-[11px] text-muted-foreground">@{img.creator}</span>
                <span className="font-mono text-[11px] text-muted-foreground">♥ {img.likes}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
