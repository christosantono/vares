/**
 * Single source of truth for image aspect ratios.
 * Used by the UI picker, Zustand store, server validation, and AI gateway dimension hints.
 */

export const ASPECT_RATIOS = ["1:1", "16:9", "9:16", "4:3", "3:4", "21:9"] as const;
export type AspectRatio = (typeof ASPECT_RATIOS)[number];

export type AspectRatioSpec = {
  ratio: AspectRatio;
  width: number;
  height: number;
  label: string;
  /** CSS `aspect-ratio` value */
  css: string;
};

export const ASPECT_RATIO_SPECS: Record<AspectRatio, AspectRatioSpec> = {
  "1:1": { ratio: "1:1", width: 1024, height: 1024, label: "Square", css: "1 / 1" },
  "16:9": { ratio: "16:9", width: 1536, height: 864, label: "Widescreen", css: "16 / 9" },
  "9:16": { ratio: "9:16", width: 864, height: 1536, label: "Portrait", css: "9 / 16" },
  "4:3": { ratio: "4:3", width: 1280, height: 960, label: "Standard", css: "4 / 3" },
  "3:4": { ratio: "3:4", width: 960, height: 1280, label: "Tall", css: "3 / 4" },
  "21:9": { ratio: "21:9", width: 1792, height: 768, label: "Ultrawide", css: "21 / 9" },
};

export function getAspectSpec(ratio: AspectRatio): AspectRatioSpec {
  return ASPECT_RATIO_SPECS[ratio];
}

export function isAspectRatio(value: unknown): value is AspectRatio {
  return typeof value === "string" && (ASPECT_RATIOS as readonly string[]).includes(value);
}
