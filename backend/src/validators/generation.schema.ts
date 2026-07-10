import { z } from "zod";

export const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4", "21:9"] as const;

export const aspectSpecs: Record<(typeof aspectRatios)[number], { width: number; height: number; label: string }> = {
  "1:1": { width: 1024, height: 1024, label: "Square" },
  "16:9": { width: 1536, height: 864, label: "Widescreen" },
  "9:16": { width: 864, height: 1536, label: "Portrait" },
  "4:3": { width: 1280, height: 960, label: "Standard" },
  "3:4": { width: 960, height: 1280, label: "Tall" },
  "21:9": { width: 1792, height: 768, label: "Ultrawide" },
};

export const generateImageSchema = z.object({
  prompt: z.string().trim().min(3).max(2000),
  negative_prompt: z.string().trim().max(1000).nullable().optional(),
  aspect_ratio: z.enum(aspectRatios).default("1:1"),
  seed: z.number().int().nullable().optional(),
  cfg: z.number().min(0).max(20).nullable().optional(),
  nsfw: z.boolean().default(false),
  is_public: z.boolean().default(false),
  model: z.string().trim().min(1).max(200).default("black-forest-labs/FLUX.1-dev"),
});

export const listGenerationsSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  favoritesOnly: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => value === "true"),
});

export const booleanPatchSchema = z.object({
  value: z.boolean(),
});
