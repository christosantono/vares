import type { CorsOptions } from "cors";
import { env } from "./env.js";

const allowedOrigins = new Set(env.CLIENT_ORIGIN);

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
};
