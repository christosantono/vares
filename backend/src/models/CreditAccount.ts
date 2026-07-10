import mongoose, { Schema, model, Types, type InferSchemaType } from "mongoose";

const creditAccountSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    balance: { type: Number, required: true },
    dailyAllowance: { type: Number, required: true },
    dailyResetAt: { type: Date, required: true },
    plan: { type: String, default: "free" },
  },
  { timestamps: true },
);

export type CreditAccountDocument = InferSchemaType<typeof creditAccountSchema> & {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
};

export const CreditAccount = mongoose.models.CreditAccount || model("CreditAccount", creditAccountSchema);
