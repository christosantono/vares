"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { AppShell } from "@/components/app/AppShell";
import { getCreditBalance } from "@/lib/api/credits";
import { listMyGenerations } from "@/lib/api/generations";

export default function GalleryPage() {
  const [favOnly, setFavOnly] = useState(false);
  const credits = useQuery({ queryKey: ["credits"], queryFn: () => getCreditBalance() });
  const gens = useQuery({
    queryKey: ["generations", favOnly],
    queryFn: () => listMyGenerations({ favoritesOnly: favOnly }),
  });

  return (
    <AppShell credits={credits.data?.balance ?? null}>
      <div className="mx-auto max-w-7xl p-6 md:p-10">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">My gallery</h1>
            <p className="mt-1 text-sm text-muted-foreground">{gens.data?.length ?? 0} images</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFavOnly(false)}
              className={`rounded-full px-4 py-1.5 text-xs ${!favOnly ? "bg-foreground text-background" : "border border-border"}`}
            >
              All
            </button>
            <button
              onClick={() => setFavOnly(true)}
              className={`rounded-full px-4 py-1.5 text-xs ${favOnly ? "bg-foreground text-background" : "border border-border"}`}
            >
              Favorites
            </button>
          </div>
        </div>
        {!gens.data || gens.data.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-16 text-center">
            <p className="text-sm text-muted-foreground">
              Nothing here yet. Head to Generate to create your first image.
            </p>
          </div>
        ) : (
          <div className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3 [&>*]:break-inside-avoid">
            {gens.data.map((g) => (
              <div key={g.id} className="overflow-hidden rounded-xl border border-border">
                <img src={g.image_url} alt={g.prompt} className="w-full" loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
