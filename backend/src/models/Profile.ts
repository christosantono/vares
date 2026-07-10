import mongoose, { Schema, model, Types, type InferSchemaType } from "mongoose";

const profileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    displayName: { type: String, required: true, trim: true, maxlength: 80 },
    handle: { type: String, required: true, trim: true, lowercase: true, maxlength: 80 },
    bio: { type: String, default: null, maxlength: 500 },
    avatarUrl: { type: String, default: null },
    avatarPublicId: { type: String, default: null },
    gender: { type: String, default: null },
    genderPublic: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    nsfwEnabled: { type: Boolean, default: false },
    theme: { type: String, default: "system" },
  },
  { timestamps: true },
);

export type ProfileDocument = InferSchemaType<typeof profileSchema> & {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
};

export const Profile = mongoose.models.Profile || model("Profile", profileSchema);
