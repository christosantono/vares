import { Router } from "express";
import { getRefreshCookie, login, logout, restoreSession, setRefreshCookie, signup, clearRefreshCookie } from "../services/auth.service.js";
import { loginSchema, signupSchema } from "../validators/auth.schema.js";
import { authRateLimit } from "../middleware/rateLimit.js";
import { optionalAuth, requireAuth, type AuthedRequest } from "../middleware/auth.js";

export const authRouter = Router();

authRouter.post("/signup", authRateLimit, async (req, res, next) => {
  try {
    const session = await signup(signupSchema.parse(req.body));
    await setRefreshCookie(res, session.refreshToken);
    res.status(201).json({ user: session.user, accessToken: session.accessToken });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", authRateLimit, async (req, res, next) => {
  try {
    const session = await login(loginSchema.parse(req.body));
    await setRefreshCookie(res, session.refreshToken);
    res.json({ user: session.user, accessToken: session.accessToken });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", optionalAuth, async (req, res, next) => {
  try {
    await logout(req.user?.id ?? null);
    clearRefreshCookie(res);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", async (req, res, next) => {
  try {
    const session = await restoreSession(getRefreshCookie(req.cookies ?? {}));
    await setRefreshCookie(res, session.refreshToken);
    res.json({ user: session.user, accessToken: session.accessToken });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/session", requireAuth, (req, res) => {
  const user = (req as AuthedRequest).user;
  res.json({ user: { id: user.id, email: user.email } });
});
