import { Router } from "express";
import { env } from "../config/env.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";
import { generationRateLimit } from "../middleware/rateLimit.js";
import { Generation } from "../models/Generation.js";
import { assertCanSpend, spendCredits } from "../services/credit.service.js";
import { deleteImage, uploadImageBuffer } from "../services/cloudinary.service.js";
import { generateImageWithHuggingFace } from "../services/huggingface.service.js";
import { booleanPatchSchema, generateImageSchema, listGenerationsSchema } from "../validators/generation.schema.js";
import { assertFound, HttpError } from "../utils/httpError.js";

export const generationRouter = Router();

function serializeGeneration(g: any) {
  return {
    id: String(g._id),
    prompt: g.prompt,
    negative_prompt: g.negativePrompt,
    model: g.model,
    aspect_ratio: g.aspectRatio,
    seed: g.seed,
    cfg: g.cfg,
    nsfw: g.nsfw,
    image_url: g.imageUrl,
    is_favorite: g.isFavorite,
    is_public: g.isPublic,
    credits_spent: g.creditsSpent,
    created_at: g.createdAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

generationRouter.use(requireAuth);

generationRouter.get("/", async (req, res, next) => {
  try {
    const { user } = req as AuthedRequest;
    const query = listGenerationsSchema.parse(req.query);
    const filter: Record<string, unknown> = { userId: user.objectId };
    if (query.favoritesOnly) filter.isFavorite = true;
    const rows = await Generation.find(filter).sort({ createdAt: -1 }).limit(query.limit);
    res.json(rows.map(serializeGeneration));
  } catch (error) {
    next(error);
  }
});

generationRouter.post("/", generationRateLimit, async (req, res, next) => {
  try {
    const { user } = req as AuthedRequest;
    const data = generateImageSchema.parse(req.body);
    await assertCanSpend(user.objectId, env.CREDITS_PER_IMAGE);

    const generated = await generateImageWithHuggingFace({
      prompt: data.prompt,
      negativePrompt: data.negative_prompt,
      model: data.model,
      aspectRatio: data.aspect_ratio,
      seed: data.seed,
      cfg: data.cfg,
    });

    const uploaded = await uploadImageBuffer(generated.buffer, `zenivra/generations/${user.id}`);
    const doc = await Generation.create({
      userId: user.objectId,
      prompt: data.prompt,
      negativePrompt: data.negative_prompt ?? null,
      model: data.model,
      aspectRatio: data.aspect_ratio,
      seed: data.seed ?? null,
      cfg: data.cfg ?? null,
      nsfw: data.nsfw,
      imageUrl: uploaded.secure_url,
      cloudinaryPublicId: uploaded.public_id,
      isPublic: data.is_public,
      creditsSpent: env.CREDITS_PER_IMAGE,
    });

    try {
      await spendCredits({ userId: user.objectId, amount: env.CREDITS_PER_IMAGE, generationId: doc._id });
    } catch (error) {
      await Promise.all([
        Generation.deleteOne({ _id: doc._id }),
        deleteImage(uploaded.public_id),
      ]);
      throw error;
    }
    res.status(201).json(serializeGeneration(doc));
  } catch (error) {
    next(error);
  }
});

generationRouter.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { user } = req as AuthedRequest;
    const data = booleanPatchSchema.parse(req.body);
    const doc = assertFound(
      await Generation.findOneAndUpdate(
        { _id: req.params.id, userId: user.objectId },
        { isFavorite: data.value },
        { new: true },
      ),
      "Generation not found",
    );
    res.json(serializeGeneration(doc));
  } catch (error) {
    next(error);
  }
});

generationRouter.patch("/:id/public", async (req, res, next) => {
  try {
    const { user } = req as AuthedRequest;
    const data = booleanPatchSchema.parse(req.body);
    const doc = assertFound(
      await Generation.findOneAndUpdate(
        { _id: req.params.id, userId: user.objectId },
        { isPublic: data.value },
        { new: true },
      ),
      "Generation not found",
    );
    res.json(serializeGeneration(doc));
  } catch (error) {
    next(error);
  }
});

generationRouter.delete("/:id", async (req, res, next) => {
  try {
    const { user } = req as AuthedRequest;
    const doc = assertFound(await Generation.findOneAndDelete({ _id: req.params.id, userId: user.objectId }), "Generation not found");
    await deleteImage(doc.cloudinaryPublicId);
    res.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") return next(new HttpError(404, "Generation not found"));
    next(error);
  }
});
