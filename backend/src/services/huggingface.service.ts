import { InferenceClient } from "@huggingface/inference";
import { env } from "../config/env.js";
import { aspectSpecs, type aspectRatios } from "../validators/generation.schema.js";

const client = new InferenceClient(env.HF_TOKEN);

export async function generateImageWithHuggingFace(opts: {
  prompt: string;
  negativePrompt?: string | null;
  model: string;
  aspectRatio: (typeof aspectRatios)[number];
  seed?: number | null;
  cfg?: number | null;
}) {
  const spec = aspectSpecs[opts.aspectRatio];
  const result = await client.textToImage({
    provider: "replicate", // ya "wavespeed"
    model: opts.model,
    inputs: opts.prompt,
    parameters: {
      negative_prompt: opts.negativePrompt ?? undefined,
      width: spec.width,
      height: spec.height,
      seed: opts.seed ?? undefined,
      guidance_scale: opts.cfg ?? undefined,
    },
  });

  const blob = result as unknown as Blob;
  const arrayBuffer = await blob.arrayBuffer();
  const contentType = blob.type || "image/png";
  return { buffer: Buffer.from(arrayBuffer), contentType };
}
