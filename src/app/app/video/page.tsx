"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clapperboard, Download, Loader2, Play, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ToolHeader, ToolShell, Dropzone, EmptyCanvas, RecentStrip } from "@/features/tools";

const RATIOS = ["16:9", "9:16", "1:1", "21:9"] as const;
type Ratio = (typeof RATIOS)[number];

const ratioClass: Record<Ratio, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16] max-w-sm mx-auto",
  "1:1": "aspect-square max-w-xl mx-auto",
  "21:9": "aspect-[21/9]",
};

export default function VideoPage() {
  const [prompt, setPrompt] = useState("");
  const [negative, setNegative] = useState("");
  const [ratio, setRatio] = useState<Ratio>("16:9");
  const [duration, setDuration] = useState(5);
  const [hd, setHd] = useState(true);
  const [fixedCam, setFixedCam] = useState(false);
  const [frame, setFrame] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  function run() {
    if (!prompt.trim()) return toast.error("Add a prompt to describe the clip");
    setBusy(true);
    setDone(false);
    setTimeout(() => {
      setBusy(false);
      setDone(true);
      toast.success("Preview ready — production rendering ships soon");
    }, 1800);
  }

  return (
    <AppShell>
      <div className="container py-8 lg:py-12">
        <ToolHeader
          eyebrow="Tools / Motion"
          title="Text to Video"
          subtitle="Direct cinematic clips with prompts, starting frames, and camera control."
          badge="Beta"
        />

        <ToolShell
          controls={
            <div className="space-y-5">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Prompt
                </Label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A neon-lit street at night, slow dolly forward, rain reflecting signage…"
                  className="mt-2 min-h-28 resize-none"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Negative prompt
                </Label>
                <Textarea
                  value={negative}
                  onChange={(e) => setNegative(e.target.value)}
                  placeholder="blurry, distorted faces, watermark"
                  className="mt-2 min-h-16 resize-none"
                />
              </div>

              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Aspect ratio
                </Label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {RATIOS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRatio(r)}
                      className={`rounded-xl border px-2 py-2 text-xs font-medium transition-colors ${
                        ratio === r
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border/60 text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Duration
                  </Label>
                  <span className="font-mono text-xs">{duration}s</span>
                </div>
                <Slider
                  value={[duration]}
                  min={2}
                  max={10}
                  step={1}
                  onValueChange={(v) => setDuration(v[0])}
                  className="mt-3"
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2.5">
                <div>
                  <p className="text-sm font-medium">1080p HD</p>
                  <p className="text-xs text-muted-foreground">Otherwise 720p draft</p>
                </div>
                <Switch checked={hd} onCheckedChange={setHd} />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2.5">
                <div>
                  <p className="text-sm font-medium">Fixed camera</p>
                  <p className="text-xs text-muted-foreground">Lock to a static shot</p>
                </div>
                <Switch checked={fixedCam} onCheckedChange={setFixedCam} />
              </div>

              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Starting frame (optional)
                </Label>
                <div className="mt-2">
                  <Dropzone
                    file={frame}
                    onFile={setFrame}
                    hint="Drives the first frame of the clip"
                  />
                </div>
              </div>

              <Button onClick={run} disabled={busy} className="w-full gap-2" size="lg">
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                {busy ? "Rendering preview…" : "Generate video"}
              </Button>
            </div>
          }
          preview={
            <div className="space-y-4">
              <div
                className={`relative overflow-hidden rounded-3xl border border-border/60 ${ratioClass[ratio]}`}
              >
                <AnimatePresence mode="wait">
                  {busy ? (
                    <motion.div
                      key="busy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 via-muted to-primary/10"
                    >
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="text-center">
                          <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                          <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                            Rendering {duration}s • {hd ? "1080p" : "720p"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : done ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-fuchsia-900"
                    >
                      <div className="absolute inset-0 grid place-items-center">
                        <button className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-slate-900 shadow-2xl transition hover:scale-105">
                          <Play className="h-7 w-7 translate-x-0.5 fill-current" />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/80">
                        <span className="font-mono">{duration}.00</span>
                        <span className="font-mono">
                          {ratio} • {hd ? "1080p" : "720p"}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0"
                    >
                      <EmptyCanvas
                        icon={Clapperboard}
                        title="Your clip will preview here"
                        hint="Describe the shot, optionally drop a starting frame, then hit generate."
                        aspect="absolute inset-0"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {done ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  <Button variant="default" className="gap-2">
                    <Download className="h-4 w-4" /> Download MP4
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={run}>
                    <Sparkles className="h-4 w-4" /> Variation
                  </Button>
                </motion.div>
              ) : null}
            </div>
          }
          footer={
            <RecentStrip
              items={[
                {
                  id: "1",
                  title: "Neon street dolly",
                  meta: "6s • 1080p",
                  tone: "linear-gradient(135deg,#1e1b4b,#9333ea)",
                },
                {
                  id: "2",
                  title: "Forest fly-over",
                  meta: "5s • 1080p",
                  tone: "linear-gradient(135deg,#064e3b,#10b981)",
                },
                {
                  id: "3",
                  title: "Sunset coast",
                  meta: "8s • 1080p",
                  tone: "linear-gradient(135deg,#7c2d12,#fb923c)",
                },
                {
                  id: "4",
                  title: "Tokyo crossing",
                  meta: "5s • 720p",
                  tone: "linear-gradient(135deg,#0c4a6e,#22d3ee)",
                },
              ]}
            />
          }
        />
      </div>
    </AppShell>
  );
}
