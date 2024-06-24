import express from "express";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";

import cors from "cors";
import morgan from "morgan";
import { corsConfig } from "./config/cors";
import cookieParser from "cookie-parser";

connectDB();

const app = express();
app.use(cors(corsConfig));
//login
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);

export default app;
