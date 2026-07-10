import { notFound } from "next/navigation";

import { MarketingHeader, MarketingFooter } from "@/components/site/MarketingHeader";
import { mockMarketplace } from "@/lib/mock";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await params;
  const item = mockMarketplace.find((m) => m.id === itemId);
  if (!item) notFound();
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-2">
        <img
          src={item.cover}
          alt={item.title}
          className="aspect-square w-full rounded-2xl object-cover"
        />
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {item.type}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold">{item.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            By @{item.creator} · {item.sales} sales
          </p>
          <p className="font-display mt-8 text-4xl font-semibold">₹{item.price}</p>
          <button className="mt-6 w-full rounded-full bg-foreground py-3 text-sm font-medium text-background hover:opacity-90">
            Purchase
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Demo · checkout not enabled
          </p>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
