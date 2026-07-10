"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { MarketingHeader, MarketingFooter } from "@/components/site/MarketingHeader";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: ["50 credits daily", "5 images/day", "Public gallery only", "Standard queue"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Creator",
    price: "₹499",
    period: "/month",
    features: [
      "300 daily credits",
      "Fast queue",
      "Private gallery",
      "HD export",
      "Marketplace access",
    ],
    cta: "Go Creator",
    highlight: true,
  },
  {
    name: "Pro",
    price: "₹1,999",
    period: "/month",
    features: [
      "Unlimited images",
      "Priority queue",
      "Video generation",
      "Advanced models",
      "Team workspace",
    ],
    cta: "Go Pro",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "talk to us",
    features: ["Dedicated GPUs", "Private deployment", "Custom models", "Bulk API", "SLA support"],
    cta: "Contact sales",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Pricing
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-6xl">
            Simple, creator-friendly pricing.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            1 image = 10 credits · 1 video = 100 credits. No surprise fees.
          </p>
        </div>
        <div className="mt-16 grid gap-4 lg:grid-cols-4">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl border p-6 ${p.highlight ? "border-foreground bg-surface" : "border-border"}`}
            >
              {p.highlight && (
                <span className="font-mono mb-3 inline-flex w-fit rounded-full bg-foreground px-2 py-0.5 text-[10px] uppercase tracking-widest text-background">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className={`mt-6 rounded-full px-4 py-2.5 text-center text-sm font-medium ${p.highlight ? "bg-foreground text-background hover:opacity-90" : "border border-border hover:bg-surface"}`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
