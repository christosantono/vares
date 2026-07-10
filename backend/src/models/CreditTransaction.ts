import mongoose, { Schema, model, Types, type InferSchemaType } from "mongoose";

const creditTransactionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    delta: { type: Number, required: true },
    reason: { type: String, required: true },
    generationId: { type: Schema.Types.ObjectId, ref: "Generation", default: null },
    balanceAfter: { type: Number, required: true },
  },
  { timestamps: true },
);

export type CreditTransactionDocument = InferSchemaType<typeof creditTransactionSchema> & {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
};

export const CreditTransaction =
  mongoose.models.CreditTransaction || model("CreditTransaction", creditTransactionSchema);
