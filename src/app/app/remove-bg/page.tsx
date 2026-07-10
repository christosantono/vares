"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Loader2, Scissors, Wand2 } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolHeader, ToolShell, Dropzone, EmptyCanvas, RecentStrip } from "@/features/tools";

type Mode = "transparent" | "solid" | "blur";

const SOLID_COLORS = ["#ffffff", "#0f172a", "#f43f5e", "#22c55e", "#3b82f6", "#facc15"];

export default function RemoveBgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("transparent");
  const [color, setColor] = useState(SOLID_COLORS[1]);
  const [refine, setRefine] = useState(50);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

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
      toast.success("Background removed");
    }, 1500);
  }

  const checker =
    "conic-gradient(hsl(var(--muted)) 0 25%, transparent 0 50%, hsl(var(--muted)) 0 75%, transparent 0) 0 0/24px 24px";

  const bgStyle =
    mode === "transparent"
      ? { background: checker, backgroundColor: "hsl(var(--background))" }
      : mode === "solid"
        ? { background: color }
        : { background: `url(${url}) center/cover`, filter: undefined };

  return (
    <AppShell>
      <div className="container py-8 lg:py-12">
        <ToolHeader
          eyebrow="Tools / Edit"
          title="Remove Background"
          subtitle="One-click cutouts with refined edges — drop a solid, blur, or transparent backdrop."
          badge="Beta"
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
                    hint="Portraits, products, logos — best results under 4K"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Background
                </Label>
                <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="mt-2">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="transparent">Transparent</TabsTrigger>
                    <TabsTrigger value="solid">Solid</TabsTrigger>
                    <TabsTrigger value="blur">Blur</TabsTrigger>
                  </TabsList>
                </Tabs>

                {mode === "solid" ? (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {SOLID_COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className={`h-8 w-8 rounded-full border-2 transition ${color === c ? "border-primary scale-110" : "border-border/60"}`}
                        style={{ background: c }}
                        aria-label={c}
                      />
                    ))}
                    <label className="ml-1 inline-flex h-8 cursor-pointer items-center rounded-full border border-dashed border-border/60 px-3 text-xs text-muted-foreground hover:border-primary/60">
                      Custom
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="sr-only"
                      />
                    </label>
                  </div>
                ) : null}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Edge refinement
                  </Label>
                  <span className="font-mono text-xs">{refine}</span>
                </div>
                <Slider
                  value={[refine]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(v) => setRefine(v[0])}
                  className="mt-3"
                />
              </div>

              <Button onClick={run} disabled={busy || !file} className="w-full gap-2" size="lg">
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                {busy ? "Cutting out…" : "Remove background"}
              </Button>
            </div>
          }
          preview={
            <div className="space-y-4">
              {!url ? (
                <EmptyCanvas
                  icon={Scissors}
                  title="Your cutout will appear here"
                  hint="Drop an image, pick a backdrop, and remove its background in one click."
                />
              ) : (
                <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border/60">
                  <div className="absolute inset-0" style={bgStyle as React.CSSProperties} />
                  {mode === "blur" ? <div className="absolute inset-0 backdrop-blur-2xl" /> : null}
                  <AnimatePresence>
                    {busy ? (
                      <motion.div
                        key="busy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 grid place-items-center bg-background/60 backdrop-blur-sm"
                      >
                        <div className="text-center">
                          <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                          <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                            Detecting subject
                          </p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                  <motion.img
                    key={url + String(done)}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={url}
                    alt="Subject"
                    className={`absolute inset-0 h-full w-full object-contain ${done ? "drop-shadow-2xl" : ""}`}
                    style={done ? { filter: `contrast(${1 + refine / 500})` } : undefined}
                  />
                </div>
              )}

              {done ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  <Button className="gap-2">
                    <Download className="h-4 w-4" /> Download PNG
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> Download JPG
                  </Button>
                </motion.div>
              ) : null}
            </div>
          }
          footer={
            <RecentStrip
              items={[
                { id: "1", title: "product_shot_02", meta: "PNG • 2048×2048" },
                { id: "2", title: "headshot_lina", meta: "PNG • 1600×1600" },
                { id: "3", title: "sneaker_white", meta: "PNG • 2400×2400" },
              ]}
            />
          }
        />
      </div>
    </AppShell>
  );
}
