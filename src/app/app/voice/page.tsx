"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Download, Loader2, Mic, Pause, Play, Wand2 } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ToolHeader, ToolShell, EmptyCanvas, RecentStrip } from "@/features/tools";

const VOICES = [
  { id: "ava", name: "Ava", tag: "Warm • EN-US", grad: "linear-gradient(135deg,#f472b6,#a855f7)" },
  {
    id: "milo",
    name: "Milo",
    tag: "Bright • EN-GB",
    grad: "linear-gradient(135deg,#38bdf8,#6366f1)",
  },
  { id: "sora", name: "Sora", tag: "Calm • JA", grad: "linear-gradient(135deg,#34d399,#0ea5e9)" },
  { id: "leo", name: "Leo", tag: "Deep • EN-US", grad: "linear-gradient(135deg,#f97316,#ef4444)" },
  {
    id: "nova",
    name: "Nova",
    tag: "Crisp • EN-AU",
    grad: "linear-gradient(135deg,#facc15,#f97316)",
  },
  { id: "kai", name: "Kai", tag: "Soft • DE", grad: "linear-gradient(135deg,#a78bfa,#22d3ee)" },
];

const STYLES = ["Narration", "Conversational", "Cheerful", "Calm"] as const;

export default function VoicePage() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("ava");
  const [style, setStyle] = useState<(typeof STYLES)[number]>("Narration");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(0);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  const MAX = 5000;

  function run() {
    if (!text.trim()) return toast.error("Enter some text to speak");
    setBusy(true);
    setReady(false);
    setPlaying(false);
    setTimeout(() => {
      setBusy(false);
      setReady(true);
      toast.success("Voiceover ready");
    }, 1500);
  }

  return (
    <AppShell>
      <div className="container py-8 lg:py-12">
        <ToolHeader
          eyebrow="Tools / Audio"
          title="Text to Voice"
          subtitle="Generate natural, studio-grade voiceovers in seconds — pick a voice, set the mood."
          badge="Beta"
        />

        <ToolShell
          controls={
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Script
                  </Label>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {text.length}/{MAX}
                  </span>
                </div>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX))}
                  placeholder="Welcome to Zenivra. Today we'll explore what creative AI can do…"
                  className="mt-2 min-h-40 resize-none"
                />
              </div>

              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Style
                </Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {STYLES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        style === s
                          ? "border-primary bg-primary/10"
                          : "border-border/60 text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Speed
                  </Label>
                  <span className="font-mono text-xs">{speed.toFixed(2)}x</span>
                </div>
                <Slider
                  value={[speed]}
                  min={0.5}
                  max={2}
                  step={0.05}
                  onValueChange={(v) => setSpeed(v[0])}
                  className="mt-3"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Pitch
                  </Label>
                  <span className="font-mono text-xs">{pitch > 0 ? `+${pitch}` : pitch}</span>
                </div>
                <Slider
                  value={[pitch]}
                  min={-6}
                  max={6}
                  step={1}
                  onValueChange={(v) => setPitch(v[0])}
                  className="mt-3"
                />
              </div>

              <Button onClick={run} disabled={busy} className="w-full gap-2" size="lg">
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                {busy ? "Synthesizing…" : "Generate voiceover"}
              </Button>
            </div>
          }
          preview={
            <div className="space-y-6">
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Voice
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {VOICES.map((v) => {
                    const active = voice === v.id;
                    return (
                      <motion.button
                        key={v.id}
                        type="button"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setVoice(v.id)}
                        className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition-colors ${
                          active
                            ? "border-primary bg-primary/5"
                            : "border-border/60 hover:border-primary/50"
                        }`}
                      >
                        <div className="h-16 w-full rounded-xl" style={{ background: v.grad }} />
                        <div className="mt-3 flex items-center justify-between">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">{v.name}</p>
                            <p className="truncate text-[10px] text-muted-foreground">{v.tag}</p>
                          </div>
                          <span
                            className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] ${
                              active
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border"
                            }`}
                          >
                            {active ? "✓" : ""}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-border/60 bg-card/40 p-5 sm:p-6">
                {ready ? (
                  <div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setPlaying((p) => !p)}
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105"
                      >
                        {playing ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5 translate-x-0.5" />
                        )}
                      </button>
                      <div className="flex h-12 flex-1 items-center gap-[3px]">
                        {Array.from({ length: 56 }).map((_, i) => (
                          <motion.span
                            key={i}
                            className="flex-1 rounded-full bg-primary/70"
                            animate={
                              playing
                                ? {
                                    height: [
                                      `${20 + ((i * 37) % 60)}%`,
                                      `${40 + ((i * 91) % 60)}%`,
                                      `${20 + ((i * 37) % 60)}%`,
                                    ],
                                  }
                                : { height: "30%" }
                            }
                            transition={{
                              duration: 0.9 + (i % 5) * 0.07,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <p className="font-mono text-xs text-muted-foreground">
                        {VOICES.find((v) => v.id === voice)?.name} • {style} • {speed.toFixed(2)}x
                      </p>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" /> MP3
                      </Button>
                    </div>
                  </div>
                ) : busy ? (
                  <div className="grid h-32 place-items-center">
                    <div className="text-center">
                      <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                      <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        Synthesizing voice
                      </p>
                    </div>
                  </div>
                ) : (
                  <EmptyCanvas
                    icon={Mic}
                    title="Your audio will appear here"
                    hint="Write a script and hit generate to hear it."
                    aspect="aspect-[16/6]"
                  />
                )}
              </div>
            </div>
          }
          footer={
            <RecentStrip
              items={[
                {
                  id: "1",
                  title: "Onboarding intro",
                  meta: "Ava • 0:38",
                  tone: "linear-gradient(135deg,#f472b6,#a855f7)",
                },
                {
                  id: "2",
                  title: "Product demo",
                  meta: "Milo • 1:12",
                  tone: "linear-gradient(135deg,#38bdf8,#6366f1)",
                },
                {
                  id: "3",
                  title: "Podcast cold open",
                  meta: "Leo • 0:22",
                  tone: "linear-gradient(135deg,#f97316,#ef4444)",
                },
              ]}
            />
          }
        />
      </div>
    </AppShell>
  );
}
