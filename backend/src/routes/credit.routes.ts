import { Router } from "express";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";
import { getCreditBalance } from "../services/credit.service.js";
import { Generation } from "../models/Generation.js";

export const creditRouter = Router();
export const dashboardRouter = Router();

function serializeCredits(account: any) {
  return {
    balance: account.balance,
    daily_allowance: account.dailyAllowance,
    plan: account.plan,
    daily_reset_at: account.dailyResetAt.toISOString(),
  };
}

creditRouter.get("/", requireAuth, async (req, res, next) => {
  try {
    const { user } = req as AuthedRequest;
    res.json(serializeCredits(await getCreditBalance(user.objectId)));
  } catch (error) {
    next(error);
  }
});

dashboardRouter.get("/stats", requireAuth, async (req, res, next) => {
  try {
    const { user } = req as AuthedRequest;
    const since = new Date(Date.now() - 7 * 86400_000);
    const [totalImages, recent, credits] = await Promise.all([
      Generation.countDocuments({ userId: user.objectId }),
      Generation.find({ userId: user.objectId, createdAt: { $gte: since } }).select("creditsSpent"),
      getCreditBalance(user.objectId),
    ]);

    const spent7d = recent.reduce((sum, item) => sum + (item.creditsSpent ?? 0), 0);
    res.json({
      totalImages,
      spent7d,
      images7d: recent.length,
      credits: serializeCredits(credits),
    });
  } catch (error) {
    next(error);
  }
});
