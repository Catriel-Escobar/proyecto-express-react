import express from "express";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import morgan from "morgan";
import { corsConfig } from "./config/cors";

connectDB();

const app = express();
app.use(cors(corsConfig));
//login
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

export default app;
