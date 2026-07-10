import { api } from "./client";
import type { Generation } from "./types";
import type { AspectRatio } from "@/utils/aspectRatio";

export function generateImage(input: {
  prompt: string;
  negative_prompt?: string | null;
  aspect_ratio: AspectRatio;
  seed?: number | null;
  cfg?: number | null;
  nsfw?: boolean;
  is_public?: boolean;
  model?: string;
}) {
  return api<Generation>("/api/generations", { method: "POST", body: input });
}

export function listMyGenerations(input: { limit?: number; favoritesOnly?: boolean } = {}) {
  const params = new URLSearchParams();
  if (input.limit) params.set("limit", String(input.limit));
  if (input.favoritesOnly) params.set("favoritesOnly", "true");
  const suffix = params.toString() ? `?${params}` : "";
  return api<Generation[]>(`/api/generations${suffix}`);
}

export function toggleFavorite(input: { id: string; value: boolean }) {
  return api<Generation>(`/api/generations/${input.id}/favorite`, {
    method: "PATCH",
    body: { value: input.value },
  });
}

export function togglePublic(input: { id: string; value: boolean }) {
  return api<Generation>(`/api/generations/${input.id}/public`, {
    method: "PATCH",
    body: { value: input.value },
  });
}

export function deleteGeneration(input: { id: string }) {
  return api<{ ok: true }>(`/api/generations/${input.id}`, { method: "DELETE" });
}
