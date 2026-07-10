import { MarketingHeader, MarketingFooter } from "@/components/site/MarketingHeader";
import { mockCreators, mockGallery } from "@/lib/mock";

export default async function CreatorPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const creator = mockCreators.find((c) => c.handle === handle) ?? mockCreators[0];
  const works = mockGallery.filter((g) => g.creator === handle).concat(mockGallery.slice(0, 8));
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="h-24 w-24 rounded-full bg-surface"
          />
          <div>
            <h1 className="font-display text-4xl font-semibold">{creator.name}</h1>
            <p className="font-mono text-sm text-muted-foreground">@{creator.handle}</p>
            <div className="mt-3 flex gap-6 text-sm text-muted-foreground">
              <span>
                <span className="text-foreground font-medium">
                  {creator.followers.toLocaleString()}
                </span>{" "}
                followers
              </span>
              <span>
                <span className="text-foreground font-medium">{creator.generations}</span> works
              </span>
            </div>
          </div>
          <button className="ml-auto rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:opacity-90">
            Follow
          </button>
        </div>
        <div className="mt-12 columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3 [&>*]:break-inside-avoid">
          {works.map((g) => (
            <div key={g.id} className="overflow-hidden rounded-xl border border-border">
              <img src={g.src} alt={g.prompt} className="w-full" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
