import { create } from "zustand";

import { type AspectRatio } from "@/utils/aspectRatio";

export type { AspectRatio };

type GeneratorState = {
  prompt: string;
  negativePrompt: string;
  aspectRatio: AspectRatio;
  cfg: number;
  seed: number | null;
  model: string;
  nsfw: boolean;
  isPublic: boolean;
  setPrompt: (v: string) => void;
  setNegative: (v: string) => void;
  setAspect: (v: AspectRatio) => void;
  setCfg: (v: number) => void;
  setSeed: (v: number | null) => void;
  setModel: (v: string) => void;
  setNsfw: (v: boolean) => void;
  setPublic: (v: boolean) => void;
  loadFrom: (g: Partial<GeneratorState>) => void;
};

export const useGenerator = create<GeneratorState>((set) => ({
  prompt: "",
  negativePrompt: "",
  aspectRatio: "1:1",
  cfg: 7,
  seed: null,
  model: "black-forest-labs/FLUX.1-dev",
  nsfw: false,
  isPublic: false,
  setPrompt: (v) => set({ prompt: v }),
  setNegative: (v) => set({ negativePrompt: v }),
  setAspect: (v) => set({ aspectRatio: v }),
  setCfg: (v) => set({ cfg: v }),
  setSeed: (v) => set({ seed: v }),
  setModel: (v) => set({ model: v }),
  setNsfw: (v) => set({ nsfw: v }),
  setPublic: (v) => set({ isPublic: v }),
  loadFrom: (g) => set((s) => ({ ...s, ...g })),
}));
