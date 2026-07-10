import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Response } from "express";
import { Types } from "mongoose";
import { env } from "../config/env.js";
import { Profile } from "../models/Profile.js";
import { User } from "../models/User.js";
import { HttpError } from "../utils/httpError.js";
import { createCreditAccount } from "./credit.service.js";

const REFRESH_COOKIE = "zenivra_refresh";

type TokenPayload = { sub: string; email: string };

function publicUser(user: { _id: unknown; email: string }) {
  return { id: String(user._id), email: user.email };
}

function makeHandle(name: string, userId: string) {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "user";
  return `${base}-${userId.slice(-6)}`;
}

export function signAccessToken(payload: TokenPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(payload: TokenPayload) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
}

export async function setRefreshCookie(res: Response, token: string) {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export function clearRefreshCookie(res: Response) {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie(REFRESH_COOKIE, {
    path: "/",
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  });
}

export function getRefreshCookie(cookies: Record<string, unknown>) {
  return typeof cookies[REFRESH_COOKIE] === "string" ? cookies[REFRESH_COOKIE] : null;
}

export async function signup(input: { name: string; email: string; password: string }) {
  const email = input.email.toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) throw new HttpError(409, "An account with that email already exists.");

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await User.create({ email, passwordHash });
  const userId = user._id as Types.ObjectId;

  await Promise.all([
    Profile.create({
      userId,
      displayName: input.name,
      handle: makeHandle(input.name, String(user._id)),
    }),
    createCreditAccount(userId),
  ]);

  return issueSession(user);
}

export async function login(input: { email: string; password: string }) {
  const user = await User.findOne({ email: input.email.toLowerCase() });
  if (!user) throw new HttpError(401, "Invalid email or password.");
  const ok = await bcrypt.compare(input.password, user.passwordHash);
  if (!ok) throw new HttpError(401, "Invalid email or password.");
  return issueSession(user);
}

export async function issueSession(user: { _id: unknown; email: string; save: () => Promise<unknown>; refreshTokenHash?: string | null }) {
  const payload = { sub: String(user._id), email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  user.refreshTokenHash = await bcrypt.hash(refreshToken, 12);
  await user.save();
  return { user: publicUser(user), accessToken, refreshToken };
}

export async function restoreSession(refreshToken: string | null) {
  if (!refreshToken) throw new HttpError(401, "Not authenticated.");
  let payload: TokenPayload;
  try {
    payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as TokenPayload;
  } catch {
    throw new HttpError(401, "Session expired.");
  }

  const user = await User.findById(payload.sub);
  if (!user || !user.refreshTokenHash) throw new HttpError(401, "Session expired.");
  const ok = await bcrypt.compare(refreshToken, user.refreshTokenHash);
  if (!ok) throw new HttpError(401, "Session expired.");
  return issueSession(user);
}

export async function logout(userId: string | null) {
  if (userId) await User.findByIdAndUpdate(userId, { refreshTokenHash: null });
}
