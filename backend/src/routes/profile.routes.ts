import { Router } from "express";
import { Profile } from "../models/Profile.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";
import { avatarUploadSchema, updateProfileSchema } from "../validators/auth.schema.js";
import { assertFound } from "../utils/httpError.js";
import { deleteImage, uploadImageBuffer } from "../services/cloudinary.service.js";

export const profileRouter = Router();

function serializeProfile(profile: any) {
  return {
    id: String(profile.userId),
    display_name: profile.displayName,
    handle: profile.handle,
    bio: profile.bio,
    avatar_url: profile.avatarUrl,
    gender: profile.gender,
    gender_public: profile.genderPublic,
  };
}

profileRouter.use(requireAuth);

profileRouter.get("/me", async (req, res, next) => {
  try {
    const { user } = req as AuthedRequest;
    const profile = assertFound(await Profile.findOne({ userId: user.objectId }), "Profile not found");
    res.json(serializeProfile(profile));
  } catch (error) {
    next(error);
  }
});

profileRouter.patch("/me", async (req, res, next) => {
  try {
    const { user } = req as AuthedRequest;
    const data = updateProfileSchema.parse(req.body);
    const patch: Record<string, unknown> = {};
    if (data.display_name !== undefined) patch.displayName = data.display_name;
    if (data.bio !== undefined) patch.bio = data.bio;
    if (data.gender !== undefined) patch.gender = data.gender;
    if (data.gender_public !== undefined) patch.genderPublic = data.gender_public;

    const profile = assertFound(
      await Profile.findOneAndUpdate({ userId: user.objectId }, patch, { new: true }),
      "Profile not found",
    );
    res.json(serializeProfile(profile));
  } catch (error) {
    next(error);
  }
});

profileRouter.post("/avatar", async (req, res, next) => {
  try {
    const { user } = req as AuthedRequest;
    const data = avatarUploadSchema.parse(req.body);
    const match = data.data_url.match(/^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/);
    if (!match) throw new Error("Invalid image data URL");

    const profile = assertFound(await Profile.findOne({ userId: user.objectId }), "Profile not found");
    const buffer = Buffer.from(match[2], "base64");
    const uploaded = await uploadImageBuffer(buffer, `zenivra/avatars/${user.id}`);
    await deleteImage(profile.avatarPublicId);

    profile.avatarUrl = uploaded.secure_url;
    profile.avatarPublicId = uploaded.public_id;
    await profile.save();

    res.json({ url: profile.avatarUrl });
  } catch (error) {
    next(error);
  }
});
