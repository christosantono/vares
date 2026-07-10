import { api } from "./client";
import type { Profile } from "./types";

export function getMyProfile() {
  return api<Profile>("/api/profile/me");
}

export function updateProfile(input: {
  display_name?: string;
  bio?: string | null;
  gender?: string | null;
  gender_public?: boolean;
}) {
  return api<Profile>("/api/profile/me", { method: "PATCH", body: input });
}

export function uploadAvatar(input: { data_url: string; ext: "png" | "jpg" | "jpeg" | "webp" }) {
  return api<{ url: string }>("/api/profile/avatar", { method: "POST", body: input });
}
