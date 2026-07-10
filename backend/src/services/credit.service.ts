import type { Types } from "mongoose";
import { env } from "../config/env.js";
import { CreditAccount } from "../models/CreditAccount.js";
import { CreditTransaction } from "../models/CreditTransaction.js";
import { HttpError, assertFound } from "../utils/httpError.js";

const DAY_MS = 24 * 60 * 60 * 1000;

export function nextDailyReset(from = new Date()) {
  return new Date(from.getTime() + DAY_MS);
}

export async function createCreditAccount(userId: Types.ObjectId) {
  return CreditAccount.create({
    userId,
    balance: env.DAILY_CREDIT_ALLOWANCE,
    dailyAllowance: env.DAILY_CREDIT_ALLOWANCE,
    dailyResetAt: nextDailyReset(),
    plan: "free",
  });
}

export async function refreshDailyCredits(userId: Types.ObjectId) {
  const account = assertFound(await CreditAccount.findOne({ userId }), "Credit account not found");
  if (account.dailyResetAt.getTime() > Date.now()) return account;

  account.balance = Math.max(account.balance, account.dailyAllowance);
  account.dailyResetAt = nextDailyReset();
  await account.save();
  return account;
}

export async function getCreditBalance(userId: Types.ObjectId) {
  return refreshDailyCredits(userId);
}

export async function assertCanSpend(userId: Types.ObjectId, amount: number) {
  const account = await refreshDailyCredits(userId);
  if (account.balance < amount) {
    throw new HttpError(402, `Not enough credits. You have ${account.balance}, need ${amount}.`);
  }
  return account;
}

export async function spendCredits(opts: {
  userId: Types.ObjectId;
  amount: number;
  generationId: Types.ObjectId;
}) {
  await refreshDailyCredits(opts.userId);
  const account = await CreditAccount.findOneAndUpdate(
    { userId: opts.userId, balance: { $gte: opts.amount } },
    { $inc: { balance: -opts.amount } },
    { new: true },
  );
  if (!account) {
    throw new HttpError(402, "Not enough credits.");
  }

  await CreditTransaction.create({
    userId: opts.userId,
    delta: -opts.amount,
    reason: "image_generation",
    generationId: opts.generationId,
    balanceAfter: account.balance,
  });

  return account;
}
