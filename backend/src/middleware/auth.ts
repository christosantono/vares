import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { env } from "../config/env.js";
import { HttpError } from "../utils/httpError.js";

export type AuthUser = {
  id: string;
  objectId: Types.ObjectId;
  email: string;
};

export type AuthedRequest = Request & { user: AuthUser };

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;
  if (!token) return next();

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as { sub: string; email: string };
    req.user = { id: payload.sub, objectId: new Types.ObjectId(payload.sub), email: payload.email };
  } catch {
    req.user = undefined;
  }

  next();
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  optionalAuth(req, _res, (error?: unknown) => {
    if (error) return next(error);
    if (!req.user) return next(new HttpError(401, "Not authenticated."));
    return next();
  });
}
