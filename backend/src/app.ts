import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { corsOptions } from "./config/cors.js";
import { authRouter } from "./routes/auth.routes.js";
import { creditRouter, dashboardRouter } from "./routes/credit.routes.js";
import { generationRouter } from "./routes/generation.routes.js";
import { profileRouter } from "./routes/profile.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/error.js";

export const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/generations", generationRouter);
app.use("/api/credits", creditRouter);
app.use("/api/dashboard", dashboardRouter);

app.use(notFoundHandler);
app.use(errorHandler);
