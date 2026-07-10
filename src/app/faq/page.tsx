"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { MarketingHeader, MarketingFooter } from "@/components/site/MarketingHeader";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/data/faq";

export default function FaqPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return FAQ;
    return FAQ.map((c) => ({
      ...c,
      items: c.items.filter(
        (i) => i.q.toLowerCase().includes(needle) || i.a.toLowerCase().includes(needle),
      ),
    })).filter((c) => c.items.length > 0);
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-16 sm:pt-24">
        <header className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Support
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Browse common questions, or search to jump straight to an answer.
          </p>
          <div className="relative mx-auto mt-8 max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search questions…"
              className="h-12 rounded-full pl-10 text-sm"
            />
          </div>
        </header>

        <section className="mt-12 space-y-10">
          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No matches. Try a different search.
            </p>
          )}
          {filtered.map((cat) => (
            <div key={cat.title}>
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {cat.title}
              </h2>
              <Accordion
                type="single"
                collapsible
                className="mt-3 rounded-2xl border border-border bg-surface/40"
              >
                {cat.items.map((item, idx) => (
                  <AccordionItem
                    key={item.q}
                    value={`${cat.title}-${idx}`}
                    className="border-b border-border last:border-b-0 px-4"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-medium hover:no-underline sm:text-base">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </section>

        <section className="mt-20 rounded-3xl border border-border bg-surface/50 p-8 text-center sm:p-12">
          <h3 className="font-display text-2xl font-semibold sm:text-3xl">Still need help?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Our team typically replies within a few hours.
          </p>
          <Link
            href="/developers"
            className="mt-6 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
          >
            Contact support
          </Link>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
