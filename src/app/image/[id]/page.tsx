import Link from "next/link";

import { MarketingHeader, MarketingFooter } from "@/components/site/MarketingHeader";
import { mockGallery } from "@/lib/mock";

export default async function ImagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const img = mockGallery.find((g) => g.id === id) ?? mockGallery[0];
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr]">
        <img src={img.src} alt={img.prompt} className="w-full rounded-2xl border border-border" />
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Prompt
          </p>
          <p className="font-mono mt-3 text-sm">{img.prompt}</p>
          <div className="mt-8 flex gap-2">
            <Link
              href="/auth/signup"
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
            >
              Remix this
            </Link>
            <button className="rounded-full border border-border px-5 py-2.5 text-sm">
              Copy prompt
            </button>
          </div>
          <div className="mt-10 hairline-t pt-6">
            <Link
              href={`/creators/${img.creator}`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              By @{img.creator} →
            </Link>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
