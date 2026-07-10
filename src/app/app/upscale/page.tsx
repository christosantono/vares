"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Download, ImageUp, Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ToolHeader, ToolShell, Dropzone, EmptyCanvas, RecentStrip } from "@/features/tools";

export default function UpscalePage() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [scale, setScale] = useState<2 | 4>(4);
  const [faces, setFaces] = useState(true);
  const [denoise, setDenoise] = useState(35);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      setDone(false);
      return;
    }
    const u = URL.createObjectURL(file);
    setUrl(u);
    setDone(false);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  function run() {
    if (!file) return toast.error("Upload an image first");
    setBusy(true);
    setDone(false);
    setTimeout(() => {
      setBusy(false);
      setDone(true);
      toast.success(`Upscaled ${scale}x successfully`);
    }, 1600);
  }

  function onMove(clientX: number, rect: DOMRect) {
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }

  return (
    <AppShell>
      <div className="container py-8 lg:py-12">
        <ToolHeader
          eyebrow="Tools / Enhance"
          title="Upscale to 4K"
          subtitle="Diffusion-powered upscaling with face enhancement and detail recovery."
          badge="Pro"
        />

        <ToolShell
          controls={
            <div className="space-y-5">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Image
                </Label>
                <div className="mt-2">
                  <Dropzone
                    file={file}
                    onFile={setFile}
                    hint="Up to 4096×4096 input — JPG, PNG, WebP"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Scale factor
                </Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {[2, 4].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setScale(s as 2 | 4)}
                      className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${
                        scale === s
                          ? "border-primary bg-primary/10"
                          : "border-border/60 text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {s}x
                      <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                        {s === 4 ? "4K" : "HD"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2.5">
                <div>
                  <p className="text-sm font-medium">Enhance faces</p>
                  <p className="text-xs text-muted-foreground">Restore skin & eyes</p>
                </div>
                <Switch checked={faces} onCheckedChange={setFaces} />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Denoise
                  </Label>
                  <span className="font-mono text-xs">{denoise}%</span>
                </div>
                <Slider
                  value={[denoise]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(v) => setDenoise(v[0])}
                  className="mt-3"
                />
              </div>

              <Button onClick={run} disabled={busy || !file} className="w-full gap-2" size="lg">
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                {busy ? "Upscaling…" : `Upscale ${scale}x`}
              </Button>
            </div>
          }
          preview={
            <div className="space-y-4">
              {!url ? (
                <EmptyCanvas
                  icon={ImageUp}
                  title="Drop an image to upscale"
                  hint="We'll compare the original and the 4K result side by side."
                />
              ) : (
                <div
                  className="relative aspect-video w-full select-none overflow-hidden rounded-3xl border border-border/60 bg-muted"
                  onMouseDown={(e) => {
                    dragging.current = true;
                    onMove(e.clientX, e.currentTarget.getBoundingClientRect());
                  }}
                  onMouseMove={(e) => {
                    if (!dragging.current) return;
                    onMove(e.clientX, e.currentTarget.getBoundingClientRect());
                  }}
                  onMouseUp={() => (dragging.current = false)}
                  onMouseLeave={() => (dragging.current = false)}
                  onTouchStart={(e) => {
                    dragging.current = true;
                    onMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
                  }}
                  onTouchMove={(e) => {
                    if (!dragging.current) return;
                    onMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
                  }}
                  onTouchEnd={() => (dragging.current = false)}
                >
                  <img
                    src={url}
                    alt="Original"
                    className="absolute inset-0 h-full w-full object-cover blur-[1px] brightness-95"
                  />
                  <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
                    <img
                      src={url}
                      alt="Upscaled"
                      className="h-full w-[100vw] max-w-none object-cover"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-y-0"
                    style={{ left: `${pos}%` }}
                  >
                    <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-white/90 shadow-[0_0_20px_rgba(0,0,0,0.5)]" />
                    <div className="absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-white/90 text-foreground shadow-lg">
                      ⇆
                    </div>
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest backdrop-blur">
                    Original
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-primary-foreground">
                    {scale}x {done ? "Done" : "Preview"}
                  </span>
                  {busy ? (
                    <div className="absolute inset-0 grid place-items-center bg-background/60 backdrop-blur-sm">
                      <div className="text-center">
                        <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                        <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          Upscaling {scale}x
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {file ? (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card/40 px-4 py-3 text-xs">
                  <div className="flex flex-wrap gap-x-5 gap-y-1">
                    <span>
                      <span className="text-muted-foreground">File · </span>
                      {file.name}
                    </span>
                    <span>
                      <span className="text-muted-foreground">Size · </span>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <span>
                      <span className="text-muted-foreground">Output · </span>up to{" "}
                      {scale === 4 ? "3840×2160" : "1920×1080"}
                    </span>
                  </div>
                  {done ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Button size="sm" className="gap-2">
                        <Download className="h-4 w-4" /> Download
                      </Button>
                    </motion.div>
                  ) : null}
                </div>
              ) : null}
            </div>
          }
          footer={
            <RecentStrip
              items={[
                { id: "1", title: "portrait_01", meta: "4x • 3840×2160" },
                { id: "2", title: "landscape_03", meta: "4x • 3840×2160" },
                { id: "3", title: "logo_export", meta: "2x • 2048×2048" },
              ]}
            />
          }
        />
      </div>
    </AppShell>
  );
}
