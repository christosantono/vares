"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  Download,
  Heart,
  Globe,
  Copy,
  Trash2,
  Wand2,
  Loader2,
  RefreshCw,
  Maximize2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ImageViewer, type ViewerImage } from "@/features/generate";
import { useResetCountdown } from "@/hooks/useResetCountdown";
import {
  deleteGeneration,
  generateImage,
  listMyGenerations,
  toggleFavorite,
  togglePublic,
} from "@/lib/api/generations";
import { getCreditBalance } from "@/lib/api/credits";
import { useGenerator } from "@/store/generator";
import { ASPECT_RATIOS, getAspectSpec, isAspectRatio, type AspectRatio } from "@/utils/aspectRatio";

export default function GeneratePage() {
  const qc = useQueryClient();
  const gen = useGenerator();

  const credits = useQuery({
    queryKey: ["credits"],
    queryFn: () => getCreditBalance(),
    refetchOnWindowFocus: true,
    refetchInterval: 60_000,
  });
  const gens = useQuery({ queryKey: ["generations"], queryFn: () => listMyGenerations() });
  const countdown = useResetCountdown(credits.data?.daily_reset_at);

  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const viewerImages: ViewerImage[] = useMemo(
    () => (gens.data ?? []).map((g) => ({ id: g.id, url: g.image_url, prompt: g.prompt })),
    [gens.data],
  );

  const generate = useMutation({
    mutationFn: () =>
      generateImage({
        prompt: gen.prompt,
        negative_prompt: gen.negativePrompt || null,
        aspect_ratio: gen.aspectRatio,
        seed: gen.seed,
        cfg: gen.cfg,
        nsfw: gen.nsfw,
        is_public: gen.isPublic,
        model: gen.model,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["generations"] });
      qc.invalidateQueries({ queryKey: ["credits"] });
      toast.success("Image generated");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const [enhancing, setEnhancing] = useState(false);
  const enhance = () => {
    if (!gen.prompt) return;
    setEnhancing(true);
    setTimeout(() => {
      gen.setPrompt(gen.prompt + ", cinematic lighting, ultra detailed, 8k, professional");
      setEnhancing(false);
      toast.success("Prompt enhanced");
    }, 600);
  };

  return (
    <AppShell credits={credits.data?.balance ?? null}>
      
      <div className="grid h-full min-h-screen md:grid-cols-[280px_1fr]">
        {/* Control rail */}
        <aside className="hairline-r overflow-y-auto p-5 scrollbar-thin">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Controls
          </p>

          <div className="mt-5">
            <Label className="text-xs">Model</Label>
            <select
              value={gen.model}
              onChange={(e) => gen.setModel(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="black-forest-labs/FLUX.1-dev">FLUX.1 Dev</option>
              <option value="stabilityai/stable-diffusion-xl-base-1.0">Stable Diffusion XL</option>
              <option value="runwayml/stable-diffusion-v1-5">Stable Diffusion 1.5</option>
            </select>
          </div>

          <div className="mt-2">
            <Label className="text-xs">Aspect ratio</Label>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {ASPECT_RATIOS.map((a) => {
                const spec = getAspectSpec(a);
                const selected = gen.aspectRatio === a;
                return (
                  <button
                    key={a}
                    onClick={() => gen.setAspect(a)}
                    className={`flex flex-col items-center gap-1 rounded-md border px-2 py-2 transition-colors ${selected ? "border-foreground bg-foreground text-background" : "border-border hover:bg-surface"}`}
                    aria-pressed={selected}
                  >
                    <span
                      className={`block w-6 rounded-sm border ${selected ? "border-background/50 bg-background/20" : "border-muted-foreground/40"}`}
                      style={{ aspectRatio: spec.css }}
                    />
                    <span className="font-mono text-[10px]">{a}</span>
                  </button>
                );
              })}
            </div>
            <p className="font-mono mt-2 text-[10px] text-muted-foreground">
              {getAspectSpec(gen.aspectRatio).width}×{getAspectSpec(gen.aspectRatio).height} ·{" "}
              {getAspectSpec(gen.aspectRatio).label}
            </p>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <Label className="text-xs">CFG scale</Label>
              <span className="font-mono text-xs text-muted-foreground">{gen.cfg.toFixed(1)}</span>
            </div>
            <Slider
              min={0}
              max={20}
              step={0.5}
              value={[gen.cfg]}
              onValueChange={([v]) => gen.setCfg(v)}
              className="mt-2"
            />
          </div>

          <div className="mt-5">
            <Label className="text-xs">Seed</Label>
            <div className="mt-1.5 flex gap-2">
              <Input
                value={gen.seed ?? ""}
                onChange={(e) => gen.setSeed(e.target.value ? Number(e.target.value) : null)}
                placeholder="random"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => gen.setSeed(Math.floor(Math.random() * 1_000_000))}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <Label className="text-xs">Negative prompt</Label>
            <Textarea
              value={gen.negativePrompt}
              onChange={(e) => gen.setNegative(e.target.value)}
              placeholder="blurry, low quality, watermark…"
              className="mt-1.5 min-h-[70px]"
            />
          </div>

          <div className="mt-6 space-y-3 rounded-lg border border-border p-3">
            <label className="flex items-center justify-between text-xs">
              <span>NSFW mode</span>
              <Switch checked={gen.nsfw} onCheckedChange={gen.setNsfw} />
            </label>
            <label className="flex items-center justify-between text-xs">
              <span>Publish to community</span>
              <Switch checked={gen.isPublic} onCheckedChange={gen.setPublic} />
            </label>
          </div>

          {/* Credit / refresh status */}
          <div className="mt-6 rounded-lg border border-border bg-surface p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Credits
            </p>
            <p className="mt-1 font-display text-2xl font-semibold">
              {credits.data?.balance ?? "…"}
              <span className="font-mono ml-2 text-xs text-muted-foreground">
                / {credits.data?.daily_allowance ?? "…"} daily
              </span>
            </p>
            <p className="font-mono mt-1 text-[10px] text-muted-foreground">
              Refresh in {countdown}
            </p>
          </div>
        </aside>

        {/* Main */}
        <section className="p-6 md:p-10">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-3xl font-semibold tracking-tight">Generate</h1>
            {/* <p className="mt-1 text-sm text-muted-foreground">
              10 credits per image · {credits.data?.balance ?? "…"} available
            </p> */}

            <div className="position-fixed mt-6 rounded-2xl border border-border bg-surface p-5">
              <Textarea
                value={gen.prompt}
                onChange={(e) => gen.setPrompt(e.target.value)}
                placeholder="A cinematic portrait of a samurai in neon rain, 85mm, kodak portra…"
                className="font-mono min-h-[120px] resize-none border-0 bg-transparent text-sm shadow-none focus-visible:ring-0"
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={enhance}
                  disabled={!gen.prompt || enhancing}
                  className="gap-2"
                >
                  <Wand2 className="h-3.5 w-3.5" />
                  {enhancing ? "Enhancing…" : "Enhance prompt"}
                </Button>
                <Button
                  onClick={() => generate.mutate()}
                  disabled={!gen.prompt || generate.isPending}
                  className="gap-2"
                >
                  {generate.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="h-4 w-4" />
                  )}
                  {generate.isPending ? "Generating…" : "Generate · 10 credits"}
                </Button>
              </div>
            </div>

            {generate.isPending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 grid place-items-center rounded-2xl border border-border bg-surface p-12"
              >
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <p className="font-mono mt-3 text-xs text-muted-foreground">
                  Imagining your prompt…
                </p>
              </motion.div>
            )}

            <div className="mt-10">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Your generations
              </p>
              {!gens.data || gens.data.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-border p-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    No generations yet. Write a prompt above to get started.
                  </p>
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {gens.data.map((g, idx) => {
                    const ratio = isAspectRatio(g.aspect_ratio) ? g.aspect_ratio : "1:1";
                    const css = getAspectSpec(ratio).css;
                    return (
                      <motion.div
                        key={g.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-border bg-surface"
                        onClick={() => setViewerIndex(idx)}
                      >
                        <img
                          src={g.image_url}
                          alt={g.prompt}
                          className="w-full object-cover"
                          style={{ aspectRatio: css }}
                          loading="lazy"
                        />
                        <div className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100">
                          <Maximize2 className="h-3.5 w-3.5" />
                        </div>
                        <div
                          className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/90 to-transparent p-3 transition-transform group-hover:translate-y-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p className="font-mono line-clamp-2 text-[10px] text-white/80">
                            {g.prompt}
                          </p>
                          <div className="mt-2 flex gap-1">
                            <button
                              onClick={() => {
                                toggleFavorite({ id: g.id, value: !g.is_favorite }).then(() =>
                                  qc.invalidateQueries({ queryKey: ["generations"] }),
                                );
                              }}
                              className="rounded p-1.5 text-white/80 hover:bg-white/10"
                              aria-label="Toggle favorite"
                            >
                              <Heart
                                className={`h-3.5 w-3.5 ${g.is_favorite ? "fill-current" : ""}`}
                              />
                            </button>
                            <button
                              onClick={() => {
                                togglePublic({ id: g.id, value: !g.is_public }).then(() =>
                                  qc.invalidateQueries({ queryKey: ["generations"] }),
                                );
                              }}
                              className="rounded p-1.5 text-white/80 hover:bg-white/10"
                              aria-label="Toggle public"
                            >
                              <Globe
                                className={`h-3.5 w-3.5 ${g.is_public ? "fill-current/20" : ""}`}
                              />
                            </button>
                            <a
                              href={g.image_url}
                              download
                              className="rounded p-1.5 text-white/80 hover:bg-white/10"
                              aria-label="Download"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </a>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(g.prompt);
                                toast.success("Prompt copied");
                              }}
                              className="rounded p-1.5 text-white/80 hover:bg-white/10"
                              aria-label="Copy prompt"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                gen.setPrompt(g.prompt);
                                if (isAspectRatio(g.aspect_ratio)) gen.setAspect(g.aspect_ratio);
                                toast("Remix loaded");
                              }}
                              className="rounded p-1.5 text-white/80 hover:bg-white/10"
                              aria-label="Remix"
                            >
                              <Wand2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Delete this image?"))
                                  deleteGeneration({ id: g.id }).then(() =>
                                    qc.invalidateQueries({ queryKey: ["generations"] }),
                                  );
                              }}
                              className="ml-auto rounded p-1.5 text-white/80 hover:bg-white/10"
                              aria-label="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <ImageViewer
        images={viewerImages}
        activeIndex={viewerIndex}
        onClose={() => setViewerIndex(null)}
        onIndexChange={setViewerIndex}
      />
    </AppShell>
  );
}
