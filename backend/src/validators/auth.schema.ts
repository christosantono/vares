import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(320),
  password: z.string().min(8).max(200),
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(320),
  password: z.string().min(1).max(200),
});

export const updateProfileSchema = z.object({
  display_name: z.string().trim().min(1).max(80).optional(),
  bio: z.string().trim().max(500).nullable().optional(),
  gender: z.enum(["male", "female", "non-binary", "prefer not to say"]).nullable().optional(),
  gender_public: z.boolean().optional(),
});

export const avatarUploadSchema = z.object({
  data_url: z.string().startsWith("data:image/").max(8_000_000),
  ext: z.enum(["png", "jpg", "jpeg", "webp"]).default("png"),
});
