import mongoose, { Schema, model, Types, type InferSchemaType } from "mongoose";

const generationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    prompt: { type: String, required: true, maxlength: 2000 },
    negativePrompt: { type: String, default: null, maxlength: 1000 },
    model: { type: String, required: true },
    aspectRatio: { type: String, required: true },
    seed: { type: Number, default: null },
    cfg: { type: Number, default: null },
    nsfw: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String, required: true },
    isFavorite: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    creditsSpent: { type: Number, required: true },
  },
  { timestamps: true },
);

export type GenerationDocument = InferSchemaType<typeof generationSchema> & {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
};

export const Generation = mongoose.models.Generation || model("Generation", generationSchema);
